# MiniShop React - Week 10

Week 10 extends the Week 9 routing project with a mock REST API and a CRUD product-management page.

## Requirements

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Run

Use two terminals.

Terminal 1 - JSON Server:

```bash
npm run api
```

API: http://localhost:3001/products

Terminal 2 - Vite:

```bash
npm run dev
```

App: http://localhost:5173

Product Management: http://localhost:5173/admin/products

## CRUD API

- `GET /products` - read all products
- `POST /products` - create a product
- `PUT /products/:id` - replace/update a product
- `DELETE /products/:id` - delete a product

The data is stored in `db.json`. JSON Server is only a mock API for frontend practice.

## Week 10 test

1. Open `/admin/products`.
2. Add `Mouse`, price `450`.
3. Open http://localhost:3001/products and confirm the record exists.
4. Edit Mouse to `490`.
5. Delete Mouse.
6. Try an empty name or price `0` to verify validation.
