// MOTOR DE TRANSCULTURACIÓN KC v3.0 - Country Linguistics Driven

const KB = {
  brands: {
    Kotex: {
      color: "#C8102E",
      global_dna: "Own Your Flow (2026). Fortaleza silenciosa. Hablar del periodo sin eufemismos.",
      base_tone: "Valiente, directa, empatica, zero condescendencia.",
      forbidden_terms: ["esos dias", "esa epoca del mes", "que nadie lo note", "discrecion", "manchas"],
      preferred_terms: ["menstruacion", "periodo", "flujo", "sangrado"],
      countries: {
        Argentina: {
          tier: 1,
          tone: "Directo, sofisticado, seguro",
          treatment: "voseo",
          lexical_preferences: ["vos", "tu periodo", "sentite", "elegi"],
          lexical_avoid: ["tu puedes", "ustedes pueden"],
          style_rules: ["Frases cortas", "Sin eufemismos", "Sin infantilizacion del tema"],
          micro_brief: "Marca empoderadora y frontal. Hablar del cuerpo con naturalidad y precision."
        },
        "México": {
          tier: 1,
          tone: "Cercano, claro, con energia",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "sentirte segura"],
          lexical_avoid: ["voseo", "modismos rioplatenses"],
          style_rules: ["Naturalidad", "Nada de dramatizacion", "No parodia local"],
          micro_brief: "Conectar desde cercania cotidiana sin perder credibilidad."
        },
        Chile: {
          tier: 1,
          tone: "Sofisticado, inteligente, cercano y no paternalista",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "datos reales", "autenticidad"],
          lexical_avoid: ["empowerment washing", "tono condescendiente", "copy aspiracional vacio"],
          style_rules: ["Humor inteligente", "Desmitificacion con evidencia", "Precision semantica y cultural"],
          micro_brief: "Mercado de alta exigencia: detectar contenido generico o superficial genera rechazo."
        },
        Colombia: {
          tier: 2,
          tone: "Calido, directo, comunitario",
          treatment: "tuteo",
          lexical_preferences: ["tu puedes", "hablamos tu idioma", "flujo", "#FansKotex"],
          lexical_avoid: ["vos podes", "voseo rioplatense", "jerga de otro pais"],
          style_rules: ["Empatia con humor suave", "Ruptura de estigmas con tono cotidiano", "Comunidad primero"],
          micro_brief: "Mantener cercania local colombiana sin sonar importado ni panregional."
        },
        Honduras: {
          tier: 3,
          tone: "Simple, calido, muy accesible",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "salud menstrual", "cuidado", "proteccion"],
          lexical_avoid: ["tecnicismos innecesarios"],
          style_rules: ["Frases cortas", "Educacion practica", "Mensajes ligeros para baja conectividad"],
          micro_brief: "Mercado Tier 3: priorizar comprension y utilidad por encima de sofisticacion."
        },
        "Perú": {
          tier: 1,
          tone: "Cercano y desenfadado con humor cotidiano",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "humor cotidiano", "mitos del ciclo"],
          lexical_avoid: ["voseo", "tono demasiado grandilocuente"],
          style_rules: ["POVs del periodo", "Desmitificacion", "Naturalidad sin parodia"],
          micro_brief: "Mercado full-funnel con alta afinidad a video corto y contenido de salud menstrual."
        },
        Ecuador: {
          tier: 2,
          tone: "Calido, autentico, situacional",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "bienestar menstrual"],
          lexical_avoid: ["copy que suene colombiano", "copy que suene peruano", "voseo"],
          style_rules: ["Referencias locales ecuatorianas", "Humor cercano", "Educacion accesible"],
          micro_brief: "Identidad nacional marcada: exigir localizacion real, no adaptacion generica andina."
        },
        "Costa Rica": {
          tier: 3,
          tone: "Cercano, autentico, culturalmente tico",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "comodidad", "confianza"],
          lexical_avoid: ["tono neutro centroamericano", "copy distante", "voseo"],
          style_rules: ["Humor local", "Autenticidad", "Evitar generalizaciones regionales"],
          micro_brief: "Paradoja digital: se opera como Tier 3, pero la audiencia se comporta mas cercana a Tier 2."
        },
        Bolivia: {
          tier: 1,
          tone: "Empatico, directo, con referentes locales",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "ciclo", "cultura boliviana"],
          lexical_avoid: ["tono panlatino generico", "voseo rioplatense"],
          style_rules: ["Referencias a festividades y lenguaje coloquial boliviano", "Educacion con cercania", "Humor local en TikTok"],
          micro_brief: "Mercado Tier 1 full-funnel; evitar copy que suena ajeno o importado."
        },
        "Puerto Rico": {
          tier: 2,
          tone: "Expresivo, caribeno, energico",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "own your flow", "cultura pop"],
          lexical_avoid: ["tono frio corporativo", "mezclar sin criterio con US U by Kotex"],
          style_rules: ["Espanol caribeno con energia", "Claridad si el copy es bilingue", "Resonancia semantica flow/identidad"],
          micro_brief: "Mercado bilingue; definir si el mensaje es Kotex LATAM o linea US para evitar contradicciones."
        },
        "Rep. Dominicana": {
          tier: 2,
          tone: "Expresivo, calido, humor dominicano",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "comunidad", "situaciones cotidianas"],
          lexical_avoid: ["tono generico caribeno", "voseo"],
          style_rules: ["Personalidad local clara", "Humor situacional respetuoso", "Viralidad sin estereotipos"],
          micro_brief: "RD tiene voz propia en redes; lo generico no conecta."
        },
        "Centroamérica": {
          tier: 2,
          tone: "Regional CA: equilibrar conservador vs digital segun submercado",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "salud menstrual", "comunidad"],
          lexical_avoid: ["asumir un solo tono para todos los paises CA", "Instagram regional sin localizar"],
          style_rules: ["Si es pieza regional: espanol neutro centroamericano sin perder calidez", "Facebook como canal clave en varios paises"],
          micro_brief: "Hub @bykotex vs Facebook por pais: evitar experiencia fragmentada sin criterio; priorizar claridad educativa."
        },
        Nicaragua: {
          tier: 3,
          tone: "Simple, calido, accesible",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "salud menstrual", "cuidado"],
          lexical_avoid: ["tecnicismos", "empoderamiento abstracto vacio"],
          style_rules: ["Texto corto", "Imagenes claras", "Educacion sobre mensajes abstractos"],
          micro_brief: "Tier 3 basico: Facebook principal; foco salud menstrual y confianza de marca."
        },
        "El Salvador": {
          tier: 3,
          tone: "Directo, calido, humor situacional",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "flujo", "autenticidad"],
          lexical_avoid: ["corporativo frio", "voseo"],
          style_rules: ["Referencias locales cuando aporten", "Cercania sin forzar"],
          micro_brief: "Facebook como canal unico documentado; oportunidad de voz autentica salvadorena."
        },
        Guatemala: {
          tier: 3,
          tone: "Conservador en evolucion, empatico, educativo",
          treatment: "tuteo",
          lexical_preferences: ["tu", "periodo", "bienestar", "comunidad", "diversidad"],
          lexical_avoid: ["provocacion gratuita", "un solo fenotipo o estetica", "infantilizar"],
          style_rules: ["Inclusion cultural (mayorias y diversidad)", "Educacion antes que shock", "Respeto sin condescendencia"],
          micro_brief: "Mercado grande CA: solo Facebook en guia; representacion inclusiva es critica."
        },
        Caribe: {
          tier: 2,
          tone: "Definir idioma y submarca: U by Kotex Caribe vs Kotex",
          treatment: "tuteo",
          lexical_preferences: ["periodo", "flujo", "proteccion", "bienestar"],
          lexical_avoid: ["mezclar Kotex y U by Kotex sin criterio", "asumir solo espanol o solo ingles"],
          style_rules: ["Estrategia bilingue si aplica", "Coherencia de arquitectura de marca", "YouTube como repositorio"],
          micro_brief: "Region especial en guia: submarca U by Kotex; clarificar voz antes de adaptar copy."
        },
        "LATAM Regional": {
          tier: 2,
          tone: "Paraguas TikTok: universal pero autentico, no sustituto de pais",
          treatment: "tuteo",
          lexical_preferences: ["periodo", "flujo", "own your flow", "LATAM"],
          lexical_avoid: ["reemplazar cuentas pais", "contenido tan generico que diluya locales"],
          style_rules: ["Amplificar campanas globales", "Tendencias panregionales de salud menstrual", "No canibalizar cuentas locales"],
          micro_brief: "Hub @kotex_latam: primer contacto en mercados sin cuenta propia; mantener ADN sin apagar lo local."
        }
      }
    },
    Huggies: {
      color: "#1DA1F2",
      global_dna: "Acompanamos a madres y padres en el viaje real de la crianza.",
      base_tone: "Calido, experto, tranquilizador, humano.",
      forbidden_terms: ["madre perfecta", "padre perfecto", "sin errores"],
      preferred_terms: ["acompanar", "aprendizaje", "cuidado", "confianza"],
      countries: {
        Argentina: {
          tier: 1,
          tone: "Cercano y contenedor",
          treatment: "voseo",
          lexical_preferences: ["vos", "tu bebe", "acompanarte", "cada etapa"],
          lexical_avoid: ["imperativos agresivos"],
          style_rules: ["Empatia concreta", "Sin culpa parental"],
          micro_brief: "Apoyo real a cuidadores en situaciones del dia a dia."
        }
      }
    },
    Plenitud: {
      color: "#4C6FFF",
      global_dna: "Bienestar adulto con autonomia, confianza y dignidad.",
      base_tone: "Respetuoso, cercano, positivo.",
      forbidden_terms: ["abuelito", "viejito", "incapaz"],
      preferred_terms: ["autonomia", "bienestar", "seguridad", "vida activa"],
      countries: {}
    },
    Poise: {
      color: "#6A4C93",
      global_dna: "Confianza cotidiana para vivir sin pausas.",
      base_tone: "Seguro, elegante, practico.",
      forbidden_terms: ["vergonzoso", "ocultarlo"],
      preferred_terms: ["seguridad", "proteccion", "tranquilidad"],
      countries: {}
    },
    Depend: {
      color: "#2B6777",
      global_dna: "Proteccion confiable para mantener independencia.",
      base_tone: "Confiable, directo, humano.",
      forbidden_terms: ["debil", "limite", "fracaso"],
      preferred_terms: ["independencia", "confianza", "control"],
      countries: {}
    }
  }
};

const BASE_COUNTRY_RULES = {
  Argentina: { tier: 1, tone: "Directo y cercano", treatment: "voseo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Bolivia: { tier: 1, tone: "Directo y cercano", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Caribe: { tier: 2, tone: "Caribe (definir submarca e idioma)", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "Centroamérica": { tier: 2, tone: "Regional CA", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Chile: { tier: 1, tone: "Sobrio y claro", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Colombia: { tier: 2, tone: "Calido y moderno", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "Costa Rica": { tier: 3, tone: "Cercano y claro", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Ecuador: { tier: 2, tone: "Cercano y neutro", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "El Salvador": { tier: 3, tone: "Cercano", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Guatemala: { tier: 3, tone: "Educativo", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Honduras: { tier: 3, tone: "Simple y educativo", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "LATAM Regional": { tier: 2, tone: "Hub regional", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "México": { tier: 1, tone: "Cercano y energico", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  Nicaragua: { tier: 3, tone: "Simple", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "Perú": { tier: 1, tone: "Cotidiano y respetuoso", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "Puerto Rico": { tier: 2, tone: "Caribeno", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" },
  "Rep. Dominicana": { tier: 2, tone: "Calido caribeno", treatment: "tuteo", lexical_preferences: [], lexical_avoid: [], style_rules: [], micro_brief: "" }
};

function getRulesForSelection(brand, country) {
  const brandData = KB.brands[brand] || {};
  const countryDefault = BASE_COUNTRY_RULES[country] || {};
  const countryBrandSpecific = (brandData.countries && brandData.countries[country]) || {};
  return {
    brand,
    country,
    dna: brandData.global_dna || "",
    base_tone: brandData.base_tone || "",
    forbidden_terms: brandData.forbidden_terms || [],
    preferred_terms: brandData.preferred_terms || [],
    country_rules: {
      tier: countryBrandSpecific.tier || countryDefault.tier || "",
      tone: countryBrandSpecific.tone || countryDefault.tone || "",
      treatment: countryBrandSpecific.treatment || countryDefault.treatment || "tuteo",
      lexical_preferences: countryBrandSpecific.lexical_preferences || countryDefault.lexical_preferences || [],
      lexical_avoid: countryBrandSpecific.lexical_avoid || countryDefault.lexical_avoid || [],
      style_rules: countryBrandSpecific.style_rules || countryDefault.style_rules || [],
      micro_brief: countryBrandSpecific.micro_brief || countryDefault.micro_brief || ""
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
    // Selectores UI
    const tabBtns = document.querySelectorAll('.tab-btn');
    const workspaces = document.querySelectorAll('.workspace');
    const brandSelect = document.getElementById('brand-select');
    const countrySelect = document.getElementById('country-select');
    const inputCopy = document.getElementById('input-copy');
    const transformBtn = document.getElementById('transform-btn');
    const resultText = document.getElementById('result-text');
    const reasoningList = document.getElementById('reasoning-list');
    const reasoningArea = document.getElementById('adaptation-reasoning');
    const ragContext = document.getElementById('rag-context');
    const statusTag = document.getElementById('status-tag');
    const spinner = document.getElementById('spinner');

    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackBtnUp = document.getElementById('feedback-btn-up');
    const feedbackBtnDown = document.getElementById('feedback-btn-down');
    const feedbackExtra = document.getElementById('feedback-extra');
    const feedbackReason = document.getElementById('feedback-reason');
    const feedbackComment = document.getElementById('feedback-comment');
    const feedbackSubmit = document.getElementById('feedback-submit');
    const feedbackStatus = document.getElementById('feedback-status');
    const requestIdLine = document.getElementById('request-id-line');

    let lastFeedbackContext = { requestId: null, brand: null, country: null };

    function resetFeedbackUI() {
        if (!feedbackBtnUp) return;
        feedbackBtnUp.disabled = false;
        feedbackBtnDown.disabled = false;
        feedbackBtnUp.classList.remove('feedback-chip--active');
        feedbackBtnDown.classList.remove('feedback-chip--active');
        if (feedbackExtra) feedbackExtra.style.display = 'none';
        if (feedbackReason) feedbackReason.value = '';
        if (feedbackComment) feedbackComment.value = '';
        if (feedbackStatus) {
            feedbackStatus.style.display = 'none';
            feedbackStatus.textContent = '';
            feedbackStatus.style.color = '';
        }
        if (feedbackSubmit) feedbackSubmit.disabled = false;
    }

    function setFeedbackLocked(thanksMessage) {
        feedbackBtnUp.disabled = true;
        feedbackBtnDown.disabled = true;
        if (feedbackSubmit) feedbackSubmit.disabled = true;
        if (feedbackExtra) feedbackExtra.style.display = 'none';
        if (feedbackStatus) {
            feedbackStatus.style.display = 'block';
            feedbackStatus.style.color = '#047857';
            feedbackStatus.textContent = thanksMessage;
        }
    }

    async function sendFeedback(rating, opts = {}) {
        const { reasonCode = '', comment = '' } = opts;
        const payload = {
            requestId: lastFeedbackContext.requestId,
            rating,
            reasonCode,
            comment,
            brand: lastFeedbackContext.brand,
            country: lastFeedbackContext.country,
            clientTimestamp: new Date().toISOString()
        };
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.error || 'No se pudo enviar el feedback');
        }
        return data;
    }

    const updateContext = () => {
        const brand = brandSelect.value;
        const country = countrySelect.value;
        const ruleSet = getRulesForSelection(brand, country);
        if (ruleSet) {
            const data = ruleSet.country_rules;
            ragContext.innerHTML = `
                <div style="font-weight: 800; font-size: 0.85rem; color: #0000a3; margin-bottom: 5px;">KC AI Engine v3.0</div>
                <div style="font-size: 0.75rem; line-height: 1.4; color: #555;">
                    <strong>DNA:</strong> ${ruleSet.dna}<br>
                    <strong>Mercado:</strong> ${country} (Tier ${data ? data.tier : "N/A"})<br>
                    <strong>Tratamiento:</strong> ${data ? data.treatment : "N/A"}
                </div>
            `;
        }
    };
    brandSelect.addEventListener('change', updateContext);
    countrySelect.addEventListener('change', updateContext);
    updateContext();

    // MOTOR DE TRANSCULTURACIÓN v2.1.1 (FETCH LOGIC)
    transformBtn.addEventListener('click', async () => {
        const copy = inputCopy.value.trim();
        if (!copy) return;

        const brand = brandSelect.value;
        const country = countrySelect.value;
        const ruleSet = getRulesForSelection(brand, country);

        if (feedbackPanel) {
            feedbackPanel.style.display = 'none';
            resetFeedbackUI();
        }

        transformBtn.disabled = true;
        spinner.style.display = 'block';
        reasoningArea.style.display = 'none';
        statusTag.innerText = "Llamando a OpenAI (v2.1.1)...";

        const payload = {
            copy: copy,
            brand: brand,
            country: country,
            contextData: ruleSet
        };

        try {
            const response = await fetch('/api/transculturate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                const errMsg = data.details || data.error || "Unknown error";
                throw new Error(`${errMsg} (API Key detectada: ${data.apiKeyFound ? 'SÍ' : 'NO'})`);
            }

            // Desplegar Resultados
            resultText.innerText = data.adaptation;
            document.getElementById('res-brand').innerText = brand;
            document.getElementById('res-country').innerText = country;
            
            reasoningList.innerHTML = `
                <li style="margin-bottom: 12px; border-left: 3px solid var(--kc-red); padding-left: 10px;">
                    <strong style="display: block; font-size: 0.75rem; color: #888;">ALINEACIÓN DE MARCA:</strong>
                    <span style="font-size: 0.85rem;">${data.reasoning.brand_alignment}</span>
                </li>
                <li style="margin-bottom: 12px; border-left: 3px solid var(--kc-blue); padding-left: 10px;">
                    <strong style="display: block; font-size: 0.75rem; color: #888;">DECISIÓN LINGÜÍSTICA:</strong>
                    <span style="font-size: 0.85rem;">${data.reasoning.linguistic_decision}</span>
                </li>
                <li style="margin-bottom: 5px; border-left: 3px solid #059669; padding-left: 10px;">
                    <strong style="display: block; font-size: 0.75rem; color: #888;">TABÚ BUSTER:</strong>
                    <span style="font-size: 0.85rem;">${data.reasoning.taboo_buster}</span>
                </li>
            `;

            reasoningArea.style.display = 'block';
            statusTag.innerText = "Transculturación Real Completada";

            lastFeedbackContext = {
                requestId: data.requestId || null,
                brand,
                country
            };
            if (feedbackPanel) {
                resetFeedbackUI();
                feedbackPanel.style.display = 'block';
                if (requestIdLine) {
                    if (data.requestId) {
                        requestIdLine.textContent = `ID de solicitud: ${data.requestId}`;
                        requestIdLine.style.display = 'block';
                    } else {
                        requestIdLine.style.display = 'none';
                    }
                }
            }
        } catch (error) {
            console.error(error);
            resultText.innerText = `ERROR ESTRATÉGICO: ${error.message}`;
            statusTag.innerText = "Error en el Motor";
        } finally {
            spinner.style.display = 'none';
            transformBtn.disabled = false;
            document.getElementById('result-container').style.display = 'block';
            document.getElementById('placeholder').style.display = 'none';
        }
    });

    if (feedbackBtnUp && feedbackBtnDown && feedbackSubmit) {
        feedbackBtnUp.addEventListener('click', async () => {
            try {
                await sendFeedback('up');
                setFeedbackLocked('Gracias. Tu valoración ayuda a mejorar el motor.');
            } catch (e) {
                feedbackStatus.style.display = 'block';
                feedbackStatus.style.color = '#B91C1C';
                feedbackStatus.textContent = e.message || 'Error al enviar';
            }
        });
        feedbackBtnDown.addEventListener('click', () => {
            feedbackBtnDown.classList.add('feedback-chip--active');
            feedbackBtnUp.classList.remove('feedback-chip--active');
            feedbackExtra.style.display = 'flex';
        });
        feedbackSubmit.addEventListener('click', async () => {
            try {
                await sendFeedback('down', {
                    reasonCode: feedbackReason.value,
                    comment: feedbackComment.value
                });
                setFeedbackLocked('Gracias. Revisaremos este caso con tu feedback.');
            } catch (e) {
                feedbackStatus.style.display = 'block';
                feedbackStatus.style.color = '#B91C1C';
                feedbackStatus.textContent = e.message || 'Error al enviar';
            }
        });
    }

    // Pestañas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            workspaces.forEach(w => w.style.display = 'none');
            btn.classList.add('active');
            document.getElementById(target).style.display = 'grid';
        });
    });
});
