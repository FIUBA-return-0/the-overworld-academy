# COMO CORRER LE PROYECTO?

_requerimientos_: debes tener instalado node y y docker

1. crear la base datos
2. crear un archivo .env en la carpeta /api y completar con los datos requeridos. Podes tomar de referencia el archivo [.env.example](./api/.env.example)

3. si queres correr localmente con docker, hace lo siguiente

```sh
## parado en ./the-overworld-academy

make run-project

# o bien parado en /api:

docker compose up
```

si tu intencion es correrlo _sin usar docker_:

### para el back end:

Primero, asegurate de estar con la base de datos levantada ( por el medio que elijas ) y luego vas a pararte en la carpeta api y correr los siguientes comandos

1.  `npm i `
2.  `npm run start`

por ultimo, corre el archivo db.sql para crear las tablas.

con esto estas instalando las dependencias necesarias, corriendo el servidor con _nodemon_ y creando las tablas en la db

### para el front end:

1. vas a necesitar instalar gulp. Para esto, parado en /client/private corres `npm i`
2. Para procesar todos los archivos en producción (para hostear), sobre la carpeta [/client/private/](/client/private/) ejecutar `npx gulp prod_build`. Tené en cuenta que puede tomar un tiempo ya que esta optimizando imagenes

> opcional : podes instalar gulp de manera global con `npm i --g gulp-cli`, tene en cuenta que esto no reemplaza el punto 1. Tambien, recomendamos correr el proyecto conun _liver server_ usando la siguiente configurando en [settings.json](/.vscode/settings.json), ( si no existe podes crearlo)

```json
{
  "liveServer.settings.port": 5000,
  "liveServer.settings.root": "/client/public/dist",
  "liveServer.settings.useLocalIp": true
}
```

# FAQ 🧐

### la base de datos se crea automaticamente?

No, debes crearla por tu cuenta recordando el nombre de la db, la contraseña y el usuario que usaste.

### puedo usar cualquier base de datos?

No, el codigo esta planteado para usar PostgreSQL

###
