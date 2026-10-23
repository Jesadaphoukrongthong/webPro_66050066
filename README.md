# MiniShop React — Week 11

Week 11 upgrades the Week 10 MiniShop admin UI while keeping the existing CRUD REST API behavior.

## Features

- React + Vite + Tailwind CSS v4
- DaisyUI component classes
- Shared Admin Layout with Navbar and Sidebar
- Dashboard summary cards from the REST API
- Product management table
- Add/Edit product modal
- Delete confirmation
- Validation, Loading, Error, and Empty states
- Light/Dark mode stored in localStorage
- Responsive layout for mobile, tablet, and desktop
- JSON Server mock REST API

## Install

```bash
npm install
```

## Run

Terminal 1:

```bash
npm run api
```

API: http://localhost:3001/products

Terminal 2:

```bash
npm run dev
```

Open:

- http://localhost:5173/admin/dashboard
- http://localhost:5173/admin/products

## Week 11 checks

1. Dashboard shows Total Products, Product Value, and Categories from the API.
2. Add a product through the modal.
3. Edit a product through the same modal.
4. Delete a product and confirm deletion.
5. Try an empty name or price 0 to verify validation.
6. Toggle dark mode and refresh to verify persistence.
7. Test responsive sizes such as 375, 768, and 1440 px.
