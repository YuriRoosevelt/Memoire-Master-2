describe("Observation du scénario complet commande-client", () => {
  const modelKey = "commande-client";
  const versionNumber = 1;
  const instanceId = "cmd-thesis-001";
  const path = [
    { activityId: "UserTask_PasserCommande", actor: "yuri.client", role: "CLIENT" },
    { activityId: "UserTask_VerifierInfosCommande", actor: "yuri.commercial", role: "SERVICE_COMMERCIAL" },
    { activityId: "UserTask_ValiderCommande", actor: "yuri.commercial", role: "SERVICE_COMMERCIAL" },
    { activityId: "UserTask_VerifierDisponibiliteProduits", actor: "yuri.stock", role: "GESTIONNAIRE_DE_STOCK" },
    { activityId: "UserTask_PreparerCommande", actor: "yuri.stock", role: "GESTIONNAIRE_DE_STOCK" },
    { activityId: "UserTask_EnregistrerPreparation", actor: "yuri.stock", role: "GESTIONNAIRE_DE_STOCK" },
    { activityId: "UserTask_ConfirmerCommandePreparee", actor: "yuri.commercial", role: "SERVICE_COMMERCIAL" },
    { activityId: "UserTask_ConsulterConfirmation", actor: "yuri.client", role: "CLIENT" },
  ];

  let started = false;
  let cursor = 0;
  let timeline = [];
  let processData = {};

  const currentStep = () => (started && cursor < path.length ? path[cursor] : null);

  function currentTask() {
    const step = currentStep();
    if (!step) return null;
    return {
      taskId: `tsk-${String(cursor + 1).padStart(2, "0")}-${step.activityId}`,
      instanceId,
      activityId: step.activityId,
      assignee: step.actor,
      activityType: "MANUAL",
      assignmentStatus: "ASSIGNED",
      assignmentMode: "AUTOMATIC",
      assignmentStrategy: "ROLE_QUEUE",
      candidateRoles: [step.role],
      manualAssignerRoles: ["PROCESS_MONITOR"],
      automaticTaskPolicy: "NONE",
      inputData: processData,
    };
  }

  function instance() {
    const task = currentTask();
    return {
      instanceId,
      modelKey,
      versionNumber,
      status: cursor >= path.length ? "COMPLETED" : "RUNNING",
      startedBy: "yuri.client",
      tasks: task ? [{ taskId: task.taskId, activityId: task.activityId, assignee: task.assignee, status: "PENDING" }] : [],
    };
  }

  function login(username, password) {
    cy.visit("/connexion");
    cy.get('input[autocomplete="username"]').clear().type(username);
    cy.get('input[autocomplete="current-password"]').clear().type(password, { log: false });
    cy.contains("button", "Se connecter").click();
    cy.url().should("include", "/portail");
  }

  function openCommande() {
    cy.contains("h2", "Commande client")
      .parents(".bp-card")
      .find("button")
      .contains("Accéder")
      .click();
    cy.url().should("include", "/processus/commande-client");
    cy.contains("h1", "Commande client");
  }

  function logout() {
    cy.contains("button", "Logout").click();
  }

  function completeVisibleTask() {
    cy.contains("button", "Traiter").click();
    cy.contains("button", "Confirmer").click();
  }

  before(() => {
    cy.viewport(1440, 900);

    cy.intercept("GET", "**/api/process-runtime/start-options*", {
      statusCode: 200,
      body: {
        startOptions: [{ modelKey, versionNumber, allowedStartActivities: [path[0].activityId], startableByRoles: ["CLIENT"] }],
      },
    });

    cy.intercept("GET", "**/api/process-runtime/tasks*", (request) => {
      request.reply({ statusCode: 200, body: { tasks: currentTask() ? [currentTask()] : [] } });
    });

    cy.intercept("GET", "**/api/process-runtime/instances/*/timeline*", (request) => {
      request.reply({ statusCode: 200, body: { timeline } });
    });

    cy.intercept("GET", "**/api/process-runtime/instances/*", (request) => {
      request.reply({ statusCode: 200, body: { instance: started ? instance() : null } });
    });

    cy.intercept("GET", "**/api/process-runtime/instances*", (request) => {
      request.reply({ statusCode: 200, body: { instances: started ? [instance()] : [] } });
    });

    cy.intercept("POST", "**/api/process-runtime/instances/start", (request) => {
      started = true;
      cursor = 0;
      processData = request.body?.initialPayload || {};
      timeline = ["INSTANCE_STARTED:yuri.client", `TASK_CREATED:${path[0].activityId}:yuri.client`];
      request.reply({ statusCode: 200, body: { instance: instance() } });
    });

    cy.intercept("POST", "**/api/process-runtime/tasks/*/complete", (request) => {
      const step = currentStep();
      if (step) {
        processData = { ...processData, ...(request.body?.payload || {}) };
        timeline.push(`TASK_COMPLETED:${step.activityId}:${step.actor}`);
        cursor += 1;
        const next = currentStep();
        if (next) timeline.push(`TASK_CREATED:${next.activityId}:${next.actor}`);
        else timeline.push("INSTANCE_COMPLETED");
      }
      request.reply({ statusCode: 200, body: { task: step ? { activityId: step.activityId, status: "COMPLETED" } : null } });
    });

    cy.intercept("POST", "**/api/process-runtime/tasks/*/assign", (request) => {
      request.reply({ statusCode: 200, body: { task: currentTask() } });
    });
  });

  it("déroule le chemin nominal en conservant la même instance entre les rôles", () => {
    login("yuri.client", "client123");
    openCommande();
    cy.contains("button", "+ Démarrer").click();
    cy.get('input[placeholder="Nom du client (ex: Yuri Roosevelt)"]').type("Yuri Roosevelt");
    cy.get('textarea[placeholder="Adresse de livraison"]').type("Dschang, quartier Foto");
    cy.get("select").select("REF-002");
    cy.get('input[type="number"]').clear().type("1");
    cy.screenshot("01-client-saisie-commande", { capture: "viewport" });
    cy.contains("button", "Démarrer").click();
    cy.contains("Passer la commande (User Task)");
    cy.screenshot("02-client-instance-demarree", { capture: "viewport" });
    completeVisibleTask();

    logout();
    login("yuri.commercial", "commercial123");
    openCommande();
    cy.contains("Vérifier les informations de la commande (User Task)");
    cy.screenshot("03-service-commercial-verification", { capture: "viewport" });
    completeVisibleTask();
    cy.contains("Valider la commande (User Task)");
    completeVisibleTask();

    logout();
    login("yuri.stock", "stock123");
    openCommande();
    cy.contains("Vérifier la disponibilité des produits (User Task)");
    cy.screenshot("04-gestionnaire-stock-disponibilite", { capture: "viewport" });
    completeVisibleTask();
    cy.contains("Préparer la commande (User Task)");
    completeVisibleTask();
    cy.contains("Enregistrer la préparation (User Task)");
    cy.screenshot("05-gestionnaire-stock-preparation", { capture: "viewport" });
    completeVisibleTask();

    logout();
    login("yuri.commercial", "commercial123");
    openCommande();
    cy.contains("Confirmer la commande préparée (User Task)");
    cy.screenshot("06-service-commercial-confirmation", { capture: "viewport" });
    completeVisibleTask();

    logout();
    login("yuri.client", "client123");
    openCommande();
    cy.contains("Consulter la confirmation (User Task)");
    cy.screenshot("07-client-consultation-confirmation", { capture: "viewport" });
    completeVisibleTask();
    cy.contains("COMPLETED");
    cy.contains("button", "Voir le détail").click();
    cy.contains("INSTANCE_COMPLETED");
    cy.screenshot("08-instance-commande-terminee", { capture: "viewport" });
  });
});
