# Aura Beauty · Catálogo de Maquillaje y Skincare

Catálogo web para un emprendimiento de venta de maquillaje y cuidado de la piel.
Los clientes exploran productos, arman su carrito y finalizan el pedido por
WhatsApp: no requiere pasarela de pago ni base de datos.

## Qué incluye

- **Catálogo de 12 productos** (6 de maquillaje, 6 de skincare) con precios,
  valoraciones, beneficios y modo de uso.
- **Búsqueda y filtros** por categoría (Todos / Maquillaje / Skincare), con
  estados de carga (skeletons), vacío (sin resultados) y error (con reintento).
- **Ficha de producto** en un diálogo con detalle, beneficios y selector de
  cantidad.
- **Carrito de compras** persistente (se guarda en `localStorage`), con
  control de cantidades y subtotal.
- **Checkout por WhatsApp**: el botón "Finalizar pedido" abre WhatsApp con el
  mensaje del pedido ya redactado (productos, cantidades y total).
- **Diseño responsive** para celular y escritorio, con ilustraciones SVG
  propias para cada producto (sin depender de fotos externas).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) (Radix UI) + Lucide icons + Sonner (toasts)

## Cómo correrlo localmente

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros comandos:

```bash
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # ESLint
```

## Configurar el número de WhatsApp

El botón de checkout usa la variable de entorno `NEXT_PUBLIC_WHATSAPP_NUMBER`
(código de país + número, solo dígitos). Si no está definida, se usa un número
de ejemplo (`5215512345678`).

Crea un archivo `.env.local`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
```

y reinicia el servidor de desarrollo.

## Editar el catálogo

Todos los productos viven en [`src/data/products.ts`](src/data/products.ts).
Cada producto define nombre, categoría, precio (y precio original opcional para
ofertas), descripción, beneficios, modo de uso, valoración y su ilustración
(`art`), que se dibuja como SVG en
[`src/components/product-illustration.tsx`](src/components/product-illustration.tsx).

Para agregar un producto basta con añadir una entrada al arreglo `products`;
aparecerá automáticamente en el catálogo, la búsqueda y los filtros.

## Estructura

```
src/
├── app/                    # layout, página principal y tema (globals.css)
├── components/
│   ├── ui/                 # componentes shadcn/ui
│   ├── cart-provider.tsx   # estado del carrito + mensaje de WhatsApp
│   ├── cart-sheet.tsx      # drawer del carrito
│   ├── catalog.tsx         # búsqueda, filtros, grid y estados
│   ├── hero.tsx            # portada
│   ├── product-card.tsx    # tarjeta de producto
│   ├── product-dialog.tsx  # detalle de producto
│   ├── product-illustration.tsx  # ilustraciones SVG por producto
│   ├── site-header.tsx     # encabezado con carrito
│   └── site-footer.tsx     # contacto, redes y envíos
├── data/products.ts        # catálogo de productos
└── lib/format.ts           # formato de precios
```
