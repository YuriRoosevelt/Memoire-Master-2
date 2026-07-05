const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { spawn } = require("node:child_process");
const WebSocket = require(process.env.PROOWEB_NODE_MODULES + "/ws");

const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const outputDir = "C:/Users/Yuri Roosevelt NK/3D Objects/memoire/my_thesis/my_thesis/My-Thesis/Chap4/images/scenario-commande-client";
const userDataDir = "C:/Users/Public/Documents/Wondershare/CreatorTemp/prooweb-capture-chrome";
const port = 9333;

fs.mkdirSync(outputDir, { recursive: true });

const steps = [
  { activityId: "UserTask_PasserCommande", actor: "yuri.client", role: "CLIENT" },
  { activityId: "UserTask_VerifierInfosCommande", actor: "yuri.commercial", role: "SERVICE_COMMERCIAL" },
  { activityId: "UserTask_ValiderCommande", actor: "yuri.commercial", role: "SERVICE_COMMERCIAL" },
  { activityId: "UserTask_VerifierDisponibiliteProduits", actor: "yuri.stock", role: "GESTIONNAIRE_DE_STOCK" },
  { activityId: "UserTask_PreparerCommande", actor: "yuri.stock", role: "GESTIONNAIRE_DE_STOCK" },
  { activityId: "UserTask_EnregistrerPreparation", actor: "yuri.stock", role: "GESTIONNAIRE_DE_STOCK" },
  { activityId: "UserTask_ConfirmerCommandePreparee", actor: "yuri.commercial", role: "SERVICE_COMMERCIAL" },
  { activityId: "UserTask_ConsulterConfirmation", actor: "yuri.client", role: "CLIENT" },
];

const state = {
  started: false,
  cursor: 0,
  instanceId: "cmd-thesis-001",
  timeline: [],
  processData: {},
};

function currentStep() {
  return state.started && state.cursor < steps.length ? steps[state.cursor] : null;
}

function currentTask() {
  const step = currentStep();
  if (!step) return null;
  return {
    taskId: `tsk-${String(state.cursor + 1).padStart(2, "0")}-${step.activityId}`,
    instanceId: state.instanceId,
    activityId: step.activityId,
    assignee: step.actor,
    activityType: "MANUAL",
    assignmentStatus: "ASSIGNED",
    assignmentMode: "AUTOMATIC",
    assignmentStrategy: "ROLE_QUEUE",
    candidateRoles: [step.role],
    manualAssignerRoles: ["PROCESS_MONITOR"],
    automaticTaskPolicy: "NONE",
    inputData: state.processData,
  };
}

function instancePayload() {
  const task = currentTask();
  return {
    instanceId: state.instanceId,
    modelKey: "commande-client",
    versionNumber: 1,
    status: state.cursor >= steps.length ? "COMPLETED" : "RUNNING",
    startedBy: "yuri.client",
    tasks: task ? [{ taskId: task.taskId, activityId: task.activityId, assignee: task.assignee, status: "PENDING" }] : [],
  };
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (error) { reject(error); }
      });
    }).on("error", reject);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDebugger() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const targets = await getJson(`http://127.0.0.1:${port}/json`);
      const page = targets.find((target) => target.type === "page");
      if (page) return page;
    } catch (_) {}
    await delay(250);
  }
  throw new Error("Chrome DevTools n'a pas répondu.");
}

class CdpClient {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.handlers = new Map();
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.ws.once("open", resolve);
      this.ws.once("error", reject);
    });
    this.ws.on("message", (raw) => {
      const message = JSON.parse(raw.toString());
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result || {});
        return;
      }
      const handlers = this.handlers.get(message.method) || [];
      for (const handler of handlers) handler(message.params || {});
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, handler) {
    const handlers = this.handlers.get(method) || [];
    handlers.push(handler);
    this.handlers.set(method, handlers);
  }
}

function responseFor(url, method, postData) {
  const parsedBody = postData ? JSON.parse(postData) : {};
  if (method === "GET" && url.includes("/start-options")) {
    return { startOptions: [{ modelKey: "commande-client", versionNumber: 1, allowedStartActivities: [steps[0].activityId], startableByRoles: ["CLIENT"] }] };
  }
  if (method === "GET" && url.includes("/tasks")) {
    const task = currentTask();
    return { tasks: task ? [task] : [] };
  }
  if (method === "GET" && url.includes("/timeline")) return { timeline: state.timeline };
  if (method === "GET" && /\/instances\/[^/?]+/.test(url)) return { instance: state.started ? instancePayload() : null };
  if (method === "GET" && url.includes("/instances")) return { instances: state.started ? [instancePayload()] : [] };
  if (method === "POST" && url.endsWith("/instances/start")) {
    state.started = true;
    state.cursor = 0;
    state.processData = parsedBody.initialPayload || {};
    state.timeline = ["INSTANCE_STARTED:yuri.client", `TASK_CREATED:${steps[0].activityId}:yuri.client`];
    return { instance: instancePayload() };
  }
  if (method === "POST" && url.includes("/complete")) {
    const step = currentStep();
    if (step) {
      state.processData = { ...state.processData, ...(parsedBody.payload || {}) };
      state.timeline.push(`TASK_COMPLETED:${step.activityId}:${step.actor}`);
      state.cursor += 1;
      const next = currentStep();
      if (next) state.timeline.push(`TASK_CREATED:${next.activityId}:${next.actor}`);
      else state.timeline.push("INSTANCE_COMPLETED");
    }
    return { task: step ? { activityId: step.activityId, status: "COMPLETED" } : null };
  }
  if (method === "POST" && url.includes("/assign")) return { task: currentTask() };
  return {};
}

async function main() {
  const chrome = spawn(chromePath, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "--window-size=1440,900",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "http://127.0.0.1:3001/connexion",
  ], { stdio: "ignore", windowsHide: true });

  try {
    const target = await waitForDebugger();
    const cdp = new CdpClient(target.webSocketDebuggerUrl);
    await cdp.open();
    await Promise.all([
      cdp.send("Page.enable"),
      cdp.send("Runtime.enable"),
      cdp.send("Network.enable"),
      cdp.send("Fetch.enable", { patterns: [{ urlPattern: "*/api/process-runtime/*", requestStage: "Request" }] }),
    ]);

    cdp.on("Fetch.requestPaused", async ({ requestId, request }) => {
      try {
        const body = responseFor(request.url, request.method, request.postData || "");
        await cdp.send("Fetch.fulfillRequest", {
          requestId,
          responseCode: 200,
          responseHeaders: [{ name: "Content-Type", value: "application/json; charset=utf-8" }],
          body: Buffer.from(JSON.stringify(body)).toString("base64"),
        });
      } catch (error) {
        await cdp.send("Fetch.failRequest", { requestId, errorReason: "Failed" });
      }
    });

    async function evaluate(expression) {
      const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Erreur JavaScript dans la page");
      return result.result?.value;
    }

    async function waitFor(expression, description) {
      for (let attempt = 0; attempt < 120; attempt += 1) {
        if (await evaluate(expression)) return;
        await delay(100);
      }
      throw new Error(`Élément introuvable : ${description}`);
    }

    async function setValue(selector, value) {
      const encodedSelector = JSON.stringify(selector);
      const encodedValue = JSON.stringify(value);
      await evaluate(`(() => {
        const element = document.querySelector(${encodedSelector});
        if (!element) return false;
        const prototype = element.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype
          : element.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(prototype, "value").set.call(element, ${encodedValue});
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      })()`);
    }

    async function clickText(text, selector = "button") {
      const encodedText = JSON.stringify(text);
      const encodedSelector = JSON.stringify(selector);
      const clicked = await evaluate(`(() => {
        const candidates = Array.from(document.querySelectorAll(${encodedSelector}));
        const element = candidates.find((item) => item.textContent.trim() === ${encodedText});
        if (!element) return false;
        element.click();
        return true;
      })()`);
      if (!clicked) throw new Error(`Contrôle introuvable : ${text}`);
    }

    async function screenshot(name) {
      await evaluate("window.scrollTo(0, 0)");
      await delay(250);
      const result = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, fromSurface: true });
      fs.writeFileSync(path.join(outputDir, `${name}.png`), Buffer.from(result.data, "base64"));
    }

    async function navigate(url) {
      await cdp.send("Page.navigate", { url });
      await waitFor("document.readyState === 'complete'", url);
    }

    async function login(username, password) {
      await navigate("http://127.0.0.1:3001/connexion");
      await waitFor("!!document.querySelector('input[autocomplete=\"username\"]')", "formulaire de connexion");
      await setValue('input[autocomplete="username"]', username);
      await setValue('input[autocomplete="current-password"]', password);
      await clickText("Se connecter");
      await waitFor("location.pathname === '/portail'", `portail de ${username}`);
    }

    async function openCommande() {
      const opened = await evaluate(`(() => {
        const title = Array.from(document.querySelectorAll("h2")).find((item) => item.textContent.trim() === "Commande client");
        const button = title?.closest(".bp-card")?.querySelector("button");
        if (!button) return false;
        button.click();
        return true;
      })()`);
      if (!opened) throw new Error("Carte Commande client introuvable");
      await waitFor("location.pathname === '/processus/commande-client'", "page commande-client");
      await delay(300);
      await clickText("Actualiser");
      await delay(450);
    }

    async function logout() {
      await clickText("Logout");
      await delay(150);
    }

    async function completeTask() {
      await clickText("Traiter");
      await waitFor("Array.from(document.querySelectorAll('button')).some((b) => b.textContent.trim() === 'Confirmer')", "boîte de traitement");
      await clickText("Confirmer");
      await delay(350);
    }

    await waitFor("!!document.querySelector('input[autocomplete=\"username\"]')", "page de connexion initiale");
    await login("yuri.client", "client123");
    await openCommande();
    await clickText("+ Démarrer");
    await setValue('input[placeholder="Nom du client (ex: Yuri Roosevelt)"]', "Yuri Roosevelt");
    await setValue('textarea[placeholder="Adresse de livraison"]', "Dschang, quartier Foto");
    await setValue("select", "REF-002");
    await setValue('input[type="number"]', "1");
    await screenshot("01-client-saisie-commande");
    await clickText("Démarrer");
    await waitFor("document.body.innerText.includes('Passer la commande (User Task)')", "tâche du client");
    await screenshot("02-client-instance-demarree");
    await completeTask();

    await logout();
    await login("yuri.commercial", "commercial123");
    await openCommande();
    await waitFor("document.body.innerText.includes('Vérifier les informations de la commande (User Task)')", "vérification commerciale");
    await screenshot("03-service-commercial-verification");
    await completeTask();
    await waitFor("document.body.innerText.includes('Valider la commande (User Task)')", "validation commerciale");
    await completeTask();

    await logout();
    await login("yuri.stock", "stock123");
    await openCommande();
    await waitFor("document.body.innerText.includes('Vérifier la disponibilité des produits (User Task)')", "vérification du stock");
    await screenshot("04-gestionnaire-stock-disponibilite");
    await completeTask();
    await waitFor("document.body.innerText.includes('Préparer la commande (User Task)')", "préparation de la commande");
    await completeTask();
    await waitFor("document.body.innerText.includes('Enregistrer la préparation (User Task)')", "enregistrement de la préparation");
    await screenshot("05-gestionnaire-stock-preparation");
    await completeTask();

    await logout();
    await login("yuri.commercial", "commercial123");
    await openCommande();
    await waitFor("document.body.innerText.includes('Confirmer la commande préparée (User Task)')", "confirmation commerciale");
    await screenshot("06-service-commercial-confirmation");
    await completeTask();

    await logout();
    await login("yuri.client", "client123");
    await openCommande();
    await waitFor("document.body.innerText.includes('Consulter la confirmation (User Task)')", "consultation finale du client");
    await screenshot("07-client-consultation-confirmation");
    await completeTask();
    await waitFor("document.body.innerText.includes('COMPLETED')", "instance terminée");
    await clickText("Voir le détail");
    await waitFor("document.body.innerText.includes('INSTANCE_COMPLETED')", "chronologie finale");
    await screenshot("08-instance-commande-terminee");

    console.log(JSON.stringify({ ok: true, screenshots: fs.readdirSync(outputDir).filter((name) => name.endsWith(".png")), timeline: state.timeline }, null, 2));
    cdp.ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
