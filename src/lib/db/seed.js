import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { data as animals } from '../../data/animalData.js';

// .env Datei laden
dotenv.config();

// MongoDB URI aus der .env Datei laden
const uri = process.env.VITE_MONGO_URI;
const dbName = 'QuartettDBAtlas';

// Prüfen, ob die URI vorhanden ist
if (!uri) {
    throw new Error("⚠️ MongoDB Connection String fehlt! Stelle sicher, dass die .env Datei existiert und korrekt ist.");
}

// Verbindung zur MongoDB
const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('cards');

        // Bestehende Karten löschen, um Duplikate zu vermeiden
        await collection.deleteMany({});

        // Karten aus animalData.js einfügen
        const result = await collection.insertMany(animals);
        console.log(`${result.insertedCount} Karten erfolgreich hinzugefügt!`);
    } catch (error) {
        console.error('❌ Fehler beim Seeding der Datenbank:', error);
    } finally {
        await client.close();
    }
}

// Funktion ausführen
seedDatabase();
