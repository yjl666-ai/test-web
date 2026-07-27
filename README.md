# Fashion Commerce

Pure frontend fashion commerce MVP built with Vue 3, TypeScript, Vite, Vant 4, Pinia, Vue Router, and Axios.

The app includes local mock data, so it can run without a backend.

## Features

- Home, category, search, and product detail pages
- Cart and checkout flow
- Login, user center, orders, addresses, coupons, reviews, after-sale, and verification pages
- Route guards for protected pages
- Mock API responses for development

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Default local address:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deploy on Render

1. Push this repo to GitHub.
2. In Render, create a new service and choose **Static Site**.
3. Point it at the repo and use the included `render.yaml`, or set these values manually:

```text
Build Command: npm install && npm run build
Publish Directory: dist
```

4. Add a rewrite rule for Vue Router:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

After deploy, Render will give you a public `onrender.com` address that works on phones, tablets, and other computers.

## Structure

```text
src/
  api/
  components/
  mock/
  router/
  store/
  styles/
  types/
  utils/
  views/
```

## Routes

```text
/                          home
/category                  category page
/category/:id              category products
/search                    search results
/product/:id               product detail
/cart                      cart
/checkout                  checkout
/pay/result                payment result
/login                     login/register
/user                      user center
/user/orders               orders list
/user/orders/:id           order detail
/user/orders/:id/aftersale after-sale flow
/user/address              address management
/user/address/edit         address edit
/user/favorites            favorites
/user/coupons              my coupons
/coupon/center             coupon center
/review/publish/:orderId   review publish
/verify                    verification
/404                       not found
```

## Mock

Development mock is enabled by default:

```text
VITE_USE_MOCK=true
```

Mock data lives in:

```text
src/mock/data.ts
src/mock/index.ts
```

To switch to a real backend:

```text
VITE_USE_MOCK=false
VITE_API_BASE_URL=/api/v1
```

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```
