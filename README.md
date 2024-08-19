# Testo shop

## Description
E commerce shop with products, cart and orders.

## Dev run

1. Clone the repo
2. Create a `.env` file in the root of the project, and use the `.env.example` as a template
3. Run `npm install`
4. Run `docker-compose up -d`
5. Run prisma migration `npx prisma migrate dev` (No prev data is synced)
6. Run seed `npm run seed`
7. Run `npm run dev`
8. Open `http://localhost:3000` in your browser
9. Clean local storage in your browser
