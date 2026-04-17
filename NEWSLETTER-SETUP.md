# Newsletter Setup — Cocinero Nomada

## Arquitectura

```
[Usuario] --submit--> [Cloudflare Worker] --API--> [Resend Audiences]
                                                         |
[GitHub Actions cron] --read--> [Resend Audiences] --send--> [Suscriptores]
```

## Paso 1: Crear cuenta Resend

1. Ve a https://resend.com y crea una cuenta
2. Verifica tu dominio (o usa el de prueba para empezar)
3. Copia tu API Key desde Settings > API Keys

## Paso 2: Crear Audience en Resend

1. Ve a https://resend.com/audiences
2. Click "Create Audience"
3. Nombre: `Cocinero Nomada Newsletter`
4. Copia el **Audience ID** (formato: `aud_xxxxxxxxxxxx`)

## Paso 3: Desplegar Cloudflare Worker

```bash
# Instala wrangler si no lo tienes
npm install -g wrangler

# Login a Cloudflare
wrangler login

# Desde la carpeta del proyecto:
cd landing/newsletter

# Configura los secrets
wrangler secret put RESEND_API_KEY
# (pega tu API key de Resend)

wrangler secret put RESEND_AUDIENCE_ID
# (pega el Audience ID)

wrangler secret put ALLOWED_ORIGIN
# (pega: https://nitrinidad-bit.github.io)

# Despliega
npx wrangler deploy subscribe-worker.js --name cocinero-subscribe
```

Anota la URL del worker (ejemplo: `https://cocinero-subscribe.tu-cuenta.workers.dev`)

## Paso 4: Actualizar URL del Worker en el frontend

En `landing/js/main.js`, busca esta linea y reemplaza con tu URL real:

```javascript
const SUBSCRIBE_WORKER_URL = 'https://cocinero-subscribe.YOUR_SUBDOMAIN.workers.dev';
```

## Paso 5: Configurar GitHub Secrets

Ve a tu repo > Settings > Secrets and variables > Actions y agrega:

| Secret | Valor |
|---|---|
| `RESEND_API_KEY` | Tu API key de Resend |
| `RESEND_AUDIENCE_ID` | El Audience ID |
| `NEWSLETTER_START_DATE` | `2026-05-01` (o la fecha que elijas) |
| `LANDING_URL` | `https://nitrinidad-bit.github.io/cocineronomada/landing` |
| `FROM_EMAIL` | `newsletter@cocineronomada.com` (debe estar verificado en Resend) |

## Paso 6: Push y verificar

```bash
git push origin main --force
```

Verifica:
- [ ] El Worker responde en su URL
- [ ] El form de la landing envia correctamente
- [ ] Los contactos aparecen en Resend Audiences
- [ ] El workflow de GitHub Actions aparece en la tab Actions del repo
- [ ] Ejecuta manualmente el workflow con `--test` para verificar

## Costos

- **Cloudflare Workers:** Gratis (100k requests/dia)
- **Resend:** Gratis hasta 3,000 emails/mes, despues ~$20/mes
- **GitHub Actions:** Gratis para repos publicos
