import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
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
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const ga = (window as Window).gtag;
          if (!ga) continue;
          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry as LargestContentfulPaint;
            ga('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lcp.startTime),
              non_interaction: true,
            });
          } else if (entry.entryType === 'first-input') {
            const fid = entry as PerformanceEventTiming;
            ga('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(fid.startTime),
              non_interaction: true,
            });
          } else if (entry.entryType === 'layout-shift') {
            const cls = entry as LayoutShift;
            ga('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(cls.value * 1000),
              non_interaction: true,
            });
          }
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
