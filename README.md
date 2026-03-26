# KC Transculturador v3.0 🚀

Herramienta Premium de Transculturación impulsada por IA (OpenAI GPT-4o) para el portafolio de marcas de Kimberly-Clark LATAM.

## Mercados Kotex (guía por país)

El selector y la KB en `app.js` incluyen los mercados documentados en `Kotex_Guide_Por_Pais.pdf`: Argentina, Bolivia, Chile, Colombia, Costa Rica, Ecuador, El Salvador, Guatemala, Honduras, México, Nicaragua, Perú, Puerto Rico, Rep. Dominicana, Caribe (U by Kotex), Centroamérica (hub regional) y LATAM Regional (hub TikTok).

## 🛠️ Características Principales
- **Motor de Transculturación v3.0**: Adaptación regional (voseo/tuteo), tier y tono por mercado según guía Kotex + `BASE_COUNTRY_RULES` para otras marcas.
- **Tabú Buster**: Reconocimiento y eliminación automática de eufemismos menstruales en favor de la "Honestidad Radical" (Kotex).
- **RAG Tier Logic**: Ajuste de sofisticación y tono basado en el nivel de madurez digital del mercado (Tier 1 vs Tier 3).
- **Centro de Conocimiento**: Interfaz dedicada para alimentar reglas lingüísticas y de estilo personalizadas.
- **Ready for Vercel**: Arquitectura serverless configurada para despliegue inmediato.

## 📁 Estructura del Proyecto
- `/api`: Funciones Serverless (OpenAI Gateway).
- `/public`: Frontend estático en Vanilla JS/CSS (Optimizado).
- `index.html`: UI Premium con Glassmorphism.
- `app.js`: Lógica de integración con OpenAI.

## Desarrollo local

1. `npm install`
2. Copia `.env.example` a `.env` y define `OPENAI_API_KEY` (necesaria para generar transculturaciones).
3. `npm run dev` — abre **http://127.0.0.1:3000/** (puerto configurable con `PORT`).

El script `local-dev-server.js` sirve `index.html`, `app.js`, `style.css` y enruta `/api/transculturate` y `/api/feedback` igual que en Vercel.

## Observabilidad y feedback

- Cada llamada a `/api/transculturate` emite **logs JSON** con `level`, `module`, `function`, `requestId`, duración, marca, país y longitudes de texto (sin guardar el copy completo en log por defecto). La respuesta incluye `requestId` para correlación.
- El feedback humano (`/api/feedback`) registra valoración, motivo opcional y longitud del comentario. Para incluir el texto del comentario en logs (p. ej. entorno interno), define `FEEDBACK_LOG_FULL_COMMENT=true`.

## 🚀 Despliegue en Vercel
1. Conecta este repositorio a un nuevo proyecto en **Vercel**.
2. Agrega la Variable de Entorno: `OPENAI_API_KEY` con tu clave de API.
3. El despliegue será automático.

---
**Powered by LoBueno**
