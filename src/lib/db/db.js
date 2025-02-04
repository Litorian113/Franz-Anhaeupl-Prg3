import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Lade die .env-Datei
dotenv.config();

// Hole die MongoDB URI aus der .env Datei
const uri = process.env.VITE_MONGO_URI;

// Prüfe, ob die URI vorhanden ist
if (!uri) {
    throw new Error("⚠️ MongoDB Connection String fehlt! Stelle sicher, dass die .env Datei existiert und korrekt ist.");
}

// Verbindung zu MongoDB Atlas
const client = new MongoClient(uri);
let db;

export async function connect() {
    if (!db) {
        await client.connect();
        db = client.db('QuartettDBAtlas'); // Dein DB-Name in MongoDB Atlas
    }
    return db;
}
