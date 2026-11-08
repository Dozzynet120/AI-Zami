# Deployment notes

This is a Vite single-page application with separate React page components, client-side routes and Vercel serverless API routes.
For Vercel, the existing `vercel.json` provides the single-page app rewrite. The `/api` handlers are deployed as serverless functions.

For example:
- Vercel: add `vercel.json` with a rewrite to `/`.
- Netlify: add `public/_redirects` containing `/* /index.html 200`.

Admin sign-in, shared vehicle edits and image uploads use Vercel Functions and Vercel Blob. A static-only host cannot provide those features.

## Configure admin sign-in and permanent shared car updates

1. In your Vercel project, open **Storage**, choose **Create Database**, and create a **Blob** store with **public** access. Connect it to this project and include the Production environment. Vercel adds `BLOB_READ_WRITE_TOKEN` to the project.
2. In Vercel project settings, add these environment variables for Production (and Preview if desired):
   - `ADMIN_USERNAME` — for example, `Admin`.
   - `ADMIN_PASSWORD` — choose a unique, strong password. Do not use `admin123` on a public website.
   - `ADMIN_SESSION_SECRET` — a private random value of at least 32 characters. In PowerShell, generate one with: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
3. Redeploy after adding the Blob store and secrets. The owner can then open `/admin` and sign in with the configured username and password; no GitHub account, external database or external storage service is needed.

The initial vehicle list comes from `public/site-content.json`. The first admin save writes it to Vercel Blob; subsequent saves create a new shared content snapshot there. The Home page, vehicle listings and Place an Order page read the shared snapshot. New car images are uploaded to the same Blob store and remain available after refreshes and deployments. Admin sessions use an HTTP-only cookie and expire after eight hours. Uploaded images must be JPG, PNG or WebP and at most 2.5 MB.

Vercel's current platform uses Marketplace integrations for external Postgres products; this website does not need one because its small shared content file is stored in Vercel Blob.

Local `npm run dev` only runs Vite and does not run the Vercel API functions. Use Vercel's local development command to try admin sign-in locally after configuring the environment variables.
