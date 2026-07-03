import { useEffect } from 'react';
import { loadGA, trackPageView } from '../utils/analytics';

export default function Analytics() {
  useEffect(() => {
    loadGA();
    trackPageView(window.location.pathname);
  }, []);

  return null;
}
