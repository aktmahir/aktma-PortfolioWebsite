import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { axe, configureAxe } from 'vitest-axe';

configureAxe({ rules: {} });

describe('Accessibility (axe-core)', () => {
  it('App has no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    if (results.violations.length > 0) {
      console.log('A11y violations:', JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations.length).toBe(0);
  });
});
