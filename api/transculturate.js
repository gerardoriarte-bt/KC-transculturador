const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { copy, brand, country, contextData } = req.body;

    if (!copy || !brand || !country) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    const masterPrompt = `Actúa como Estratega Senior de Transculturación para Kimberly-Clark LATAM. Tu objetivo es realizar una transculturación (no solo traducción), asegurando que el mensaje resuene con la identidad local sin perder el ADN Global de Marca.

### CONTEXTO DE MARCA
Marca: ${brand}
Plataforma Global Kotex: "Own Your Flow" (2026). Foco en la fortaleza silenciosa y el período como identidad.
Propósito Huggies: Acompañar a los padres en el viaje por lo desconocido de la crianza.
Tono de Voz General: Audaz, directo, empático pero no condescendiente, y culturalmente fluido.
DNA Recuperado: ${contextData.dna || 'N/A'}

### CONTEXTO REGIONAL & TIER LOGIC
Mercado: ${country}
Tier de Madurez: ${contextData.tier || 'N/A'}
Regla Gramatical Estricta:
- Argentina/Uruguay: Voseo obligatorio ("Vos podés", "Sentite").
- Colombia/México/Perú: Tuteo cálido y directo ("Tú puedes", "Pruébalo").
Foco Estratégico País: ${contextData.tone || 'N/A'}

### REGLAS LINGÜÍSTICAS (Knowledge Center)
- Glosario Prohibido (Tabú Check): NUNCA USAR: "Esos días", "Esa época del mes", "Manchas" (como vergüenza), "Discreción", "Que nadie lo note". SIEMPRE USAR: "Menstruación", "Período", "Flujo", "Sangrado", "Progreso".
- Estilo de Redacción: Evitar el "femvertising" de moda; usar honestidad radical y datos reales.
- Correcciones: Realiza correcciones de redacción y ortografía (RAE) si el texto original tiene errores.

### TAREA DE ADAPTACIÓN
Transforma el [INPUT_COPY] para el mercado ${country}.

CRITERIOS DE EXCELENCIA:
1. Eliminación de Eufemismos: Sustituye cualquier frase que oculte la realidad del período por términos directos (Menstruación/Flujo).
2. Ajuste de Pragmática: Si el tier es alto (Chile/Colombia), el tono debe ser más sofisticado; si es Tier 3, debe ser más educativo y simple.
3. Identidad Local: Integra modismos del país solo si refuerzan la conexión, evitando sonar como una parodia.

INPUT_COPY: "${copy}"

### FORMATO DE SALIDA REQUERIDO:
Devuelve un JSON estrictamente con la siguiente estructura:
{
  "adaptation": "Resultado adaptado aquí",
  "reasoning": {
    "brand_alignment": "Explicación breve",
    "linguistic_decision": "Explicación breve de gramática y ortografía",
    "taboo_buster": "Eufemismo eliminado o 'Ninguno'"
  }
}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: masterPrompt }],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const result = JSON.parse(response.choices[0].message.content);
        return res.status(200).json(result);
    } catch (error) {
        console.error("OpenAI Error:", error);
        return res.status(500).json({ error: "Error en la transculturación con IA." });
    }
}
