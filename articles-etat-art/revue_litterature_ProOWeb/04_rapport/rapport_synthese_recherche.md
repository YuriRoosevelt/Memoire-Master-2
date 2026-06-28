# Rapport de synthèse de la recherche documentaire

## Objet de la revue

Cette campagne documentaire prépare la revue de littérature du mémoire sur ProOWeb. Le problème étudié est le passage d'un modèle de processus métier, principalement BPMN, vers une application web complète, modulaire et maintenable.

La revue cherche à répondre à une question simple mais centrale : pourquoi faut-il un framework comme ProOWeb alors qu'il existe déjà des notations BPMN, des BPMS, des outils MDE et des plateformes low-code ?

## Corpus retenu

Le corpus principal comprend 15 articles publiés entre 2022 et 2026, avec une couverture des axes suivants :

- systèmes d'information orientés processus ;
- génération d'applications web process-aware ;
- BPMN enrichi et génération d'interfaces ;
- développement web dirigé par les modèles ;
- low-code et ingénierie dirigée par les modèles ;
- workflows orientés données ;
- assistance à la génération ou à l'évaluation de modèles BPMN par IA.

Les PDF du corpus sont placés dans :

`05_articles_telecharges/ProOWeb_corpus/`

## Résultats principaux

### 1. BPMN est pertinent, mais insuffisant seul

BPMN permet de représenter le déroulement d'un processus métier de manière compréhensible. Cependant, les travaux consultés montrent qu'il doit être enrichi pour permettre la génération d'une application complète. Les formulaires, les données, les règles d'accès, les composants frontend et les services backend ne sont généralement pas décrits par un diagramme BPMN brut.

### 2. Les BPMS exécutent les processus, mais ne couvrent pas toute la génération applicative

Les moteurs de workflow et les BPMS sont efficaces pour gérer les instances, les tâches et les transitions. Leur limite, pour notre sujet, est qu'ils introduisent souvent une architecture centrée sur le moteur et ne produisent pas nécessairement un projet source-owned que les développeurs peuvent maintenir librement.

### 3. Les approches MDE fournissent le cadre théorique de la génération

Les travaux sur l'ingénierie dirigée par les modèles confirment que les modèles peuvent devenir des artefacts productifs. Ils montrent aussi que la génération doit être gouvernée : validation, transformations explicites, modèles intermédiaires, traçabilité et gestion de l'évolution.

### 4. Les approches low-code rapprochent métier et technique, mais posent la question de la maîtrise

Le low-code répond au besoin d'accélérer le développement. Toutefois, la littérature souligne des risques de dépendance à la plateforme, de faible maîtrise du code généré et de personnalisation limitée. ProOWeb doit donc se positionner comme une solution générative mais source-owned.

### 5. Les workflows orientés données justifient les contrats intermédiaires

Une application orientée processus ne manipule pas seulement des étapes ; elle manipule aussi des données, des statuts et des décisions. Les travaux sur les DSL et workflows data-intensive justifient l'utilisation de contrats intermédiaires comme le contrat runtime et le contrat de données dans ProOWeb.

## Lacunes identifiées

Les travaux existants ne couvrent pas complètement :

- la génération intégrée backend + frontend à partir de BPMN enrichi ;
- la conservation du code source comme artefact maîtrisable ;
- la régénération sûre lorsque les modèles évoluent ;
- la gestion des personnalisations humaines ;
- la variabilité par modules ou feature packs ;
- l'intégration explicite des données, rôles, règles et transitions dans une chaîne unique.

## Positionnement de ProOWeb

ProOWeb se positionne comme une solution médiane :

- plus automatisée que le développement manuel ;
- moins dépendante d'un moteur externe qu'un BPMS classique ;
- plus maîtrisable qu'une plateforme low-code fermée ;
- plus spécialisée qu'un générateur de code générique.

Sa contribution attendue est une méthode et une architecture permettant de transformer des modèles BPMN enrichis en applications web complètes, modulaires, maintenables et source-owned.

## Prochaine étape

La prochaine étape consiste à transformer cette synthèse en chapitre rédigé, avec :

1. une introduction méthodologique ;
2. une présentation du corpus ;
3. une analyse par axes ;
4. une synthèse critique ;
5. un positionnement explicite de ProOWeb.
