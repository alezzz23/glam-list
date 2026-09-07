# Bloom Shop.VE

Catálogo web de maquillaje y skincare para Bloom Shop.VE: navegación por categorías, ficha de producto, carrito en el navegador y pedido por WhatsApp.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para producción:

```bash
npm run build
npm start
```

## WhatsApp

Los pedidos se envían a `https://wa.me/<número>`. Cambia el número con:

```bash
NEXT_PUBLIC_WHATSAPP=58412XXXXXXX
```

Si no defines la variable, se usa un número de ejemplo (`584120000000`).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS y shadcn/ui. El inventario vive en `src/lib/products.ts` — edita ahí nombres, precios, tonos y stock.
