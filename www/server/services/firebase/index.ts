import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { config } from "~/server/config/firebase";

const fb = initializeApp(config);
const db = getFirestore(fb);
const storage = getStorage(fb);

export { fb, db, storage };