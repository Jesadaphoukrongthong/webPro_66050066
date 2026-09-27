# MiniShop — React + Tailwind CSS

A compact MiniShop workshop project based on the supplied worksheet/reference screens.

## Features
- Dashboard with summary cards and recent orders
- Product grid with search and category filtering
- Profile page
- Product detail page
- Quantity control and cart count
- Responsive Tailwind layout
- Local SVG product illustrations (no external image dependency)

## Run
```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (usually http://localhost:5173).

## Main files
- `src/main.jsx` — React UI and interactions
- `src/style.css` — Tailwind import + small global styles
- `vite.config.js` — Vite + React + Tailwind configuration
- `public/products/` — local SVG product illustrations

## Note
This revision does not use `lucide-react`, so it avoids the missing icon-module error some npm installations can produce.
