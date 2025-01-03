import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
let db;

export async function connect() {
    if (!db) {
        await client.connect();
        db = client.db('quartettDB');  // Deine DB anpassen
    }
    return db;
}
