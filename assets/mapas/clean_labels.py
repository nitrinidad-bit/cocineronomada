"""
Remove black label banners from GameBoy-style maps.

Strategy:
- Threshold dark pixels (near-black label backgrounds)
- Find rectangular label bounding boxes via connected-component labeling
  (implemented with a two-pass union-find on pure numpy)
- Skip rectangles inside whitelist zones (logo top-left, chef bottom-right)
- Fill each label rectangle with a vertical texture strip sampled from
  directly above (falling back to below if that fails), so the underlying
  crosshatch terrain continues through the patched area.
"""
from PIL import Image
import numpy as np
import os

SRC_DIR = os.path.dirname(os.path.abspath(__file__))

# Per-image whitelist zones (x1, y1, x2, y2) in pixel coords to PRESERVE.
# These regions contain the Cocinero Nomada logo (top-left) and the chef
# portrait (bottom-right) that we do NOT want to erase.
WHITELIST = {
    "default": [
        (0,   0,   260, 220),   # logo corner
        (720, 1180, 1024, 1536) # chef portrait
    ],
}

# Per-image extra manual erase rectangles (x1, y1, x2, y2) — for cases where
# thresholding misses a label. Primarily used to kill the DUPLICATE Cartagena
# label in the Americas map.
MANUAL_ERASE = {
    "americas-gameboy.png": [
        # Second (duplicate) Cartagena label, left-middle of map.
        (110, 610, 360, 700),
    ],
    "colombia-zona.png": [],
    "colombia-gameboy.png": [],
    "mundo-gameboy.png": [],
}

# Threshold for "dark" pixels that are likely label background.
DARK_THRESHOLD = 60

# Label geometry filter (pixels) — in the DOWNSAMPLED (/2) space.
MIN_W, MAX_W = 35, 260
MIN_H, MAX_H = 10, 60
MIN_ASPECT   = 1.4   # wider than tall


def dilate(mask, hx=6, vy=2):
    """Binary dilation with a rectangular kernel (2*hx+1) x (2*vy+1)."""
    out = mask.copy()
    for _ in range(hx):
        out = out | np.roll(out, 1, axis=1) | np.roll(out, -1, axis=1)
    for _ in range(vy):
        out = out | np.roll(out, 1, axis=0) | np.roll(out, -1, axis=0)
    return out


def in_whitelist(bbox, zones):
    x1, y1, x2, y2 = bbox
    for zx1, zy1, zx2, zy2 in zones:
        # overlap test
        if not (x2 < zx1 or x1 > zx2 or y2 < zy1 or y1 > zy2):
            return True
    return False


def find_label_boxes(mask):
    """Return list of bounding boxes for dark connected components that look
    like label banners. Uses a simple two-pass union-find on the mask."""
    H, W = mask.shape
    labels = np.zeros((H, W), dtype=np.int32)
    parent = [0]

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            if ra < rb: parent[rb] = ra
            else:       parent[ra] = rb

    next_label = 1
    for y in range(H):
        row = mask[y]
        for x in range(W):
            if not row[x]:
                continue
            left = labels[y, x-1] if x > 0 else 0
            up   = labels[y-1, x] if y > 0 else 0
            if left and up:
                labels[y, x] = min(left, up)
                union(left, up)
            elif left:
                labels[y, x] = left
            elif up:
                labels[y, x] = up
            else:
                labels[y, x] = next_label
                parent.append(next_label)
                next_label += 1

    # Resolve
    for i in range(1, len(parent)):
        parent[i] = find(i)
    remap = np.array(parent, dtype=np.int32)
    labels = remap[labels]

    # Compute bounding boxes.
    boxes = {}
    ys, xs = np.nonzero(labels)
    for y, x in zip(ys, xs):
        lbl = int(labels[y, x])
        if lbl not in boxes:
            boxes[lbl] = [x, y, x, y]
        else:
            b = boxes[lbl]
            if x < b[0]: b[0] = x
            if y < b[1]: b[1] = y
            if x > b[2]: b[2] = x
            if y > b[3]: b[3] = y
    return list(boxes.values())


def sample_strip(arr, bbox, direction="up"):
    """Sample a texture strip to replace a label area."""
    x1, y1, x2, y2 = bbox
    h = y2 - y1 + 1
    w = x2 - x1 + 1
    H, W = arr.shape[:2]
    if direction == "up":
        sy2 = y1
        sy1 = max(0, sy2 - h - 8)
        if sy1 < 8:
            return sample_strip(arr, bbox, "down")
        strip = arr[sy1:sy2, x1:x2+1].copy()
    else:
        sy1 = min(H - 1, y2 + 8)
        sy2 = min(H, sy1 + h)
        if sy2 - sy1 < h:
            # fallback: repeat whatever we can
            strip = arr[sy1:sy2, x1:x2+1].copy()
            if strip.shape[0] == 0:
                return None
        else:
            strip = arr[sy1:sy2, x1:x2+1].copy()
    # Resize vertically to match label height via tile
    if strip.shape[0] < h:
        reps = (h // strip.shape[0]) + 1
        strip = np.tile(strip, (reps, 1, 1))
    strip = strip[:h, :w]
    return strip


def clean_image(fname):
    path = os.path.join(SRC_DIR, fname)
    im = Image.open(path).convert("RGB")
    arr = np.array(im)
    gray = arr.mean(axis=2)
    mask = gray < DARK_THRESHOLD

    # Zero-out whitelist (preserve logo + chef)
    for zx1, zy1, zx2, zy2 in WHITELIST["default"]:
        mask[zy1:zy2, zx1:zx2] = False

    # Downsample for speed (connected components on 512x768 instead of 1024x1536)
    ds = mask[::2, ::2]
    # Horizontal dilation bridges the gaps between letters so each label
    # collapses into a single connected component.
    ds = dilate(ds, hx=4, vy=1)
    print(f"  [{fname}] scanning {ds.shape[1]}x{ds.shape[0]} for label components...")
    boxes = find_label_boxes(ds)
    scaled = []
    for x1, y1, x2, y2 in boxes:
        w_ds, h_ds = x2 - x1 + 1, y2 - y1 + 1
        if w_ds < MIN_W or w_ds > MAX_W: continue
        if h_ds < MIN_H or h_ds > MAX_H: continue
        if w_ds / max(h_ds, 1) < MIN_ASPECT: continue
        # scale back up to full res
        sx1, sy1, sx2, sy2 = x1*2, y1*2, x2*2+1, y2*2+1
        scaled.append((sx1, sy1, sx2, sy2))

    # Expand boxes a few pixels to catch anti-aliased edges
    final_boxes = []
    for x1, y1, x2, y2 in scaled:
        bx = (max(0, x1-8), max(0, y1-8),
              min(arr.shape[1]-1, x2+8), min(arr.shape[0]-1, y2+8))
        if in_whitelist(bx, WHITELIST["default"]):
            continue
        final_boxes.append(bx)

    # Add manual erase rectangles (e.g. duplicate Cartagena)
    for r in MANUAL_ERASE.get(fname, []):
        final_boxes.append(r)

    print(f"  [{fname}] patching {len(final_boxes)} label regions")

    # Patch each box
    for bx in final_boxes:
        strip = sample_strip(arr, bx, "up")
        if strip is None:
            continue
        x1, y1, x2, y2 = bx
        arr[y1:y2+1, x1:x2+1] = strip[:y2-y1+1, :x2-x1+1]

    out_path = os.path.join(SRC_DIR, fname.replace(".png", "-clean.png"))
    Image.fromarray(arr).save(out_path)
    print(f"  [{fname}] wrote {os.path.basename(out_path)}")


if __name__ == "__main__":
    for f in ["americas-gameboy.png",
              "colombia-gameboy.png",
              "colombia-zona.png",
              "mundo-gameboy.png"]:
        clean_image(f)
