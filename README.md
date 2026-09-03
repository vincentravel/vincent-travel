# Vincent Travel — Sitio web + Panel de administración

Sitio web autoadministrable para Vincent Travel (agencia de viajes, San Miguel de
Tucumán). Stack MERN: React + Vite (frontend), Node/Express (backend), MongoDB
(base de datos), Cloudinary (imágenes).

## Estructura

```
client/   → Frontend público + panel de administración (React + Vite + Tailwind)
server/   → API REST (Express + MongoDB + JWT + Cloudinary)
```

## Requisitos previos

- Node.js 18 o superior
- Una base de datos MongoDB (recomendado: [MongoDB Atlas](https://www.mongodb.com/atlas), plan gratuito)
- Una cuenta de [Cloudinary](https://cloudinary.com/) (plan gratuito) para las imágenes

## Levantar todo en local (recomendado)

Desde la raíz del proyecto:

```bash
npm run install:all
```

Esto instala las dependencias de `server/` y `client/`. Después configurá las
variables de entorno (una única vez):

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Completá `server/.env` con:

- `MONGODB_URI`: cadena de conexión de tu base de MongoDB
- `JWT_SECRET`: un texto largo y aleatorio (por ejemplo, generado con `openssl rand -hex 32`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: los datos de tu cuenta de Cloudinary (panel principal del dashboard)
- `CLIENT_URL`: URL del frontend (en local, `http://localhost:5173`)
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: datos del primer usuario administrador (solo se usan para el seed, después se pueden borrar del `.env`)

`client/.env` ya viene con `VITE_API_URL=http://localhost:4000/api`, no hace falta tocarlo en local.

Crear el usuario administrador (una sola vez):

```bash
npm run seed:admin
```

Levantar backend y frontend juntos:

```bash
npm run dev
```

- API: `http://localhost:4000/api`
- Sitio público: `http://localhost:5173/`
- Panel de administración: `http://localhost:5173/admin/login`

También se pueden levantar por separado con `npm run dev:server` / `npm run dev:client`,
o entrando a cada carpeta (`server/`, `client/`) y corriendo `npm run dev` ahí.

## Uso del panel de administración

1. Ingresá con el email/contraseña creados por el seed.
2. Desde el listado podés crear, editar y eliminar paquetes.
3. Cada paquete necesita: título, descripción, destino, al menos una categoría,
   y opcionalmente imágenes y precio (o "a consultar").
4. Un paquete solo aparece en el sitio público si está marcado como "Publicado".

## Deploy en Vercel

Se despliegan **dos proyectos separados** desde este mismo repositorio:

### Backend

1. Nuevo proyecto en Vercel → importar este repo → **Root Directory: `server`**
2. Framework preset: "Other"
3. Variables de entorno: las mismas de `server/.env` (excepto `ADMIN_*`, que solo
   hacen falta si vas a correr el seed manualmente contra producción)
4. Deploy. La API queda en `https://<tu-proyecto-server>.vercel.app/api`

### Frontend

1. Nuevo proyecto en Vercel → importar este repo → **Root Directory: `client`**
2. Framework preset: Vite
3. Variable de entorno: `VITE_API_URL=https://<tu-proyecto-server>.vercel.app/api`
4. Deploy

### Después del primer deploy

- Actualizá `CLIENT_URL` en las variables de entorno del backend con la URL real del frontend en Vercel (para que CORS lo permita) y volvé a desplegar.
- Para crear el usuario administrador en producción, corré `npm run seed:admin` localmente
  apuntando `MONGODB_URI` a la base de producción (o ejecutá el script en un entorno con acceso a esas variables).

## Notas de diseño

- La identidad visual (violeta `#2E0F4F` / magenta `#E6007E`) está centralizada en
  `client/tailwind.config.js`. El hero y otras secciones usan gradientes y un
  logo tipográfico ("V") como placeholder — reemplazalos por fotos reales y el
  logo definitivo subiéndolos a Cloudinary y actualizando los componentes en
  `client/src/components/home/`.
- Las categorías de viaje están definidas en un solo lugar en cada capa:
  `server/src/models/Package.js` (backend) y `client/src/lib/constants.js`
  (frontend). Si se agrega o cambia una categoría, hay que actualizar ambos archivos.
- El número de WhatsApp y los mensajes predefinidos están en
  `client/src/lib/constants.js`.
- La dirección de la segunda sucursal quedó como placeholder en
  `client/src/lib/constants.js` (`BRANCHES`) — hay que completarla con el dato real.
# vincent-travel
