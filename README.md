# Bloom Shop.VE

Catálogo web de un emprendimiento venezolano de **maquillaje y skincare**. Los pedidos se confirman por WhatsApp: el carrito arma el mensaje con la lista y el total.

## Qué incluye

- Inicio con la identidad de Bloom Shop.VE (flor de cerezo, crema, rosa y lavanda)
- Catálogo con búsqueda, filtros por categoría y ordenamiento
- Ficha de producto (uso, ingredientes, stock)
- Carrito persistente en el navegador
- Página Nosotros con preguntas frecuentes

Los precios están en USD. El número de WhatsApp es un marcador: cámbialo en `src/lib/config.ts` antes de publicar.

## Cómo correrlo

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:4317](http://127.0.0.1:4317).

```bash
npm run build
npm start
```

## Personalizar

| Qué | Dónde |
| --- | --- |
| Productos, precios y stock | `src/lib/products.ts` |
| WhatsApp, Instagram, horario | `src/lib/config.ts` |
| Logo | `public/logo.jpg` |

No hay base de datos ni pagos en línea: el flujo termina en una conversación de WhatsApp, como en la mayoría de los catálogos de emprendimientos en Venezuela.
