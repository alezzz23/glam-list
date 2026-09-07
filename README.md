# Bloom Shop.VE

Catálogo web de maquillaje y skincare para un emprendimiento en Venezuela. El cliente recorre productos, arma una bolsa y envía el pedido por WhatsApp. No hay pasarela de pago: el chat coordina Zelle, pago móvil o transferencia, y el envío.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:4317](http://127.0.0.1:4317).

```bash
npm run build
npm start
```

## WhatsApp

El número se configura en `src/lib/shop.ts` o con una variable de entorno:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=584120000000
```

Usa el código de país, sin `+` ni espacios (ejemplo Venezuela: `58` + número). El valor de muestra abre WhatsApp con el texto del pedido para que puedas probar el flujo.

## Qué incluye

- Inicio con colecciones, destacados y cómo comprar
- Catálogo con búsqueda, filtros y orden
- Ficha de producto con tonos, stock y consulta por WhatsApp
- Bolsa persistente en el navegador
- Checkout que arma el mensaje de pedido
- Página Nosotros con preguntas frecuentes
- Identidad visual de Bloom Shop.VE (crema, rosa pétalo, lavanda y serif)

Los productos de este repo son de muestra para que el catálogo se vea completo. Cámbialos en `src/lib/products.ts` y las fotos en `public/images`. El logo está en `public/logo.jpg`.
