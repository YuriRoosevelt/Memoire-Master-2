# arXiv / NeurIPS / ICLR

## Requêtes utilisées

- **ARX-Q1** (2022-2026): `site:arxiv.org/abs "tool-augmented" "LLM" "API" benchmark`
  - Résultats obtenus: 7; consultés: 7; retenus: 4.
  - Note: Approches tool-use et benchmarks.
- **ARX-Q2** (2022-2026): `site:arxiv.org/abs "OpenAPI" "large language model" "REST"`
  - Résultats obtenus: 4; consultés: 4; retenus: 2.
  - Note: Travaux LLM + OpenAPI/REST.
- **ARX-Q3** (2022-2026): `"ReAct" "Toolformer" "Gorilla" "API-Bank" "LLM"`
  - Résultats obtenus: 8; consultés: 8; retenus: 4.
  - Note: Recherche ciblée sur travaux fondateurs.

## Articles / ressources retenus

### A15 — ReAct: Synergizing Reasoning and Acting in Language Models
- Auteurs: Shunyu Yao; Jeffrey Zhao; Dian Yu; Nan Du; Izhak Shafran; Karthik Narasimhan; Yuan Cao
- Année: 2022/2023
- Venue: ICLR / arXiv
- DOI: 10.48550/arXiv.2210.03629
- URL: https://arxiv.org/abs/2210.03629
- Axe: LLM agents; raisonnement + action
- Raison de rétention: Travail fondateur sur l'alternance raisonnement/action et l'interaction avec sources externes.

### A16 — Toolformer: Language Models Can Teach Themselves to Use Tools
- Auteurs: Timo Schick; Jane Dwivedi-Yu; Roberto Dessì; Roberta Raileanu; Maria Lomeli; Luke Zettlemoyer; Nicola Cancedda; Thomas Scialom
- Année: 2023
- Venue: NeurIPS 2023
- DOI: 10.48550/arXiv.2302.04761
- URL: https://arxiv.org/abs/2302.04761
- Axe: Tool use; API calls; self-supervised learning
- Raison de rétention: Montre comment un LM peut apprendre quand appeler une API, quels arguments passer et intégrer le résultat.

### A17 — API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs
- Auteurs: Minghao Li; Yingxiu Zhao; Bowen Yu; Feifan Song; Hangyu Li; Haiyang Yu; Zhoujun Li; Fei Huang; Yongbin Li
- Année: 2023
- Venue: arXiv
- DOI: 10.48550/arXiv.2304.08244
- URL: https://arxiv.org/abs/2304.08244
- Axe: Évaluation; tool-augmented LLMs; API calls
- Raison de rétention: Benchmark structuré pour évaluer planification, récupération et appels API par LLM.

### A18 — Gorilla: Large Language Model Connected with Massive APIs
- Auteurs: Shishir G. Patil; Tianjun Zhang; Xin Wang; Joseph E. Gonzalez
- Année: 2023/2024
- Venue: NeurIPS 2024 / arXiv
- DOI: 10.48550/arXiv.2305.15334
- URL: https://arxiv.org/abs/2305.15334
- Axe: LLM + APIs; APIBench; hallucination d'API
- Raison de rétention: Approche de connexion d'un LLM à un grand nombre d'APIs, avec réduction des hallucinations d'appels.

### A19 — RestGPT: Connecting Large Language Models with Real-World RESTful APIs
- Auteurs: Yifan Song; Weimin Xiong; Dawei Zhu; Wenhao Wu; Han Qian; Mingbo Song; Hailiang Huang; Cheng Li; Ke Wang; Rong Yao; Sujian Li
- Année: 2023
- Venue: arXiv
- DOI: 10.48550/arXiv.2306.06624
- URL: https://arxiv.org/abs/2306.06624
- Axe: LLM agents; REST API; planning; execution; RestBench
- Raison de rétention: Très proche du sujet: connexion LLM à des API REST réelles avec planning, appel API et parsing.

### A20 — ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs
- Auteurs: Yujia Qin; et al.
- Année: 2023
- Venue: arXiv
- DOI: 10.48550/arXiv.2307.16789
- URL: https://arxiv.org/abs/2307.16789
- Axe: Tool learning; API retriever; ToolBench; ToolEval
- Raison de rétention: Approche de maîtrise de grands ensembles d'APIs avec API retriever et évaluation automatique.

### A21 — AnyTool: Self-Reflective, Hierarchical Agents for Large-Scale API Calls
- Auteurs: Yu Du; Fangyun Wei; Hongyang Zhang
- Année: 2024
- Venue: arXiv
- DOI: 10.48550/arXiv.2402.04253
- URL: https://arxiv.org/abs/2402.04253
- Axe: Large-scale API calls; self-reflection; tool retrieval
- Raison de rétention: Propose sélection hiérarchique d'APIs et auto-réflexion dans de grands espaces d'outils.

### A24 — You Can REST Now: Automated REST API Documentation and Testing via LLMs
- Auteurs: Auteurs à compléter après lecture intégrale
- Année: 2024
- Venue: arXiv
- DOI: 10.48550/arXiv.2402.05102
- URL: https://arxiv.org/abs/2402.05102
- Axe: REST API; OpenAPI inference; testing
- Raison de rétention: Approche RESTSpecIT pour inférer OpenAPI et tester des REST APIs; utile pour entrée OpenAPI.

