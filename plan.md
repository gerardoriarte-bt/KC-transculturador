Herramienta de Transculturación KC (Antigravity + RAG)
1. Visión General
Desarrollar una herramienta de IA que adapte piezas de comunicación (Social, Email, Web) de las marcas de Kimberly-Clark (Huggies, Kotex, Plenitud, Poise, Depend) al lenguaje local (verbatim) de países específicos en Latinoamérica, manteniendo el ADN global de la marca.

2. Arquitectura Lógica (Flujo RAG)
El sistema no dependerá de una base de datos estática, sino de un motor de búsqueda sobre documentos:

Capa de Ingesta (Knowledge Base): Subida de PDFs con manuales de marca y "Diccionarios de Modismos" por país.

Capa de Recuperación (Retrieval): Ante un input (ej: "Huggies" + "Argentina"), el sistema busca en los PDFs los pilares de voz de Huggies y las reglas de voseo/jerga de Argentina.

Capa de Generación (Augmented Generation): El LLM recibe el copy original + el contexto recuperado del PDF y realiza la adaptación.

3. Estructura de Datos (El "Diccionario PDF")
Para que el RAG sea efectivo, el PDF de modismos debe estar estructurado (o el LLM debe interpretarlo) bajo esta lógica:

Segmentación por País: Títulos claros (Ej: ### ARGENTINA).

Tabla de Equivalencias:

Término Neutro -> Término Local.

Concepto Marca -> Bajada Regional.

Reglas Gramaticales: (Ej: "En Argentina usar siempre voseo: Vení, Comprá, Sentite").

4. Roadmap de Desarrollo (Sprints)
Fase 1: Configuración del Entorno (Antigravity)
[ ] Crear el espacio de trabajo en Antigravity.

[ ] Configurar el Knowledge Base: Cargar PDFs de manuales de marca KC y el PDF de modismos regionales.

[ ] Definir los "System Prompts" base.

Fase 2: Ingeniería de Prompts (El Motor)
Configurar el prompt de sistema para que use el RAG:

Markdown
"Eres el Transculturador Senior de Kimberly-Clark. 
1. Revisa en el Knowledge Base los pilares de [MARCA].
2. Recupera del PDF de modismos las reglas específicas para [PAÍS].
3. Adapta el [COPY_ORIGINAL] asegurando que el verbatim sea 100% local.
4. Si el manual dice 'Solidario' pero el país es 'Argentina', usa un tono cercano y directo."
Fase 3: Interfaz de Usuario (Input/Output)
[ ] Selector de Marca: (Huggies, Kotex, etc.) -> Esto filtra la búsqueda en el PDF.

[ ] Selector de País/Cluster: (Andino, South Cone, etc.) -> Esto define el verbatim.

[ ] Campo de Texto: Para el copy original.

Fase 4: Testing y Refinamiento (Data-Driven)
[ ] Pruebas de "Alucinación": Verificar que no invente modismos que no están en el PDF.

[ ] Ajuste de Temperature: Mantenerla baja (0.3 - 0.5) para que sea fiel al manual y no "delire" creativamente fuera de marca.

5. Mantenimiento y Escalabilidad
Actualización de PDFs: Si cambian las campañas (ej: pasar de "She Can 2.0" a "3.0"), solo se reemplaza el PDF en el Knowledge Base; no se toca el código ni el prompt.

Nuevos Países: Simplemente se añade una página al PDF con el nuevo glosario.