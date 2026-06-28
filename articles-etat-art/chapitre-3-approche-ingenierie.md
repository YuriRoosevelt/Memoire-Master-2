# Chapitre 3 : Approche d'ingénierie de la solution

## 3.1 Contexte et problème à résoudre

Les organisations utilisent de plus en plus des applications web pour automatiser leurs activités internes : traitement des demandes, validation de dossiers, suivi administratif, gestion de réclamations, circuits d'approbation ou encore coordination entre plusieurs services. Ces activités suivent souvent une logique de processus : une demande est créée, elle passe par plusieurs étapes, elle est affectée à des acteurs différents, elle peut être validée, rejetée, complétée ou archivée. Pour représenter ces enchaînements, les organisations utilisent parfois des diagrammes de processus, notamment le standard BPMN.

Le BPMN, ou Business Process Model and Notation, permet de représenter graphiquement un processus métier. Il montre les activités à réaliser, les événements de début et de fin, les décisions, les transitions et parfois les acteurs impliqués. Il est donc très utile pour comprendre le fonctionnement métier d'une organisation. Cependant, dans beaucoup de projets logiciels, le BPMN reste principalement un document d'analyse ou de communication. Les développeurs l'utilisent pour comprendre le besoin, puis ils réécrivent manuellement la logique du processus dans le code backend, dans les écrans frontend, dans la base de données et dans les règles de sécurité.

Cette séparation crée un problème important : le modèle métier et le logiciel final peuvent diverger. Le processus décrit par les analystes peut ne plus correspondre exactement au comportement réellement exécuté par l'application. Lorsqu'une règle change, il faut modifier le diagramme, puis modifier manuellement le code, puis vérifier que les deux restent cohérents. Cette opération est coûteuse, fragile et difficile à tracer. Le problème devient encore plus visible lorsque les processus évoluent souvent, ce qui est fréquent dans les organisations.

Un autre problème concerne la répétition des tâches techniques. Pour chaque nouvelle application orientée processus, les développeurs doivent recréer des éléments similaires : architecture backend, frontend, authentification, gestion des utilisateurs, rôles, formulaires, base de données, API REST, tests, scripts de démarrage et fichiers de déploiement. Même si le métier change, une grande partie de la structure technique reste comparable. Cette répétition consomme du temps, augmente le coût des projets et peut produire des applications hétérogènes.

Le problème central de ce travail est donc le suivant : comment concevoir un framework capable de transformer des modèles BPMN en applications web exécutables, tout en conservant une architecture claire, un code source maîtrisable, une traçabilité entre modèle et application, et une capacité d'évolution lorsque le processus change ?

## 3.2 Objectifs de la solution

L'objectif principal de la solution est de rapprocher la modélisation métier et la construction logicielle. Il ne s'agit pas seulement de dessiner un processus, mais de faire du modèle de processus un véritable point de départ pour générer une application web. Le BPMN devient ainsi un artefact d'ingénierie, c'est-à-dire un élément utilisé directement dans la production du système logiciel.

La solution vise aussi à réduire les tâches répétitives du développement. Le framework doit générer automatiquement une base applicative comprenant le backend, le frontend, les modules de sécurité, les interfaces de consultation, les scripts de build, les tests et les fichiers de déploiement. Le développeur ne part donc plus d'un projet vide : il reçoit une structure déjà organisée, adaptée au processus métier décrit.

Un autre objectif important est la maintenabilité. Le code généré ne doit pas être un bloc opaque impossible à comprendre. Il doit rester lisible, structuré et modifiable par une équipe de développement. Contrairement à certaines plateformes low-code où le code est caché ou difficilement maîtrisable, l'approche proposée conserve la propriété du code source par l'équipe projet.

Enfin, la solution doit permettre l'évolution. Un processus métier n'est jamais figé : les rôles changent, les règles d'affectation évoluent, de nouvelles étapes apparaissent, certaines disparaissent. Le framework doit donc permettre de versionner les modèles, de comparer les versions, de déployer une nouvelle version et de régénérer les artefacts sans écraser brutalement les adaptations réalisées par les développeurs.

## 3.3 Périmètre et hypothèses

Le périmètre de la solution concerne les applications web orientées processus. Il s'agit principalement d'applications où l'utilisateur suit un enchaînement d'étapes métier : création d'une demande, instruction, validation, traitement, notification, supervision et archivage. Ce type d'application est courant dans les administrations, les entreprises, les universités, les banques ou les services internes.

La solution ne cherche pas à couvrir tous les types d'applications possibles. Par exemple, elle ne vise pas directement les jeux, les réseaux sociaux, les systèmes temps réel complexes ou les applications purement statistiques. Elle est particulièrement adaptée aux systèmes où la logique métier peut être représentée sous forme de workflow ou de processus.

Une hypothèse importante est que le BPMN seul ne suffit pas. Il décrit bien le déroulement général du processus, mais il ne contient pas toujours toutes les informations nécessaires pour générer une application complète. Par exemple, un diagramme BPMN peut indiquer une tâche "Valider la demande", mais il ne précise pas forcément quel rôle peut la réaliser, quelles données doivent être affichées, quels champs doivent être remplis, quelle notification doit être envoyée ou quelles règles de sécurité doivent être appliquées.

Pour cette raison, l'approche ajoute une spécification complémentaire au BPMN. Dans le prototype, cette spécification est appelée `spec-v1`. Elle permet d'enrichir le modèle BPMN avec des informations techniques et fonctionnelles nécessaires à l'exécution. Le BPMN décrit donc le chemin du processus, tandis que la spécification complémentaire décrit les conditions d'exécution de ce chemin dans une application web réelle.

## 3.4 Acteurs et cas d'usage

Plusieurs acteurs interviennent dans l'approche proposée. Le premier est l'analyste métier. Son rôle est de comprendre le fonctionnement de l'organisation et de représenter les processus sous une forme claire. Il peut utiliser le BPMN pour décrire les étapes, les décisions et les transitions. Il n'a pas nécessairement besoin de connaître les détails techniques du backend ou du frontend.

Le deuxième acteur est le développeur. Il utilise le framework pour initialiser le projet, configurer les choix techniques, valider les modèles, générer le code et compléter l'application lorsque des besoins spécifiques dépassent la génération automatique. Son rôle reste essentiel, car le framework ne remplace pas l'ingénierie logicielle ; il automatise une partie structurée du travail.

Le troisième acteur est l'administrateur ou responsable technique. Il configure les aspects transversaux comme l'authentification, les rôles, les politiques de sécurité, les environnements de déploiement ou les paramètres liés aux notifications. Il s'assure que l'application générée peut être exploitée dans un contexte réel.

Le quatrième acteur est l'utilisateur final. Il n'utilise pas directement le framework, mais l'application générée. Il démarre des processus, traite des tâches, consulte les informations qui lui sont autorisées et participe au workflow métier.

Les principaux cas d'usage sont donc : créer un projet, configurer l'architecture cible, modéliser un processus BPMN, enrichir le modèle par une spécification, valider le processus, simuler ou prévisualiser son comportement, générer l'application, déployer une version de processus, exécuter des instances et superviser les traitements.

## 3.5 Exigences fonctionnelles

Le framework doit d'abord permettre l'initialisation d'un espace de travail. Cette étape consiste à définir les informations principales du projet : nom, package backend, technologie frontend, base de données, options de sécurité, profils d'exécution et capacités à activer. L'objectif est de produire une structure de départ cohérente pour l'application.

Il doit ensuite permettre la gestion des modèles de processus. Cela comprend la création d'un modèle BPMN, l'importation ou l'édition du diagramme, la création de versions, la consultation de l'historique, la comparaison entre versions et la validation de la cohérence du modèle. Une version de processus doit pouvoir passer par différents états, par exemple brouillon, validée, déployée ou retirée.

Le framework doit également permettre l'enrichissement du BPMN à travers une spécification complémentaire. Cette spécification décrit les règles que le diagramme seul ne peut pas exprimer complètement : rôles autorisés, stratégies d'affectation, données d'entrée et de sortie, visibilité des informations, tâches automatiques et règles de supervision.

Une fois les modèles validés, le framework doit générer les artefacts techniques. Cela inclut les sources backend, les sources frontend, les catalogues de processus, les contrats runtime, les contrats de données, les tests, les scripts d'exécution, les fichiers Docker et la documentation projet. L'application générée doit ensuite offrir les fonctionnalités nécessaires à l'exécution des processus : démarrage d'instance, consultation de tâches, affectation, complétion, suivi de timeline, supervision et audit.

## 3.6 Exigences non fonctionnelles

La maintenabilité est une exigence majeure. Le code généré doit pouvoir être lu et compris par des développeurs. Il doit suivre une organisation claire, avec des modules identifiables et des responsabilités séparées. Une application générée qui fonctionne mais dont le code est incompréhensible serait difficile à utiliser dans un contexte professionnel.

La traçabilité est également essentielle. Il doit être possible de savoir quel modèle BPMN a produit quels artefacts, quelle version de processus est déployée, quels fichiers sont générés et quelles modifications ont été apportées. Cette traçabilité permet de justifier les évolutions et de comprendre l'origine d'un comportement applicatif.

La sécurité doit être intégrée dès le départ. Comme les processus métier manipulent souvent des données sensibles, l'application générée doit contrôler les accès, gérer les rôles, limiter les actions selon les permissions et enregistrer les opérations importantes. La sécurité ne doit pas être ajoutée manuellement à la fin du projet.

La testabilité constitue une autre exigence importante. Le framework doit produire une application qui peut être testée automatiquement. Les tests permettent de vérifier que le code généré compile, que les services fonctionnent, que les API répondent correctement et que les scénarios principaux du processus sont exécutables.

## 3.7 Principes d'ingénierie retenus

Le premier principe est la centralité du processus. Dans cette approche, le processus métier n'est pas un document secondaire. Il devient l'élément autour duquel l'application est construite. Les écrans, les API, les tâches, les affectations et les règles d'accès découlent du processus.

Le deuxième principe est l'ingénierie dirigée par les modèles. Cela signifie que les modèles servent à produire des éléments logiciels concrets. Le modèle n'est plus uniquement descriptif ; il devient productif. Cette approche permet de réduire la distance entre analyse métier et implémentation.

Le troisième principe est la séparation entre conception et exécution. Le framework ProOWeb sert à concevoir, valider, versionner et générer. L'application générée sert à exécuter les processus auprès des utilisateurs finaux. Cette séparation évite que le runtime dépende directement des fichiers internes du studio.

Le quatrième principe est la propriété du code généré. Les développeurs doivent pouvoir ouvrir, lire, modifier, tester et déployer le code produit. Cette décision distingue l'approche proposée d'un outil qui enfermerait l'utilisateur dans une plateforme fermée.

## 3.8 Architecture globale du framework

L'architecture du framework peut être comprise comme une chaîne composée de quatre grands blocs. Le premier bloc est le studio web. Il fournit les interfaces utilisées pour configurer le projet, éditer les modèles BPMN, modifier les spécifications, consulter les versions et déclencher les opérations de génération.

Le deuxième bloc correspond aux services applicatifs du framework. Ces services coordonnent les actions demandées par l'utilisateur : initialisation du workspace, validation d'un modèle, création d'une version, déploiement, migration ou reconfiguration. Ils jouent le rôle d'intermédiaire entre l'interface web et le noyau technique.

Le troisième bloc est le noyau du framework. Il contient les règles fondamentales : gestion des modèles, gestion des versions, construction des contrats intermédiaires, registre des feature packs, règles de génération et gouvernance des fichiers managés. C'est la partie la plus stable de l'architecture.

Le quatrième bloc est le moteur de génération. Il transforme les modèles et les configurations en fichiers concrets : classes Java, composants React, fichiers de configuration, tests, scripts et documentation. Il agit comme un compilateur spécialisé, dont l'entrée est un ensemble de modèles et dont la sortie est une application web.

## 3.9 Modèles manipulés

Le premier modèle manipulé est le BPMN. Il décrit la structure générale du processus : où il commence, quelles activités sont exécutées, quelles décisions sont prises, et comment le processus se termine. Pour un lecteur non technique, on peut voir le BPMN comme une carte du chemin métier.

Le deuxième modèle est la spécification complémentaire `spec-v1`. Elle ajoute les informations nécessaires à l'exécution informatique du processus. Par exemple, elle peut préciser que la tâche "Valider" est réservée au rôle "Responsable", que certains champs sont visibles uniquement par un superviseur, ou qu'une notification doit être envoyée après une étape.

Le troisième modèle est la configuration du projet. Elle décrit les choix techniques : type de backend, frontend, base de données, sécurité, options d'organisation, notifications et profils de déploiement. Ces informations permettent d'adapter la génération au contexte du projet.

Enfin, le framework produit des modèles intermédiaires. Le contrat runtime décrit comment le processus sera exécuté dans l'application. Le contrat de données décrit les données utilisées, produites, partagées ou visibles. Ces contrats rendent la génération plus fiable, car le code n'est pas produit directement à partir du BPMN brut.

## 3.10 Chaîne de transformation et de génération

La chaîne commence par la saisie ou l'importation d'un modèle BPMN. Ce modèle est ensuite associé à une spécification complémentaire. Le framework vérifie que les deux éléments sont cohérents : par exemple, une activité mentionnée dans la spécification doit réellement exister dans le diagramme BPMN.

Après validation, le framework construit une représentation interne normalisée. Cette étape est importante, car elle transforme des documents d'entrée en une structure plus facile à exploiter par le générateur. À partir de cette représentation, il produit ensuite le contrat runtime et le contrat de données.

Le moteur de génération utilise ces contrats pour produire l'application. Il sait quels fichiers doivent être créés, quels modules doivent être activés, quelles API doivent être exposées, quels composants frontend doivent être disponibles et quels tests doivent être générés. Cette chaîne ressemble à une compilation : au lieu de compiler un langage de programmation vers du code machine, le framework compile des modèles métier vers une application web.

## 3.11 Architecture de l'application générée

L'application générée est organisée comme un monolithe modulaire. Cela signifie qu'elle peut être déployée comme une seule application, mais qu'elle est structurée en modules internes bien séparés. Cette approche est plus simple à exploiter qu'une architecture microservices, tout en conservant une bonne séparation des responsabilités.

Côté backend, l'application suit une architecture hexagonale. Cette architecture sépare le domaine métier, les cas d'usage applicatifs et les détails techniques. Le domaine contient les concepts essentiels. La couche application orchestre les actions. La couche infrastructure gère les détails comme la base de données, les API externes ou les adaptateurs techniques.

Côté frontend, l'application est organisée par modules fonctionnels. Chaque module regroupe ses écrans, ses cas d'usage, ses modèles et ses adaptateurs HTTP. Cette organisation facilite la compréhension du code généré, car chaque partie correspond à une capacité identifiable de l'application : identité, organisation, notifications, processus ou supervision.

## 3.12 Gestion de la variabilité

Toutes les applications générées n'ont pas les mêmes besoins. Certaines nécessitent une authentification externe, d'autres non. Certaines utilisent une hiérarchie organisationnelle, d'autres uniquement des rôles simples. Certaines activent les notifications, d'autres n'en ont pas besoin. La solution doit donc gérer cette variabilité.

Pour cela, le framework utilise le principe des feature packs. Un feature pack représente une capacité activable. Il contient les règles, templates, dépendances et fichiers nécessaires pour générer cette capacité. Par exemple, un pack "notifications" peut générer les modèles, services, contrôleurs, interfaces frontend et configurations nécessaires à l'envoi et à l'audit des notifications.

Ce mécanisme rend le framework extensible. Ajouter une nouvelle capacité ne signifie pas réécrire tout le générateur. Il faut plutôt ajouter un nouveau pack bien défini, avec ses règles d'intégration. Cela permet à la solution d'évoluer progressivement.

## 3.13 Cycle de vie des modèles

Un modèle de processus ne doit pas être traité comme un simple fichier. Il doit avoir un cycle de vie contrôlé. Au départ, une version peut être en état brouillon. Elle peut ensuite être validée lorsque sa cohérence est suffisante. Elle peut être déployée lorsqu'elle doit produire des artefacts exécutables. Elle peut enfin être retirée lorsqu'elle n'est plus utilisée.

Ce cycle de vie permet de mieux gouverner les changements. Par exemple, il devient possible de conserver une ancienne version d'un processus tout en préparant une nouvelle version. On peut comparer les deux, tester la nouvelle, puis la déployer lorsque les conditions sont réunies.

Les mécanismes de simulation, promotion et rollback renforcent cette maîtrise. La simulation permet d'évaluer un comportement avant de générer ou déployer. La promotion permet de faire passer une version par des contrôles qualité. Le rollback permet de revenir à un état précédent si une évolution pose problème.

## 3.14 Gouvernance de la génération

La génération de code pose un problème délicat : que se passe-t-il si un développeur modifie un fichier généré, puis que le framework veut le générer à nouveau ? Sans gouvernance, les modifications manuelles peuvent être perdues. Cela rendrait l'outil dangereux dans un projet réel.

Pour éviter cela, le framework doit suivre les fichiers qu'il produit. Il maintient un manifeste des fichiers managés. Lors d'une nouvelle génération, il peut comparer l'état actuel des fichiers avec l'état attendu. S'il détecte des changements, il peut créer une sauvegarde, signaler le conflit ou appliquer une stratégie de migration.

Les overrides de templates permettent aussi de personnaliser durablement certains artefacts. Au lieu de modifier manuellement un fichier généré à chaque fois, l'équipe peut définir une règle de personnalisation appliquée automatiquement pendant la génération. Cela rend la personnalisation plus propre, traçable et reproductible.

## 3.15 Sécurité, testabilité et observabilité

La sécurité est indispensable dans une application orientée processus, car les workflows impliquent souvent des responsabilités différentes. Tout utilisateur ne doit pas pouvoir voir toutes les tâches, modifier tous les dossiers ou superviser toutes les instances. Le framework doit donc générer des mécanismes de contrôle d'accès, de rôles, d'authentification et d'audit.

La testabilité permet de vérifier que l'application générée est fiable. Les tests unitaires vérifient de petites parties du code. Les tests d'intégration vérifient que plusieurs composants fonctionnent ensemble. Les tests end-to-end vérifient un scénario complet du point de vue de l'utilisateur. Générer ces éléments permet de donner plus de confiance dans le résultat produit.

L'observabilité permet de comprendre ce qui se passe dans l'application lorsqu'elle fonctionne. Elle peut inclure des endpoints de santé, des journaux d'exécution, des événements d'audit, des timelines de processus et des informations de supervision. Pour une application métier, cette capacité est importante, car les responsables doivent pouvoir expliquer qui a fait quoi, quand et dans quel contexte.

## 3.16 Déploiement et exploitation

Une application ne se limite pas à son code source. Elle doit pouvoir être compilée, testée, démarrée et déployée dans différents environnements. Le framework doit donc générer des scripts et configurations permettant de passer du code produit à une application exploitable.

Les environnements peuvent être différents : développement pour les programmeurs, démonstration pour présenter la solution, test pour vérifier la qualité, préproduction pour préparer la mise en service et production pour l'utilisation réelle. Chaque environnement peut avoir ses propres paramètres : base de données, sécurité, logs, services externes ou options de debug.

En intégrant le déploiement dans la génération, le framework couvre une plus grande partie du cycle de vie logiciel. Il ne produit pas seulement des classes et des écrans ; il prépare aussi l'application à être utilisée dans des conditions proches du réel.

## 3.17 Méthode de validation

Pour valider l'approche, il ne suffit pas d'expliquer l'architecture. Il faut montrer qu'elle fonctionne sur un prototype. La validation peut consister à générer une application de référence à partir d'un processus métier concret, par exemple la gestion des requêtes ou des demandes.

Plusieurs critères peuvent être observés. Le premier est la cohérence : le comportement de l'application correspond-il au modèle BPMN ? Le deuxième est la complétude : l'application générée contient-elle les éléments nécessaires à son exécution ? Le troisième est la qualité architecturale : le code est-il structuré, lisible et modulaire ? Le quatrième est l'évolutivité : peut-on modifier le processus, générer une nouvelle version et conserver la maîtrise des changements ?

La validation doit aussi porter sur l'usage. Un utilisateur peut-il démarrer une instance, traiter une tâche, consulter l'état du processus et effectuer les actions prévues ? Un développeur peut-il comprendre le code généré et le modifier si nécessaire ? Ces questions permettent d'évaluer la pertinence réelle de la solution.

## 3.18 Forces, limites et perspectives

La principale force de l'approche est de rapprocher le métier et le logiciel. Le processus BPMN n'est plus seulement un diagramme de communication ; il devient un élément actif dans la construction de l'application. Cela améliore la cohérence entre ce qui est modélisé et ce qui est exécuté.

Une autre force est la production d'un code source maîtrisable. L'approche évite de cacher la logique dans une plateforme fermée. Les développeurs conservent la possibilité de lire, tester, modifier et déployer l'application. Cela facilite l'adoption dans des contextes où la maîtrise technique est importante.

La solution présente cependant des limites. Le BPMN doit être enrichi par une spécification complémentaire, ce qui ajoute une couche de complexité. Le moteur de génération peut également devenir difficile à maintenir si le nombre de cas couverts augmente sans organisation stricte. Enfin, la gouvernance des fichiers générés demande une discipline importante.

Les perspectives concernent l'amélioration de la simulation, l'ajout de nouveaux types de générateurs, l'extension vers d'autres technologies frontend ou backend, l'intégration avec des chaînes DevOps et l'amélioration des outils de personnalisation. À terme, le framework pourrait devenir une plateforme plus générale de construction d'applications orientées processus.

## Conclusion du chapitre

Ce chapitre a présenté l'approche d'ingénierie proposée pour concevoir un framework de génération d'applications web pilotées par des modèles BPMN. L'idée centrale est de transformer le processus métier en un artefact productif, capable de guider la génération d'une application complète.

L'approche combine plusieurs principes : ingénierie dirigée par les modèles, séparation entre conception et exécution, architecture modulaire, génération de code, gouvernance des artefacts et maintien de la propriété du code source. Elle cherche ainsi à offrir un équilibre entre automatisation et maîtrise technique.

Cette architecture constitue une base solide pour la mise en œuvre d'un framework capable de produire des applications web cohérentes, évolutives et compréhensibles, tout en plaçant le processus métier au cœur de la construction logicielle.
