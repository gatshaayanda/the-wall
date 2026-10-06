"use client";

import { useEffect, useRef, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaRegister() {
  const [offline, setOffline] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [updateReady, setUpdateReady] = useState<ServiceWorker | null>(null);
  const reloadForUpdate = useRef(false);

  useEffect(() => {
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

    const controllerChange = () => {
      if (reloadForUpdate.current) window.location.reload();
    };
    navigator.serviceWorker?.addEventListener("controllerchange", controllerChange);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", off);
      window.removeEventListener("beforeinstallprompt", install);
      navigator.serviceWorker?.removeEventListener("controllerchange", controllerChange);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  function applyUpdate() {
    if (!updateReady) return;
    reloadForUpdate.current = true;
    updateReady.postMessage({ type: "SKIP_WAITING" });
  }

  return (
    <>
      {offline && <div className="offlineBanner" role="status" aria-live="polite">Offline · THE WALL is available on this device where cached content exists.</div>}
      {!offline && reconnecting && <div className="offlineBanner reconnectingBanner" role="status" aria-live="polite">Reconnected · THE WALL is checking for the latest information.</div>}
      {installPrompt && <button className="pwaInstall" type="button" onClick={() => void install()}>Install THE WALL</button>}
      {updateReady && <div className="pwaUpdate" role="status" aria-live="polite"><div><strong>THE WALL update ready</strong><span>Refresh when you are ready.</span></div><button type="button" className="wallButton wallButtonPrimary" onClick={applyUpdate}>Refresh</button></div>}
    </>
  );
}