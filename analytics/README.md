# Cocinero Nómada — Sistema de Analytics

Pipeline propio, privacy-first, sin cookies, sin dependencias de terceros.

```
Sitio → shared/track.js → Cloudflare Worker → D1 → Telegram + /admin dashboard
```

---

## Setup (una sola vez)

### 1. Crear bot de Telegram

1. En Telegram, habla con **@BotFather** → `/newbot`
2. Nombre sugerido: `Cocinero Nómada Stats`
3. Username: algo como `cocineronomada_stats_bot`
4. Guarda el **token** que te da (formato `123456:ABC-DEF…`)
5. Obtén tu **chat_id**:
   - Envía cualquier mensaje a tu bot nuevo
   - Abre: `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`
   - Busca `"chat":{"id":NUMERO}` → ese número es tu chat_id

Puedes reusar el mismo `chat_id` que ya usas en tus bots de trading — los mensajes llegan al mismo chat.

### 2. Instalar Wrangler y crear D1

```bash
cd analytics
npm install -g wrangler
wrangler login
wrangler d1 create cocinero_analytics
```

Copia el `database_id` que imprime y pégalo en `wrangler.toml` (línea `database_id = "..."`).

### 3. Aplicar el esquema

```bash
wrangler d1 execute cocinero_analytics --file=schema.sql --remote
```

### 4. Configurar secrets

```bash
wrangler secret put TELEGRAM_BOT_TOKEN      # el token del paso 1
wrangler secret put TELEGRAM_CHAT_ID        # tu chat_id numérico
wrangler secret put ADMIN_TOKEN             # cualquier string largo, ej: openssl rand -hex 32
wrangler secret put IP_SALT                 # cualquier string largo aleatorio
wrangler secret put ALLOWED_ORIGIN          # https://nitrinidad-bit.github.io
```

### 5. Deploy

```bash
wrangler deploy
```

Cloudflare te devuelve una URL como `https://cocinero-analytics.TU-SUBDOMINIO.workers.dev`.

### 6. Apuntar el tracker a tu Worker

Edita `../shared/track.js`, línea 9:

```js
var DEFAULT_URL = "https://cocinero-analytics.TU-SUBDOMINIO.workers.dev/event";
```

Haz commit + push a GitHub (deploy automático de GitHub Pages en ~30s).

---

## Verificación (5 min)

1. **Health check**:
   ```
   curl https://cocinero-analytics.TU-SUBDOMINIO.workers.dev/health
   ```
   Debe devolver `{"ok":true,"schema":1}`.

2. **Smoke test desde el sitio**:
   - Abre tu GitHub Pages en Chrome
   - DevTools → Network → filtra `event`
   - Navega, haz scroll, clic en botones → debes ver POSTs salir con status 200
   - Abre el libro, avanza 2 páginas → 2 eventos `chapter_view`
   - Abre la app, clic en Cartagena → 1 evento `city_select`

3. **Confirma en D1**:
   ```bash
   wrangler d1 execute cocinero_analytics --remote \
     --command="SELECT event, COUNT(*) FROM events GROUP BY event ORDER BY 2 DESC"
   ```

4. **Dashboard**:
   ```
   https://cocinero-analytics.TU-SUBDOMINIO.workers.dev/admin?token=TU_ADMIN_TOKEN
   ```
   Marca como favorito. Se refresca solo cada 30s.

5. **Forzar el digest diario (opcional)**:
   ```bash
   wrangler cron trigger --name cocinero-analytics
   ```
   Debe llegarte un mensaje en Telegram.

---

## Qué se mide

### Global (todas las páginas)
- `page_view`, `session_start`, `scroll_depth` (25/50/75/100)
- `time_on_page`, `external_link`, `cta_click`
- `form_submit`, `form_success` / `form_error`

### Libro (`libro/index.html`)
- `chapter_view` — cada cambio de página
- `book_progress_milestone` — 25/50/75/100 %
- `toc_open`, `resume_click`

### App interactiva (`app/index.html`)
- `city_select` — ciudad seleccionada + país
- `country_filter`, `unlock_progress`

### Landing / Blog
- `blog_filter_change`, `blog_card_click`, `modal_open`

---

## Alertas en tiempo real (Telegram)

Se disparan automáticamente desde el Worker, con debounce:

| Alerta | Condición | Cooldown |
|---|---|---|
| 🌅 Primer visitante del día | `session_start` | 24 h |
| ✉️ Nueva suscripción | `form_success` | ninguno |
| 📖 Terminó el libro | `book_progress_milestone` = 100 | 24 h por sesión |
| 📈 Pico de tráfico | >10 pageviews en 10 min | 30 min |

## Digest diario (09:00 PR = 13:00 UTC)

Cron en `wrangler.toml`. Mensaje en Telegram con visitantes únicos, pageviews, lectores del libro, capítulo promedio, top ciudades, conversiones, países.

---

## Privacidad

- **Sin cookies**. Sesión en `sessionStorage` (se pierde al cerrar pestaña).
- **Sin PII**. El `visitor_hash` = SHA-256(IP + UA + salt + fecha), rota cada 24h, no reversible.
- **Respeta Do Not Track**. Si el navegador envía DNT, el tracker no emite nada.
- **Offline-safe**. Si se abre vía `file://`, el tracker se desactiva solo.
- **Retención**: events 90 días, sessions 30 días. Cron semanal purga lo viejo.

No requiere banner de consentimiento ni actualizar `/legal/`.

---

## Costos (plan free de Cloudflare)

- Workers: 100k requests/día gratis → margen de sobra.
- D1: 5 GB gratis, 25M lecturas/día, 50k escrituras/día → margen de sobra.
- Telegram Bot API: gratis.

Para un sitio indie como este, el sistema corre a $0/mes indefinidamente.

---

## Troubleshooting

**No llegan eventos al Worker**
- Verifica CORS: `ALLOWED_ORIGIN` debe coincidir con la URL de GitHub Pages (sin `/` final).
- Verifica que el script src del tracker resuelva (Network → 200 en `track.js`).
- Abre la consola del navegador y corre `cnTrack('page_view')` → debe ir un POST.

**Dashboard devuelve Unauthorized**
- Asegúrate de pasar `?token=XXXX` en la URL y que coincida con el secret `ADMIN_TOKEN`.

**No llegan mensajes de Telegram**
- Confirma que enviaste al menos un mensaje al bot nuevo (Telegram bloquea mensajes a usuarios que nunca han interactuado).
- Corre: `curl "https://api.telegram.org/bot<TOKEN>/getMe"` → debe responder con info del bot.

**Rate limit (429)**
- Solo se activa si un visitante manda >60 eventos/min. En uso normal nunca dispara.

---

## Deshabilitar

Para apagar el tracker sin deploy:

```js
// En la consola del sitio o en una query string:
localStorage.setItem('cn_disable', '1');  // no implementado por defecto
```

Alternativa instantánea: eliminar la línea `<script src="…/track.js">` de los HTMLs o apagar el Worker (`wrangler delete`). El sitio sigue funcionando igual.
