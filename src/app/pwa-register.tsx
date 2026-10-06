"use client";

import { useEffect, useRef, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISS_KEY = "the-wall-install-dismissed";

export default function PwaRegister() {
  const [offline, setOffline] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [updateReady, setUpdateReady] = useState<ServiceWorker | null>(null);
  const reloadForUpdate = useRef(false);

  useEffect(() => {
    const installed = window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches;
    const dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    setOffline(!navigator.onLine);

    const online = () => {
      setOffline(false);
      setReconnecting(true);
      window.setTimeout(() => setReconnecting(false), 1200);
    };
    const off = () => {
      setReconnecting(false);
      setOffline(true);
    };
    const install = (event: Event) => {
      if (installed || dismissed) return;
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    window.addEventListener("online", online);
    window.addEventListener("offline", off);
    window.addEventListener("beforeinstallprompt", install);

    let registration: ServiceWorkerRegistration | null = null;
    const inspect = () => {
      if (registration?.waiting && navigator.serviceWorker.controller) setUpdateReady(registration.waiting);
    };
    const register = async () => {
      if (!("serviceWorker" in navigator)) return;
      try {
        registration = await navigator.serviceWorker.register("/sw.js");
        inspect();
        registration.addEventListener("updatefound", () => {
          const worker = registration?.installing;
          if (!worker) return;
          worker.addEventListener("statechange", inspect);
        });
        await registration.update();
        inspect();
      } catch {}
    };

    void register();

    const installedNow = () => setInstallPrompt(null);
    const controllerChange = () => {
      if (reloadForUpdate.current) window.location.reload();
    };
    window.addEventListener("appinstalled", installedNow);
    navigator.serviceWorker?.addEventListener("controllerchange", controllerChange);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", off);
      window.removeEventListener("beforeinstallprompt", install);
      window.removeEventListener("appinstalled", installedNow);
      navigator.serviceWorker?.removeEventListener("controllerchange", controllerChange);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "dismissed") window.localStorage.setItem(DISMISS_KEY, "1");
    setInstallPrompt(null);
  }

  function applyUpdate() {
    if (!updateReady) return;
    reloadForUpdate.current = true;
    updateReady.postMessage({ type: "SKIP_WAITING" });
  }

  return (
    <>
      {offline && <div className="offlineBanner" role="status" aria-live="polite">Offline · cached public parts of THE WALL may still be available.</div>}
      {!offline && reconnecting && <div className="offlineBanner reconnectingBanner" role="status" aria-live="polite">Reconnected · THE WALL is checking for the latest information.</div>}
      {installPrompt && (
        <button className="pwaInstall" type="button" onClick={() => void install()} aria-label="Install The Wall">
          Install THE WALL
        </button>
      )}
      {updateReady && (
        <div className="pwaUpdate" role="status" aria-live="polite">
          <div><strong>THE WALL has an update.</strong><span>Refresh when you are ready.</span></div>
          <button type="button" className="wallButton wallButtonPrimary" onClick={applyUpdate}>Refresh</button>
        </div>
      )}
    </>
  );
}
