# AI Zami Ventures & Autos

A multi-page React + Vite website for an automotive sourcing and import business serving Akwa Ibom and customers across Nigeria.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Pages

- `/` — Home
- `/cars` — Vehicles / inventory
- `/import` — Import and sourcing service
- `/about` — About the business
- `/contact` — Contact and enquiry form

Each page has its own React component in `src/pages/`. Shared navigation, footer, vehicle cards, WhatsApp links and other reusable UI live in `src/components/`.

## Important before launch

1. Replace the sample vehicle listings, prices and vehicle images with confirmed inventory. Sample listings are illustrative and marked as such.
2. Confirm the business's exact office address, email address, operating hours, social media handles and any verified customer testimonials before publishing them.
3. The contact form opens WhatsApp with the enquiry details. It does not store submissions in a database. Connect a backend or CRM if you want submissions saved.
4. Update the SEO description and add verified business information as required.

## WhatsApp

The site is configured for `+234810062440` (international WhatsApp format: `234810062440`).
