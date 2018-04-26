import { isLocalhost } from 'Helpers/BrowserHelper';

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performance
  window.addEventListener('load', () => {
    // Don't register the service worker if environment is localhost
    // Remove the if condition below to test it on your local development
    if (!isLocalhost()) {
      const serviceWorkerUrl = `/sw.js`;
      registerValidSW(serviceWorkerUrl);
    }
  });
}

function registerValidSW(serviceWorkerUrl: string) {
  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and
                // the fresh content will have been added to the cache.
                window.location.reload();
              }
              break;
            default:
              return;
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}
