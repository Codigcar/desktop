import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.prueba1 = functions.https.onCall((data) => {
    const response = {
      nombre: 'Guillermo',
    };
    return response;
});

exports.prueba2 = functions.https.onCall((data) => {
    const response = {
      nombre: data.nombre,
    };
    return response;
});