import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!filePath) throw new Error('❌ La variable FIREBASE_SERVICE_ACCOUNT_PATH no está definida en el .env');

const serviceAccountPath = path.resolve(filePath);

// Leemos y parseamos el secreto
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

// Inicializamos la conexión con Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export class AuthService {
  /**
   * Valida el idToken que envía el móvil contra los servidores de Google/Firebase
   */
  static async verifyGoogleToken(idToken: string) {
    try {
      // Verificación real del token
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      return decodedToken;

    } catch (error) {

      console.error('❌ Error verificando token en Firebase:', error);
      return null;

    }
  }
}