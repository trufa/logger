import App from "./App.svelte";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

const app = new App({
  target: document.body,
  hydrate: true,
});

export default app;
