# Cocinero Nómada — Deploy

## 1. OFFLINE (abrir archivo local)

Funciona con doble-click en `index.html` sin conexión a internet.

- Para distribuir: comprimir toda la carpeta `cocinero-nomada/` en un ZIP.
- El usuario descomprime y hace doble-click en `index.html`.
- Las únicas cosas que requieren internet son:
  - Fonts de Google (el libro se verá con fuente fallback — no rompe)
  - Videos de YouTube embebidos en el mapa (si no hay internet, no se ven; todo lo demás funciona)

## 2. ONLINE (GitHub Pages — gratis, sin dominio)

### Pasos (una sola vez)

1. Crea cuenta en github.com si no tienes.
2. Instala Git: https://git-scm.com/download/win
3. Abre PowerShell en la carpeta del proyecto:
   ```
   cd C:\Users\ntrin\Documents\cocinero-nomada
   git init
   git add .
   git commit -m "Cocinero Nomada v1"
   ```
4. En github.com → **New repository** → nombre: `cocinero-nomada` → Public → Create.
5. Copia los comandos que GitHub te muestra (sección "push an existing repo"):
   ```
   git remote add origin https://github.com/TU-USUARIO/cocinero-nomada.git
   git branch -M main
   git push -u origin main
   ```
6. En el repo: **Settings → Pages → Branch: main / (root) → Save**.
7. En 1–2 min tendrás la URL:
   **`https://TU-USUARIO.github.io/cocinero-nomada/`**

### Updates posteriores

Cada vez que cambies algo:
```
git add .
git commit -m "update"
git push
```
La URL se actualiza automáticamente en ~30 segundos. El QR impreso sigue funcionando.

## 3. QR PARA EL LLAVERO

- Abre `qr.html` en el navegador.
- Pega la URL de GitHub Pages en el campo de texto.
- Click **REGENERAR** → **↓ DESCARGAR PNG**.
- Lleva el PNG al impresor. Recomendado: QR mínimo 2×2 cm para escaneo fiable.

## 4. ESTRUCTURA

```
cocinero-nomada/
├── index.html          ← LANDING (hub con 4 cards)
├── map.html            ← JUEGO POKEMON (interactivo)
├── map_v2.html         ← backup del mapa original
├── qr.html             ← generador de QR
├── DEPLOY.md           ← este archivo
├── INSTRUCCIONES_CLAUDECODE_v2.md
├── libro/index.html    ← LIBRO completo (deep-link ?page=N)
├── app/index.html      ← APP interactiva por destino
├── ebook/index.html    ← eBook clásico
├── shared/data.js      ← datos compartidos
├── musicalibro/        ← 5 tracks por región
├── assets/
│   ├── COCINERO_NOMADA/  ← branding
│   └── fotos/            ← fotos reales del viaje
├── personajes/
├── legal/              ← documentos del negocio (NO subir a github si son privados)
└── enlaces de contenido mapa/  ← videos/urls por ciudad
```

## 5. NOTAS IMPORTANTES

- **Archivos privados**: la carpeta `legal/` tiene PDFs personales (EIN, certificaciones).
  Si no quieres que sean públicos en GitHub, crea un archivo `.gitignore` con:
  ```
  legal/
  ```
- **Nombres de archivo con espacios**: `musicalibro/cuzco vibes.mp3` y similares funcionan
  pero para máxima compatibilidad considera renombrarlos sin espacios.
- **Fotos pesadas**: `assets/fotos/` tiene JPGs de ~3-5MB. Considera comprimirlos antes
  de subir para que GitHub Pages cargue rápido (herramienta: tinyjpg.com).
