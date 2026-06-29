import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
  });

  try {
    if ('PerformanceObserver' in window) {
      const sendToAnalytics = (metric: PerformanceEntry) => {
        const body = JSON.stringify(metric);
        const url = '/api/vitals';
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, body);
        } else {
          fetch(url, { body, method: 'POST', keepalive: true });
        }
      };

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          sendToAnalytics(entry);
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });
      observer.observe({ type: 'layout-shift', buffered: true });
    }
  } catch (e) {
    console.error('Web Vitals error', e);
  }
}
