# Bloom Shop.VE

Catálogo web de maquillaje y skincare para un emprendimiento en Venezuela. El cliente recorre productos, arma una bolsa y envía el pedido por WhatsApp. El contenido y el inventario se administran desde `/admin` con PostgreSQL.

## Cómo correrlo

1. PostgreSQL local (este repo usa `127.0.0.1:5432` por defecto) o Docker:

```bash
docker compose up -d
```

Si usas el compose del repo, el puerto es `54328` y la URL queda así:

```
DATABASE_URL="postgresql://bloom:bloom@127.0.0.1:54328/bloom_shop"
```

2. Copia el entorno, instala, migra y siembra:

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Abre [http://localhost:43127](http://localhost:43127) y el panel en [http://localhost:43127/admin](http://localhost:43127/admin).

```bash
npm run build
npm start
```

Credenciales iniciales (cámbialas en `.env` antes del seed):

```
ADMIN_EMAIL=admin@bloomshop.ve
ADMIN_PASSWORD=bloom-admin
```

## WhatsApp

El número se configura en el admin (Tienda) o, al sembrar, con:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=584120000000
```

Usa el código de país, sin `+` ni espacios (ejemplo Venezuela: `58` + número).

## Qué incluye

- Inicio, catálogo, ficha de producto, bolsa y checkout por WhatsApp
- Página Nosotros con preguntas frecuentes
- Dashboard en `/admin` para productos, categorías, datos de la tienda y textos de la web
- Identidad visual de Bloom Shop.VE (crema, rosa pétalo, lavanda y serif)

Las fotos de muestra están en `public/images`. El logo por defecto está en `public/logo.jpg`. Las imágenes que subas desde el admin quedan en `public/uploads`.
