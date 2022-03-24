import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtlvjJwGNzNGOY40SpCEM2zaEa_2a5H5s",
  authDomain: "chat-4aacb.firebaseapp.com",
  databaseURL: "https://chat-4aacb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-4aacb",
  storageBucket: "chat-4aacb.appspot.com",
  messagingSenderId: "924350170807",
  appId: "1:924350170807:web:8c0a71ab047031ea402f32"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Database = getDatabase(app);

export { db };