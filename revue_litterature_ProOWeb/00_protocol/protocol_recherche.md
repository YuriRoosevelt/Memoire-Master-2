# Protocole de recherche documentaire

## Objectif

Cette recherche documentaire vise à construire l'état de l'art du mémoire consacré à ProOWeb, un framework de génération d'applications web orientées processus à partir de modèles BPMN enrichis.

L'objectif n'est pas seulement de recenser des outils ou des articles. Il s'agit d'identifier les familles de travaux qui permettent de comprendre comment un modèle de processus peut devenir un artefact de construction logicielle, puis de dégager les limites qui justifient la proposition d'une solution nouvelle.

## Question principale

**RQ0 : Quelles approches permettent de passer de modèles BPMN ou de modèles de processus métier vers des applications web ou des artefacts logiciels, et quelles limites justifient la conception d'un framework de génération comme ProOweb  ?**

## Questions de recherche

- **QR1 :** Quel rôle BPMN joue-t-il dans la conception et l’automatisation des systèmes d’information orientés processus?
- **QR2 :** Quelles sont les capacités et limites des BPMS classiques pour construire des applications web métier complète et maitrisable?
- **QR3 :** Comment l’ingénierie dirigée par les modèles et la génération de code permettent-elles de transformer des modèles en artefacts logiciels?
- **QR4 :** Comment les approches model-driven et low-code traitent-elles la génération, l'évolution et la maîtrise du code ?
- **QR5 :** Comment les approches low-code, no-code et model-driven se rapprochent-elles ou se différencient-elles?
- **QR6 :** Quelles lacunes restent ouvertes pour justifier une approche générative, modulaire et source-owned comme ProOWeb?

## Familles de mots-clés

| Axe | Mots-clés |
|---|---|
| Processus métier | BPM, business process, workflow, |
| BPMN | BPMN, business process model and notation, process model generation |
| Génération | code generation, model transformation, generative software engineering |
| MDE/MDD | model-driven engineering, model-driven development, MDA, metamodel |
| Web | web application, model-driven web development, GUI generation, frontend generation |
| Low-code | low-code, no-code, domain-specific low-code platform, workflow-driven low-code |
| Données | data-aware workflow, data-intensive workflow, intermediate artifact |

## Requêtes génériques

```text
("BPMN" OR "business process model" OR "business process modeling")
AND ("code generation" OR "model transformation" OR "model-driven engineering" OR "model-driven development")
AND ("web application" OR "information system" OR "software architecture")
```

```text
("business process management" OR "process-aware information system")
AND ("model-driven engineering" OR "code generation" OR "web application")
```

```text
("low-code" OR "no-code")
AND ("model-driven engineering" OR "workflow" OR "code generation")
```

```text
("BPMN" OR "business process model")
AND ("GUI generation" OR "interface generation" OR "IFML")
```

## Critères d'inclusion

Un travail est retenu s'il satisfait au moins l'un des critères suivants :

1. il traite de systèmes d'information orientés processus ;
2. il utilise BPMN comme modèle de conception, d'exécution ou de génération ;
3. il propose une génération d'application, d'interface, de workflow ou d'artefact logiciel ;
4. il analyse la relation entre low-code et ingénierie dirigée par les modèles ;
5. il propose une approche de workflow guidée par des modèles ;
6. il fournit une revue, cartographie ou synthèse utile pour situer le domaine.

## Critères d'exclusion

Un travail est exclu si :

1. il est uniquement organisationnel et ne traite pas de logiciel ;
2. il porte uniquement sur le process mining sans lien avec la génération ou l'exécution applicative ;
3. il traite d'un cas métier trop spécifique sans contribution généralisable ;
4. il ne fournit pas suffisamment d'information sur la méthode, l'architecture ou les résultats ;
5. il appartient au thème de l'identification SOA depuis modèles métier, explicitement écarté du corpus principal.

## Bases et sources

- SpringerLink
- ScienceDirect
- IEEE Xplore
- ACM Digital Library
- Scopus
- Web of Science
- Google Scholar
- ResearchGate et dépôts institutionnels lorsque le texte intégral est disponible
- Documentation officielle de BPMN/BPMS uniquement comme support technique complémentaire

## Période de couverture

Le corpus principal couvre la période **2018-2026**. Des références plus anciennes peuvent être utilisées lorsqu'elles sont méthodologiques ou fondatrices, par exemple pour les revues systématiques ou les standards.

## Grille d'analyse

Chaque article est analysé selon les dimensions suivantes :

- problème traité ;
- type de modèle utilisé ;
- méthode proposée ;
- artefacts produits ;
- niveau d'automatisation ;
- support outillé ;
- place du code source ;
- gestion de la personnalisation ;
- gestion de l'évolution ;
- limites identifiées ;
- intérêt pour ProOWeb.
