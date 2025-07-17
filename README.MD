# The Overworld Academy
**Desarrollamos un campus para una academia de videojuegos, con roles de director de carrera, profesor y alumno.**
- Los directores de carrera pueda editar materias solo el nombre, descripción, foto y el profesor a cargo.
- Los profesores pueden editar la cartelera de la materia y las notas de los alumnos.
- Los alumnos pueden ver todas las materias de la carrera, pueden ver cuales están inscriptos e inscribirse a las que no están.

## Índice
- [Vistas](#vistas)
- [Cómo correr el proyecto](#como-correr-el-proyecto)
- [Mock db](#mock-db)
- [FAQ](#faq)

## Vistas
- Vista Login:
![](https://i.imgur.com/B43Frj7.png)

- Vista perfil (compartido)
![](https://i.imgur.com/0nVo0aQ.png)

- Vista dashboard director de carrera:
![](https://i.imgur.com/iAY5rre.png)

- Vista crear materia (director):
![](https://i.imgur.com/94XVMQq.png)

- Vista dashboard profesor
![](https://i.imgur.com/mvGjjfO.png)

- Vista dashboard alumno
![](https://i.imgur.com/lomVU20.png)

- Vista materias alumno
![](https://i.imgur.com/xtBHgMs.png)


## COMO CORRER EL PROYECTO?

⚠️ _Requerimientos_: debes tener instalado `node` y `docker`.

1. Crear la base datos
2. Crear un archivo .env en la carpeta /api y completar con los datos requeridos. Podes tomar de referencia el archivo [.env.example](./api/.env.example)

3. Si queres correr localmente con docker, hace lo siguiente
   > ❗️ la primera vez que corras necesitas correr docker compose up --build parado en api. Mismo cada vez que se actualice alguna dependencia.

```sh
## parado en ./the-overworld-academy

make run-project

# o bien parado en /api:

docker compose up
```

si tu intencion es correrlo _sin usar docker_:

### Para el back end:

Primero, asegurate de estar con la base de datos levantada ( por el medio que elijas ) y luego vas a pararte en la carpeta api y correr los siguientes comandos

1.  `npm i `
2.  `npm run start`

por ultimo, corre el archivo db.sql para crear las tablas.

con esto estas instalando las dependencias necesarias, corriendo el servidor con _nodemon_ y creando las tablas en la db

### Para el front end:

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

## Mock db
También hay a tu disposición un archivo [mock.sql](/api/mock.sql) para que hagas pruebas sin tener que crear datos manualmente

**Para probar podes usar:**
- Cuenta director: `berbustamente`; `Default1$`
- Cuenta profesor: `carlosmaulhardt`; `Default1$`
- Cuenta alumno: `spreen`; `Default1$`

## FAQ

### la base de datos se crea automaticamente?

No, debes crearla por tu cuenta recordando el nombre de la db, la contraseña y el usuario que usaste.

### puedo usar cualquier base de datos?

No, el codigo esta planteado para usar PostgreSQL
