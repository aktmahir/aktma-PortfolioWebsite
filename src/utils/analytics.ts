const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID as string | undefined;

export function loadGA() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  const init = document.createElement('script');
  init.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
      anonymize_ip: true,
    });
  `;
  document.head.appendChild(init);
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (!gtag) return;
  gtag('event', action, params);
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (!gtag) return;
  gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  });
}
