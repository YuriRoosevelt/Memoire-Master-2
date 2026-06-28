# Plan de travail pour la revue de littérature

## Objectif de la revue

L'objectif de cette revue de littérature est de construire l'état de l'art du mémoire sur ProOWeb, en suivant une approche systématique. La revue doit expliquer les travaux existants autour de la modélisation BPMN, des systèmes orientés processus, des BPMS, de l'ingénierie dirigée par les modèles, de la génération de code, du low-code et des applications web générées.

Elle ne doit pas être une simple succession de résumés d'articles. Elle doit montrer progressivement le problème scientifique et technique auquel répond ProOWeb :

- comment passer d'un processus métier modélisé à une application web exploitable ;
- quelles solutions existent déjà ;
- quelles limites persistent ;
- pourquoi une approche médiane, générative et source-owned est pertinente.

## Position éthique et académique

La rédaction doit être originale, personnelle et correctement référencée. Elle doit reformuler les idées des auteurs sans copier leurs phrases. Elle doit citer les sources lorsqu'une idée, une classification, un résultat ou une limite provient de la littérature.

L'objectif n'est pas de contourner un détecteur automatique, mais de produire une revue propre, soutenable devant un jury, et réellement alignée avec le projet.

## Approche systématique retenue

La revue suivra une démarche inspirée de Kitchenham pour les revues systématiques en génie logiciel :

1. définir les questions de recherche ;
2. préciser les critères de sélection ;
3. organiser les articles par axes ;
4. analyser les contributions et limites ;
5. synthétiser les lacunes ;
6. positionner ProOWeb par rapport aux travaux étudiés.

## Questions de recherche

RQ1 : Comment les modèles BPMN sont-ils utilisés pour représenter et automatiser les processus métier ?

RQ2 : Quelles sont les limites des BPMS classiques lorsqu'on souhaite construire une application web complète et maîtrisable ?

RQ3 : Comment l'ingénierie dirigée par les modèles permet-elle de transformer des modèles en artefacts logiciels ?

RQ4 : Quels travaux abordent la génération d'applications web ou d'interfaces à partir de modèles de processus ?

RQ5 : Comment les approches low-code et model-driven se rapprochent-elles ou se différencient-elles ?

RQ6 : Quelles lacunes justifient la conception d'un framework comme ProOWeb ?

## Axes de rédaction proposés

### 1. Processus métier et systèmes d'information orientés processus

Cette partie introduit le rôle des processus métier dans les organisations et explique pourquoi les applications web doivent parfois être construites autour des workflows.

Articles utiles :

- `01-michael-2022-mde-process-aware-information-systems.pdf`
- `10-neto-2022-akip-process-aware-web-applications.pdf`

### 2. BPMN comme langage de modélisation métier

Cette partie explique l'intérêt de BPMN comme notation commune entre métier et technique, puis ses limites lorsqu'on veut générer une application complète.

Articles utiles :

- `02-fedeli-2024-flobp-model-driven-iot-business-processes.pdf`
- `03-2025-small-llms-bpmn-generation.pdf`
- `04-2026-nl-to-bpmn-generation.pdf`
- `09-2025-evaluating-llms-business-process-modeling.pdf`

### 3. BPMS et moteurs de workflow

Cette partie compare l'approche ProOWeb avec les BPMS classiques. Elle doit montrer que les BPMS sont puissants pour exécuter des processus, mais qu'ils ne répondent pas toujours au besoin d'une application générée, modulaire et source-owned.

Sources complémentaires :

- documentations Camunda, Flowable, Bonita, jBPM ;
- articles du corpus sur process-aware applications.

### 4. Ingénierie dirigée par les modèles et génération de code

Cette partie présente MDE/MDA et la génération de code comme cadre théorique de ProOWeb.

Articles utiles :

- `01-michael-2022-mde-process-aware-information-systems.pdf`
- `11-castillo-davila-2024-mdwd-tools-mapping.pdf`
- `12-frontiers-2023-auto-generating-transformation-artifacts-review.pdf`

### 5. Génération d'applications web et interfaces à partir de modèles

Cette partie se concentre sur la génération concrète d'applications web, d'interfaces et de composants exécutables.

Articles utiles :

- `10-neto-2022-akip-process-aware-web-applications.pdf`
- `15-2023-gui-generation-from-bpmn.pdf`
- `11-castillo-davila-2024-mdwd-tools-mapping.pdf`

### 6. Low-code, no-code et proximité avec MDE

Cette partie compare ProOWeb aux plateformes low-code. Elle doit montrer que ProOWeb partage l'objectif d'accélération, mais conserve une orientation code source maîtrisable.

Articles utiles :

- `05-2026-model-workflow-driven-domain-specific-low-code.pdf`
- `06-2022-modelling-in-low-code-development-multivocal-review.pdf`
- `07-2022-low-code-development-and-mde-two-sides.pdf`
- `13-pankowska-2024-low-code-development-cycle-investigation.pdf`

### 7. Données, workflows et artefacts intermédiaires

Cette partie sert à justifier les contrats runtime, les contrats de données et les modèles intermédiaires dans ProOWeb.

Articles utiles :

- `14-2023-swel-dsl-data-intensive-workflows.pdf`
- `12-frontiers-2023-auto-generating-transformation-artifacts-review.pdf`
- `08-2025-musicode-low-code-simulation-workflows.pdf`

### 8. Synthèse critique et positionnement de ProOWeb

Cette partie ne résume pas seulement les articles. Elle montre ce qui manque :

- BPMN seul ne suffit pas ;
- les BPMS imposent souvent une logique moteur ;
- le low-code peut réduire la maîtrise du code ;
- les approches MDE nécessitent une gouvernance forte ;
- la génération web complète reste difficile ;
- la régénération sûre et la personnalisation durable sont peu traitées.

## Grille d'analyse des articles

Pour chaque article, remplir :

- Référence :
- Année :
- Domaine :
- Problème traité :
- Méthode proposée :
- Modèles utilisés :
- Artefacts générés ou étudiés :
- Niveau d'automatisation :
- Apports pour notre mémoire :
- Limites :
- Lien avec ProOWeb :
- Citation ou idée à reformuler :

## Style de rédaction attendu

La revue doit être rédigée dans un style académique clair, mais pas artificiel. Chaque section doit suivre cette logique :

1. introduire le problème ;
2. présenter les travaux existants ;
3. comparer les approches ;
4. identifier les limites ;
5. faire le lien avec ProOWeb.

Chaque paragraphe doit avoir une idée principale. Les citations doivent soutenir l'argumentation, pas remplacer l'analyse.

## Prochaine étape

Commencer par rédiger la section :

`Processus métier et systèmes d'information orientés processus`

Cette section posera la base de toute la revue.

## Progression de rédaction

- [x] Processus métier et systèmes d'information orientés processus
- [x] BPMN comme langage de modélisation métier
- [x] BPMS et moteurs de workflow
- [x] Ingénierie dirigée par les modèles et génération de code
- [x] Génération d'applications web et interfaces à partir de modèles
- [x] Low-code, no-code et proximité avec MDE
- [x] Données, workflows et artefacts intermédiaires
- [x] Synthèse critique et positionnement de ProOWeb

## Fichier final produit

La version LaTeX finale de la revue est disponible dans :

`docs/memoire/revue-litterature-finale.tex`
