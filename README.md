# aktma-PortfolioWebsite
Portfolio Website for Developers

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deployment

### Vercel
1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Vercel auto-detects Vite. Build command: `npm run build`. Output directory: `dist`.
4. Configure `vercel.json` in this repo to enforce security headers automatically.

### Environment
- `VITE_GA_ID`: Required for Google Analytics tracking to initialize.
- `NETLIFY_AUTH_TOKEN`: Required for Netlify deployment via GitHub Actions.
- `NETLIFY_SITE_ID`: Required for Netlify deployment via GitHub Actions.
- `public/resume.pdf`: A placeholder resume file exists now; replace it with your actual resume before launch.
- The contact form is configured with Netlify form handling and will not work automatically on Vercel or GitHub Pages without additional backend support.

### Launch checklist
- Replace `public/resume.pdf` with your real resume before deployment.
- Confirm `VITE_GA_ID` is set in the chosen deployment environment.
- Verify Netlify secrets are configured before using the GitHub Actions Netlify deploy path.
- Validate that the contact form works on the chosen host and that Netlify form handling is active if using Netlify.
- Run accessibility tests and check for critical form usability issues.

### Launch success metrics
- Contact form submissions and outreach conversions
- Page speed and Core Web Vitals within target range
- Accessibility audit score with zero critical WCAG failures
- Deployment success rate on the chosen hosting provider

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add a `_headers` file to `public/` for Netlify-specific header enforcement.

### Docker
```bash
docker build -t portfolio .
docker run -p 8080:8080 portfolio
```

### GitHub Pages
1. Enable GitHub Pages in repository Settings.
2. Set Source to "GitHub Actions".
3. The included `.github/workflows/ci.yml` will automatically build and deploy on push to `main`.

## Rollback Procedure
- **Vercel/Netlify**: Use the provider dashboard to redeploy a previous build from deployment history.
- **GitHub Pages**: Revert the latest commit via `git revert` or reset to a previous SHA and push to trigger a new deployment.
- **Docker**: Pull and run the previous image tag (`docker run <previous-image-id>`).
