const { randomUUID } = require("crypto");
const { OpenAI } = require("openai");
const { logStructured } = require("./logger");

let openaiClient;
function getOpenAI() {
    if (!openaiClient) {
        openaiClient = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openaiClient;
}

function applyDeterministicGuardrails(text, contextData) {
    let adaptedText = text || "";
    const forbiddenTerms = contextData.forbidden_terms || [];
    const preferredTerms = contextData.preferred_terms || [];
    const treatment = (contextData.country_rules && contextData.country_rules.treatment) || "tuteo";

    if (forbiddenTerms.length && preferredTerms.length) {
        forbiddenTerms.forEach((term, idx) => {
            const replacement = preferredTerms[Math.min(idx, preferredTerms.length - 1)];
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            adaptedText = adaptedText.replace(new RegExp(`\\b${escaped}\\b`, "gi"), replacement);
        });
    }

    if (treatment === "voseo") {
        adaptedText = adaptedText
            .replace(/\bt[uú]\b/gi, "vos")
            .replace(/\bpuedes\b/gi, "podés")
            .replace(/\bdebes\b/gi, "debés")
            .replace(/\bsi[eé]ntete\b/gi, "sentite")
            .replace(/\bven\b/gi, "vení");
    }

    return adaptedText.replace(/\s+/g, " ").trim();
}

module.exports = async (req, res) => {
    const requestId = randomUUID();
    const started = Date.now();

    // Enable CORS for preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        logStructured({
            level: "warn",
            module: "transculturate",
            function: "handler",
            message: "method_not_allowed",
            requestId,
            method: req.method,
        });
        return res.status(405).json({ error: 'Method not allowed', requestId });
    }

    const { copy, brand, country, contextData = {} } = req.body;

    if (!copy || !brand || !country) {
        logStructured({
            level: "warn",
            module: "transculturate",
            function: "handler",
            message: "validation_failed",
            requestId,
            hasCopy: !!copy,
            hasBrand: !!brand,
            hasCountry: !!country,
        });
        return res.status(400).json({ error: 'Missing parameters', requestId });
    }

    const inputLength = String(copy).length;
    logStructured({
        level: "info",
        module: "transculturate",
        function: "handler",
        message: "request_received",
        requestId,
        brand,
        country,
        inputLength,
        tier: contextData.country_rules?.tier ?? null,
        treatment: contextData.country_rules?.treatment ?? null,
    });

    const countryRules = contextData.country_rules || {};
    const treatment = countryRules.treatment || "tuteo";
    const lexicalPreferences = (countryRules.lexical_preferences || []).join(", ") || "N/A";
    const lexicalAvoid = (countryRules.lexical_avoid || []).join(", ") || "N/A";
    const styleRules = (countryRules.style_rules || []).join(" | ") || "N/A";
    const forbiddenTerms = (contextData.forbidden_terms || []).join(", ") || "N/A";
    const preferredTerms = (contextData.preferred_terms || []).join(", ") || "N/A";

    const masterPrompt = `Actua como Estratega Senior de Transculturacion para Kimberly-Clark LATAM. Tu objetivo es realizar una transculturacion (no traduccion literal), asegurando que el mensaje suene realmente local para ${country} sin romper el ADN de ${brand}.

### CONTEXTO DE MARCA
Marca: ${brand}
DNA de marca: ${contextData.dna || "N/A"}
Tono base de marca: ${contextData.base_tone || "N/A"}
Micro-brief de mercado: ${countryRules.micro_brief || "N/A"}

### CONTEXTO REGIONAL & TIER LOGIC
Mercado: ${country}
Tier de Madurez: ${countryRules.tier || "N/A"}
Tratamiento obligatorio: ${treatment}
Tono por pais: ${countryRules.tone || "N/A"}
Lexico preferido: ${lexicalPreferences}
Lexico a evitar: ${lexicalAvoid}
Reglas de estilo: ${styleRules}

### REGLAS LINGÜÍSTICAS (Knowledge Center)
- Terminos prohibidos: ${forbiddenTerms}
- Terminos preferidos: ${preferredTerms}
- Corrige ortografia y redaccion manteniendo significado y CTA original.
- Nunca caricaturices el acento local ni inventes modismos fuera de contexto.

### TAREA DE ADAPTACIÓN
Transforma el [INPUT_COPY] para el mercado ${country}.

CRITERIOS DE EXCELENCIA:
1. Identidad local real: El texto final debe poder publicarse en ${country} sin sonar importado.
2. Consistencia de tratamiento: Cumple estrictamente ${treatment}.
3. Precision de marca: Respeta DNA y tono de ${brand} sin usar slogans de otras marcas.
4. Calidad de copy: Claridad, fluidez y naturalidad.

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
        const response = await getOpenAI().chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: masterPrompt }],
            response_format: { type: "json_object" },
            temperature: 0.35,
        });

        const result = JSON.parse(response.choices[0].message.content);
        result.adaptation = applyDeterministicGuardrails(result.adaptation, contextData);
        const outputLength = String(result.adaptation || "").length;
        const durationMs = Date.now() - started;

        logStructured({
            level: "info",
            module: "transculturate",
            function: "handler",
            message: "openai_success",
            requestId,
            brand,
            country,
            inputLength,
            outputLength,
            durationMs,
            model: "gpt-4o",
            usage: response.usage
                ? {
                      prompt_tokens: response.usage.prompt_tokens,
                      completion_tokens: response.usage.completion_tokens,
                      total_tokens: response.usage.total_tokens,
                  }
                : null,
        });

        result.requestId = requestId;
        return res.status(200).json(result);
    } catch (error) {
        logStructured({
            level: "error",
            module: "transculturate",
            function: "handler",
            message: error.message,
            requestId,
            brand,
            country,
            durationMs: Date.now() - started,
            stack: error.stack,
            apiKeyConfigured: !!process.env.OPENAI_API_KEY,
        });
        return res.status(500).json({ 
            error: "Error en la transculturación con IA.", 
            details: error.message,
            apiKeyFound: !!process.env.OPENAI_API_KEY,
            requestId,
        });
    }
}
