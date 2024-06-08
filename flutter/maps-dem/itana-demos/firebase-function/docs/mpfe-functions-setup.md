# Configuracion del Proyecto mpfe-functions

### Referencia
* [Get started: write, test, and deploy your first functions](https://firebase.google.com/docs/functions/get-started)
* [FCM Push Notifications for Flutter](https://fireship.io/lessons/flutter-push-notifications-fcm-guide/)


### Tener el proyecto de Firebase CREADO

## Set up del Proyecto

### Set up Node.js and the Firebase CLI
```cmd
npm install -g firebase-tools
```

### Ingresar con el usuario de gmail con el que fue creado el proyecto: email@xmail.pe

```cmd
firebase logout
firebase login
```

### Initialize Firebase SDK for Cloud Functions

```cmd
firebase init functions
```

```

C:\jcabelloc\workspace\iTana\8.MiProfePe\mpfe-functions>firebase init functions

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

? Are you ready to proceed? Yes

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: project (project-x)
i  Using project project (project-x)

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? Yes
+  Wrote functions/package.json
+  Wrote functions/tslint.json
+  Wrote functions/tsconfig.json
+  Wrote functions/src/index.ts
+  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes

```

## Desplegar las funciones

* Deployar las funciones
```bash
firebase deploy --only functions
```
Primera vez: Error: HTTP Error: 403, Unknown Error
Segunda vez: Error: HTTP Error: 400, Billing must be enabled for activation of service '[cloudscheduler.googleapis.com]' in project '416860567821' to proceed.

## Activar el billing
* Cambiar de Plan, de Spark (Free) a Blaze
* Se uso la cuenta de billing de iTana

## Volver al Deploy of functions
* Deployar las funciones
```bash
firebase deploy --only functions
```
