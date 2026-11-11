# Wearroiye — Dreams Turned Reality

An animated catalogue and brand story built with Next.js, TypeScript, and Motion for React.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm test
npm run build
```

## Vercel deployment

1. Push this directory to a Git repository.
2. Import the repository into Vercel; the framework preset is detected as Next.js.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy. No database, server secrets, or payment configuration is required.

The current conversion action opens a product-specific WhatsApp enquiry. Future payment providers can replace the `PurchaseAction` strategy in `src/content/catalogue.ts` without restructuring the catalogue pages.

## Content

The three launch variations, price, sizes, availability, media paths, and WhatsApp copy are maintained in `src/content/catalogue.ts`.
