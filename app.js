// MOTOR DE TRANSCULTURACIÓN KC v2.1.1 - Debugging & CORS Ready

const KB = {
  "brands": {
    "Kotex": {
      "color": "#C8102E",
      "global_dna": "Own Your Flow (2026). Fortaleza silenciosa.",
      "countries": {
        "Argentina": { "tier": 1, "tone": "Sofisticado/Directo" },
        "México": { "tier": 1, "tone": "Familiar/Cercano" },
        "Chile": { "tier": 1, "tone": "Sofisticado/Inteligente" },
        "Colombia": { "tier": 2, "tone": "Cálido/TikTok" },
        "Honduras": { "tier": 3, "tone": "Educativo/Simple" },
        "Perú": { "tier": 1, "tone": "Humor/Cotidiano" }
      }
    },
    "Huggies": {
      "color": "#1DA1F2",
      "global_dna": "Acompañar a los padres en el viaje por lo desconocido.",
      "countries": {
        "Argentina": { "tier": 1, "tone": "Solidario" }
      }
    }
  }
};

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

    const updateContext = () => {
        const brand = brandSelect.value;
        const country = countrySelect.value;
        const brandData = KB.brands[brand];
        if (brandData) {
            const data = brandData.countries[country];
            ragContext.innerHTML = `
                <div style="font-weight: 800; font-size: 0.85rem; color: #0000a3; margin-bottom: 5px;">KC AI Engine v2.1.1</div>
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

    // MOTOR DE TRANSCULTURACIÓN v2.1.1 (FETCH LOGIC)
    transformBtn.addEventListener('click', async () => {
        const copy = inputCopy.value.trim();
        if (!copy) return;

        const brand = brandSelect.value;
        const country = countrySelect.value;
        const brandData = KB.brands[brand];
        const marketData = brandData ? brandData.countries[country] : null;

        transformBtn.disabled = true;
        spinner.style.display = 'block';
        reasoningArea.style.display = 'none';
        statusTag.innerText = "Llamando a OpenAI (v2.1.1)...";

        const payload = {
            copy: copy,
            brand: brand,
            country: country,
            contextData: {
                dna: brandData ? brandData.global_dna : "",
                tier: marketData ? marketData.tier : "",
                tone: marketData ? marketData.tone : ""
            }
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
