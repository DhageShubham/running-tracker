import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
