(function () {
  "use strict";

  let installPrompt = null;

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
  }

  function notifyInstallAvailability() {
    window.dispatchEvent(new CustomEvent("pwa-install-availability-changed", {
      detail: { canInstall: Boolean(installPrompt), isStandalone: isStandalone() }
    }));
  }

  async function install() {
    if (!installPrompt || typeof installPrompt.prompt !== "function") {
      return { outcome: "unavailable" };
    }

    const currentPrompt = installPrompt;
    currentPrompt.prompt();
    const choice = await currentPrompt.userChoice;
    installPrompt = null;
    notifyInstallAvailability();
    return choice;
  }

  window.PWAInstall = Object.freeze({
    canInstall: () => Boolean(installPrompt),
    isStandalone,
    install
  });

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    notifyInstallAvailability();
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    notifyInstallAvailability();
  });

  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(error => {
      console.warn("Nie udało się uruchomić trybu offline:", error);
    });
  });
}());
