import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const schedule = functions.pubsub.schedule('0 20 * * *').timeZone('America/Lima').onRun(async (context) => {
    await db.collection('schedule').add({
        fecha: admin.firestore.Timestamp.fromDate(new Date())
    });
});

export const createDuplicateOnCreateUsuario = functions.firestore
  .document('usuarios/{idUsuario}')
  .onCreate(async (snap, context) => {
    const usuario = snap.data();
    await db.collection('duplicates').add({... usuario});
    return 0;
});