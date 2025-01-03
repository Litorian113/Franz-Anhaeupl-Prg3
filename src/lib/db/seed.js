import { MongoClient } from 'mongodb';
import { data as animals } from '../../data/animalData.js';

const client = new MongoClient('mongodb://localhost:27017');
const dbName = 'quartettDB';

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
        console.error('Fehler beim Seeding der Datenbank:', error);
    } finally {
        await client.close();
    }
}

seedDatabase();
