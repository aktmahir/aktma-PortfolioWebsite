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
