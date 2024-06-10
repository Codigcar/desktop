# CONFIGURAR APLICACIÓN

**Hacer clone del repositorio**
- git clone git@10.30.30.248:NTC/banbif-empresas-mobile.git

**Adentrar en la carpeta**
- cd banbif-empresas-mobile

**Instalar dependencias**
- ```npm install```

**Cambiar parametro de libreria desactualizada**
- Abrir el archivo: ```/banbif-mobile-empresas/node_modules/react-native-pinning-ssl/android/build.gradle``` 
- Cambiar ```compile``` por ```implementation```. Es decir, la dependencia queda de esta forma: 
```implementation 'com.facebook.react:react-native:+'``` 

**Apuntar variable de entorno ANDROID_SDK_ROOT en el sistema operativo**

- Copiar de Android Studio -> Configure SDK Manager
- Cerrar y abrir terminal

**Ejecutar la App**
- ```npx react-native run-android```

GENERAR APK PRODUCCION

1.- Ingresar a la carpeta android
-> cd android

2.- Crear Keystore
-> keytool -genkey -v -keystore app/mykeystore.keystore -storepass chavesegura -alias mykeyalias -keypass chavesegura -dname "CN=Android Debug,O=Android,C=US" -keyalg RSA -keysize 2048 -validity 10000
Convertir Keystore (opcional)
    -> keytool -importkeystore -srckeystore app/mykeystore.keystore -destkeystore app/mykeystore.keystore -deststoretype pkcs12


3.- Limpiar android:

```
./gradlew clean
```

4.- Actualizar bundle con los cambios de JS, en la raiz del projecto ejecutar:
```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

Nota: Si este comando nos da el error: No existe `banbif-mobile-empresas/android/app/src/main/assets/index.android.bundle` , solamente se debe crear la carpeta vacia `/banbif-mobile-empresas/android/app/src/main/assets`

5.- Acceder a la ruta `/Users/macbookdes03/Documents/app_empresas/banbif-mobile-empresas/android/app/src/main/res` , dentro de algunas carpetas `/drawable-...`  se crearán imagenes temporales que deben ser eliminadas antes de generar el apk. Se reconocerán estos archivos ya que son nuevos (no estan y no deben estar en git)

6.- Generar release
```
cd /android && ./gradlew bundleRelease
```

7.- Ejecutar APP
```
cd.. && react-native run-android --variant=release
```
 
8.- Listo el APK ya esta generado y lo puedes encontrar en la siguiente ruta
-> android/app/build/outputs/apk/release/

* ATENCIÓN: no perder el keystore utilizado para la APK que es publicada en las tiendas, sino tendrás que crear una nueva APP en Google Play

### Posibles errores al generar IPA
1. Error ```RCTBridgeModule.h:11:9 'React/RCTDefines.h' file not found```.
   * Solucion: Reemplazar ```#import <React/RCTDefines.h>``` por:
    ```
    #if __has_include("RCTDefines.h")
      #import "RCTDefines.h"
    #else
     #import <React/RCTDefines.h>
    #endif
    ```

2. Error ```/RCTBridgeModule.h:16:9 'React/RCTJSThread.h' file not found```.
  * Solucion: Reemplazar ```#import <React/RCTJSThread.h>``` por:
    ```
    #if __has_include("RCTJSThread.h")
    #import "RCTJSThread.h"
    #else
    #import <React/RCTJSThread.h>
    #endif
    ```


### Error de puerto McAfee
1. sudo lsof -i :8081 #find the PID
2. sudo launchctl list | grep <PID> # find the launchd endpoint
3. sudo launchctl remove com.mcafee.agent.macmn