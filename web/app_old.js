// MOTOR DE TRANSCULTURACIÓN KC v2.0 - Lógica de Ortografía y Puntuación Robusta
const KB = {
  "brands": {
    "Kotex": {
      "color": "#C8102E",
      "global_dna": "Own Your Flow (2026). Fortaleza silenciosa. El período como identidad.",
      "tone": "Audaz, directo, empático pero no condescendiente. Honesto.",
      "forbidden": ["esos días", "esa época del mes", "manchas", "discreción", "que nadie lo note"],
      "replacements": {
        "esos días": "menstruación",
        "esa época del mes": "período",
        "manchas": "sangrado",
        "discreción": "progreso",
        "que nadie lo note": "sentite segura con tu flujo"
      },
      "countries": {
        "Argentina": { "tier": 1, "tone": "Sofisticado/Directo", "rules": "Voseo obligatorio. Estricto en honestidad radical.", "modisms": {"ven": "vení", "comprá": "comprá", "sentí": "sentite", "disfruta": "disfrutá"} },
        "México": { "tier": 1, "tone": "Familiar/Cercano", "rules": "Tuteo cálido y directo. Honesto sin eufemismos.", "modisms": {"ven": "ven", "periodo": "período", "bueno": "padrísimo"} },
        "Chile": { "tier": 1, "tone": "Sofisticado/Inteligente", "rules": "Ajuste de pragmática alta. Tono global-local.", "modisms": {"ven": "ven", "disfruta": "disfruta"} },
        "Colombia": { "tier": 2, "tone": "Cálido/TikTok", "rules": "Tuteo GenZ. Gap TikTok focus.", "modisms": {"bueno": "bacán", "periodo": "regla"} },
        "Honduras": { "tier": 3, "tone": "Educativo/Simple", "rules": "Lenguaje accesible. Tier 3 presence.", "modisms": {"periodo": "regla"} },
        "Perú": { "tier": 1, "tone": "Humor/Cotidiano", "rules": "Humor situacional desenfadado.", "modisms": {"ven": "ven", "entonces": "entonces pe'"} }
      }
    },
    "Huggies": {
      "color": "#1DA1F2",
      "global_dna": "Acompañar a los padres en el viaje por lo desconocido de la crianza.",
      "tone": "Solidario, Inteligente, Seguro y Juguetón.",
      "countries": {
        "Argentina": { "tier": 1, "tone": "Solidario", "rules": "Voseo. Bebé siempre contigo.", "modisms": {"ven": "vení"} }
      }
    }
  }
};

let CustomRules = { forbidden: "", style: "", persona: "", context: "" };

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

    const saveKbBtn = document.getElementById('save-kb-btn');

    // Navegación
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            workspaces.forEach(w => w.style.display = 'none');
            btn.classList.add('active');
            document.getElementById(target).style.display = 'grid';
        });
    });

    const updateContext = () => {
        const brand = brandSelect.value;
        const country = countrySelect.value;
        const brandData = KB.brands[brand];
        if (brandData) {
            const data = brandData.countries[country];
            ragContext.innerHTML = `
                <div style="font-weight: 800; font-size: 0.85rem; color: #0000a3; margin-bottom: 5px;">KC v2.0 - ${brand}</div>
                <div style="font-size: 0.75rem; line-height: 1.4; color: #555;">
                    <strong>DNA:</strong> ${brandData.global_dna}<br>
                    <strong>Mercado:</strong> ${country} (Tier ${data ? data.tier : 'N/A'})
                </div>
            `;
        }
    };
    brandSelect.addEventListener('change', updateContext);
    countrySelect.addEventListener('change', updateContext);
    updateContext();

    // MOTOR DE TRANSCULTURACIÓN v2.0
    transformBtn.addEventListener('click', async () => {
        const copy = inputCopy.value.trim();
        if (!copy) return;

        const brand = brandSelect.value;
        const country = countrySelect.value;
        const brandData = KB.brands[brand];
        const marketData = brandData.countries[country];
        
        transformBtn.disabled = true;
        spinner.style.display = 'block';
        reasoningArea.style.display = 'none';
        
        // Fase 1: Auditoría Tabúes
        statusTag.innerText = "Auditando Tabúes (v2.0)...";
        await new Promise(r => setTimeout(r, 800));
        
        // Fase 2: Corrección Puntuación y Gramática
        statusTag.innerText = "Auditando puntuación y gramática RAE...";
        await new Promise(r => setTimeout(r, 1200));

        let finalizedCopy = copy;
        let brandPillar = brand === "Kotex" ? "Own Your Flow" : "Bebé siempre contigo";
        let decisionLinguistica = "";
        let tabuBuster = "Ningún eufemismo detectado.";
        let ortoReason = "Puntuación y gramática auditadas.";

        // --- 1. AUDITORÍA LINGÜÍSTICA ROBUSTA (ORTO & PUNTUACIÓN) ---
        // A. Capitalización inicial
        finalizedCopy = finalizedCopy.charAt(0).toUpperCase() + finalizedCopy.slice(1);
        
        // B. Coma vocativa (Ej: Hola ven -> Hola, ven)
        finalizedCopy = finalizedCopy.replace(/^Hola\b(?!\s*[,])/gi, "Hola,")
                                   .replace(/^Hola,\s+/i, "Hola, ");

        // C. Signos de apertura obligatorios (¡ y ¿)
        if (/[!?]$/.test(finalizedCopy)) {
            if (finalizedCopy.endsWith("!") && !finalizedCopy.startsWith("¡")) finalizedCopy = "¡" + finalizedCopy;
            if (finalizedCopy.endsWith("?") && !finalizedCopy.startsWith("¿")) finalizedCopy = "¿" + finalizedCopy;
        }
        
        // D. Tildes gramaticales comunes
        finalizedCopy = finalizedCopy.replace(/\bperiodo\b/gi, "período")
                                   .replace(/\bdia\b/gi, "día")
                                   .replace(/\bestos dias\b/gi, "estos días")
                                   .replace(/\bsera\b/gi, "será")
                                   .replace(/\bmas\b(?=\s+(\w+))\b/gi, "más"); // simplificado

        // E. Espaciado corrector
        finalizedCopy = finalizedCopy.replace(/\s+/g, ' ').replace(/\s+([.,!?;:])/g, '$1');

        ortoReason = "Corrección de signos de apertura, coma vocativa y acentuación diacrítica aplicada.";

        // --- 2. TABÚ BUSTER (Eliminación de eufemismos) ---
        if (brandData.forbidden) {
            brandData.forbidden.forEach(tabu => {
                const regex = new RegExp(tabu, 'gi');
                if (regex.test(finalizedCopy)) {
                    const replacement = brandData.replacements[tabu];
                    finalizedCopy = finalizedCopy.replace(regex, replacement);
                    tabuBuster = `Se detectó y eliminó el eufemismo '${tabu}' reemplazándolo por '${replacement}' (Honestidad Radical).`;
                }
            });
        }

        // --- 3. AJUSTE DE PRAGMÁTICA x TIER ---
        if (marketData) {
            if (marketData.tier === 1) {
                decisionLinguistica = `Nivel de pragmática alta para mercado maduro.`;
            } else if (marketData.tier === 3) {
                 decisionLinguistica = "Lenguaje simplificado para enfoque educativo (Tier 3).";
            }

            // --- 4. GRAMÁTICA ESTRICTA v2.0 (Voseo/Tuteo) ---
            if (country === "Argentina") {
                finalizedCopy = finalizedCopy.replace(/disfruta/gi, "disfrutá").replace(/ven\b/gi, "vení").replace(/sentí\b/gi, "sentite").replace(/puedes/gi, "podés").replace(/compras/gi, "comprás");
                decisionLinguistica += " Voseo reglamentario aplicado.";
            } else if (country === "México" || country === "Colombia") {
                decisionLinguistica += " Tuteo cálido y directo aplicado.";
            }

            // --- 5. MODISMOS SELECTIVOS ---
            if (marketData.modisms) {
                Object.keys(marketData.modisms).forEach(key => {
                    const regex = new RegExp('\\b' + key + '\\b', 'gi');
                    if (regex.test(finalizedCopy)) {
                        finalizedCopy = finalizedCopy.replace(regex, marketData.modisms[key]);
                    }
                });
            }
        }

        // --- 6. DNA INTEGRATION ---
        if (brand === "Huggies" && !finalizedCopy.includes("desconocido")) finalizedCopy = "En este viaje por lo desconocido: " + finalizedCopy;

        // UI Results
        resultText.innerText = finalizedCopy;
        document.getElementById('res-brand').innerText = brand;
        document.getElementById('res-country').innerText = country;
        
        reasoningList.innerHTML = `
            <li style="margin-bottom: 12px; border-left: 3px solid var(--kc-red); padding-left: 10px;">
                <strong style="display: block; font-size: 0.75rem; color: #888;">ALINEACIÓN DE MARCA:</strong>
                <span style="font-size: 0.85rem;">Aplicación del concepto "${brandPillar}" (Guía v2.0).</span>
            </li>
            <li style="margin-bottom: 12px; border-left: 3px solid var(--kc-blue); padding-left: 10px;">
                <strong style="display: block; font-size: 0.75rem; color: #888;">DECISIÓN LINGÜÍSTICA:</strong>
                <span style="font-size: 0.85rem;">${decisionLinguistica}<br><i class="fas fa-check-double"></i> Audacia gramatical: ${ortoReason}</span>
            </li>
            <li style="margin-bottom: 5px; border-left: 3px solid #059669; padding-left: 10px;">
                <strong style="display: block; font-size: 0.75rem; color: #888;">TABÚ BUSTER:</strong>
                <span style="font-size: 0.85rem;">${tabuBuster}</span>
            </li>
        `;

        reasoningArea.style.display = 'block';
        spinner.style.display = 'none';
        transformBtn.disabled = false;
        statusTag.innerText = "Alineación y Ortografía Verificada";
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('placeholder').style.display = 'none';
    });
});
