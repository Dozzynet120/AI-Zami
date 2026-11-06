# Deployment notes

This is a Vite single-page application with separate React page components and client-side routes.
For static hosting, configure the host to rewrite unknown paths to `/index.html` so `/cars`, `/import`, `/about` and `/contact` work on direct refresh.

For example:
- Vercel: add `vercel.json` with a rewrite to `/`.
- Netlify: add `public/_redirects` containing `/* /index.html 200`.

The project can also be deployed to any static host that supports SPA fallback routing.
