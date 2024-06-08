<h1 align="center">
  Grupo El Comercio Apps
</h1>

## ¿Qué encontrarás?
- [Configuraciones de Desarrollo](#-configuraciones-de-desarrollo)
- [Configuración por SO y aplicación](#configuración-por-so-y-aplicación)
- [Configuración por integración](#configuración-por-integración)
  - [Iniciar sesión con Facebook](#iniciar-sesión-con-facebook)
  - [Iniciar sesión con Google](#iniciar-sesión-con-google)
  - [Crashlytics](#crashlytics)
  - [Dynamic Links](#dynamic-links)
  - [Cloud Messaging](#cloud-messaging)
  - [Otros](#otros)

## 🚀 Configuraciones de Desarrollo

Para poder iniciar el proyecto en tu computadora deberás seguir los siguientes pasos a fin de comenzar el desarrollo.

- **React Native**
  
  La instalación a seguir es la del [React Native Cli Quickstart](https://reactnative.dev/docs/environment-setup). Sigue la documentación según la versión de React Native en el proyecto.

- **Instalar Dependencias**
  
  Recuerda siempre tener actualizada las dependencias de Node y Cocoapods(iOS)

  ```shell
  # Android
  yarn install

  # iOS
  yarn install
  yarn pods
  ```

- **Fastlane** (Opcional)
  
  Si deseas aventurarte a conocer como funciona el despliegue continuo de las aplicaciones puedes instalar [Fastlane](https://fastlane.tools/), recuerda también tener una versión actualizada de [Ruby](https://www.ruby-lang.org/es/) y [Bundler](https://bundler.io/).

  ```shell
  # crea un .apk en la ruta android/app/build/outputs
  bundle exec fastlane android buildDebug

  # crea un .ipa en la ruta ios/build
  bundle exec fastlane ios buildDebug
  ```
  :warning: *Ejecutar los comandos anteriores crea y remplaza los iconos launcher de la aplicación por unos de desarrollo*

- **Variables de entorno para Fastlane** (Opcional)
  
  Si deseas ejecutar algún comando con fastlane, antes deberás recrear algunas variables. Para ello deberás crear un archivo `build.env` en el directorio principal del proyecto y agregar todas las variables que figuran el el stage `environment` del [CI](.gitlab-cu.yml) dependiendo de la aplicación.


## Configuración por SO y aplicación

Para poder tener multiples aplicaciones dentro de un mismo repositorio hacemos uso de [Product Flavors](https://developer.android.com/studio/build/build-variants?hl=es-419#product-flavors) en el caso de Android y [Schemes](https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Schemes.html) en el caso de iOS.

El listado de pasos a seguir para configurar una aplicación es la siguiente:

- **Android**
  - [ ] Crea un Product Flavor en el archivo [build](android/app/build.gradle) de la aplicación. El `applicationIdSuffix` y el `versionName` dependerá de la versión publicada en Play Store.
  - [ ] Crea un directorio en `android/app/src` con el nombre del product flavor.
  - [ ] Descargar el archivo `google-services.json` de la [consola de firebase](https://console.firebase.google.com) y copialo dentro del directorio creado. Deberán estar las configuraciones para producción y desarrollo en el mismo archivo.
  - [ ] Agrega los iconos launcher con el nombre `ic_launcher.png` para cada resolución. Para generarlos puedes usar esta [herramienta](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html).
  - [ ] Agrega el icono de la app que será usado en el Splashscreen, deberá llamarse `icon.png`. Sus tamaños serán de `200x200`, `400x400` y `600x600` dependiendo de la resolución.
  - [ ] Agrega y configura los archivos `colors.xml`, `string.xml` y `styles.xml` en la carperta `/values` dentro de tu product flavor.

- **iOS**
  - [ ] Duplica un target existente y configura su `Bundle Identifier` para producción y para sandbox, además escribe la versión según está publicada en App Store.
  - [ ] Crea un directorio en `ios/Targets` con el nombre del target. Agrega las variables de entorno y crea el `LaunchScreeen.xib` configurando la propiedad `backgroundColor` correspondiente.
  - [ ] Descargar el archivo `GoogleService-Info.plist` de la [consola de firebase](https://console.firebase.google.com) tanto de producción como de desarrollo y copiala en el directorio que creaste. Renombra el archivo de desarrollo por `GoogleService-Info-Debug.plist` y el de producción por `GoogleService-Info-Prod.plist`.
  - [ ] Duplica un scheme y cambia el `executable` por el target que creaste. Activa la opción `Shared` para que sea tomada en cuenta por git. El Scheme se crea en la ruta `ios/Trome.xcodeproj/xcshareddata/xcschemes`.
  - [ ] Crea un `Image Set` y carga los iconos de la aplicación. Se guardará en la ruta `ios/Trome/Images.xcassets`. Luego de creado, selecciona el target y ve a la ventana General, luego en el submenú `App Icons and Launch Screen` elige el icono que creaste. Para generar los iconos puedes usar esta [herramienta](https://apps.apple.com/pe/app/icon-set-creator/id939343785)
  - [ ] Crea un `Image Set` y cargas los iconos para el splashcreen. Sus tamaños serán de `200x200`, `400x400` y `600x600` dependiendo de la resolución.

- **iOS y Android**
  - [ ] Agregar la URL del webview y los estilos para la aplicación en el [archivo configuración](src/utils/config.ts)

## Configuración por integración

### [Iniciar sesión con Facebook](https://github.com/facebook/react-native-fbsdk)
Ingresar a la [consola de facebook](https://developers.facebook.com/) y agregar el nombre del paquete de la nueva app. El proyecto dentro de la consola se llama:
- **Desarrollo:** EEEC Auth Sandbox (ID: 1391320605006475)
- **Producción:** Single Sign On Ecoid (ID: 258201114673936)

### [Iniciar sesión con Google](https://github.com/react-native-community/google-signin)
Ingresar a la [consola de google](https://console.developers.google.com/apis/credentials) y dirigite al proyecto:
- **Desarrollo:** Auth Sandbox (ID: auth-sandbox-326019)
- **Producción:** SSOEC (ID: ssoec-1559664669128)

Luego realiza los siguientes pasos:

  - **Android:**  Crear una credencial `OAuth client ID` de tipo `Android`
  - **iOS:** Crear una credencial `OAuth client ID` de tipo `iOS`. Copiar el `ID de cliente` y el `Esquema de URL de iOS`, luego dentro del target correspondiente, asignarlo a las variables de entorno `GOOGLE_IOS_CLIENT_ID` y `GOOGLE_CUSTOM_URL_SCHEME` respectivamente. Copiar nuevamente el `Esquema de URL de iOS` y reemplazarlo por el `REVERSED_CLIENT_ID` dentro del `GoogleService-Info-*.plist`
  
### [Crashlytics](https://rnfirebase.io/crashlytics/usage)
Ingresar a la [consola de firebase](https://console.firebase.google.com) y habilitar Crashlytics para la aplicación de desarollo y producción.

### [Dynamic Links](https://rnfirebase.io/dynamic-links/usage)
Ingresar a la [consola de firebase](https://console.firebase.google.com) y crear un dynamic link con el dominio elegido.

- **iOS:** Crea un nuevo archivo de tipo `Property List` y copia el contenido tal cual a este [archivo](ios/Trome/TromeRelease.entitlements), solo reemplaza el string dentro del array con el dynamic link que acabas de crear. Selecciona nuevamente el target y ve a la venta `Build Setting` y en el submenu `Signing > Code Signing Entitlements` selecciona el archivo que creaste. Asegúrate que en la ventana `Signing Capabilities` y en el submenu `Associated Domains` esté agregado el dominio creado.

### [Cloud Messaging](https://rnfirebase.io/messaging/usage)
- **iOS:** Seleccionado el target ir a la ventana `Signing Capabilities` y en el submenu `Background Modes` habilitar las opciones: `Background fetch` y `Remote notifications`. Asimismo, agregar el capability de `Push notifications`.

### Otros
Para las siguientes integraciones no es necesario una configuración adicional.

- Firebase Analytics
