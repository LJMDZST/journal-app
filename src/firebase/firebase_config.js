import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/** Firebase es un servicio de base de datos orientado a paginas web
 *  Tiene una api para javascript con enlaces a las api de Google,
 *  Tiene una consola similar a la de google developers.
 */

// Credenciales de autenticacion
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
// se crea una instancia de conexion a la base de datos con las credenciales.
// Se va a usar la herramienta de autenticacion de google para loguearse con una 
// cuenta de google 
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}