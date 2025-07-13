# Client docs

- El client se desarrolló **sin frameworks**.
- Utiliza **Sass** como **preprocesador**, usando la sintaxis **SCSS** (`.scss`), compatible con la sintaxis tradicional de CSS (uso de llaves y punto y coma), para aprovechar características como **anidamiento** (que lo hace muy escalable) y **variables** que, al ser procesadas, se reemplazan por sus valores directamente en el CSS resultante, sin utilizar variables nativas de CSS (--var) que suelen no ser tan compatibles.
- Se utilizó Gulp para procesar SCSS a CSS, concatenar archivos compartidos de CSS y JS, minificar HTML, JS y CSS, optimizar imágenes y crear la carpeta dist en general con todos los directorios y cada cosa en su lugar, de manera automática.

### Procesar el frontend y crear carpeta [`dist`](/client/public/dist/) para servir
- En la primera ejecución del frontend, se debe ejecutar `npm install --global gulp-cli` para instalar globalmente el comando de gulp.

- La primera vez y si alguna vez se hace algún cambio al archivo [`/client/private/package.json`](/client/private/package.json), se debe ejecutar `npm install`

- Para procesar todos los archivos en producción (para hostear), sobre la carpeta [`/client/private/`](/client/private/) ejecutar `gulp prod_build`. Si no hay errores se crea [`/public/dist/`](/client/public/dist/) con todo listo para hostear (puede demorar bastante tiempo ya que optimiza imágenes).

- Para trabajar activamente en alguna interfaz, existe `gulp dwb`, que ejecuta gulp en modo development, cada función, cada vez que se cambia algún archivo de esa correspondiente sección. Se recomienda la extensión «Live Server» con estas configuraciones para trabajar de forma cómoda: en `/.vscode/settings.json`:
```
{
    "liveServer.settings.port": 5000,
    "liveServer.settings.root": "/client/public/dist",
    "liveServer.settings.useLocalIp": true
}
```
