import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/db.js';

// GET: Karten aus der Datenbank abrufen
export async function GET() {
    const db = await connect();
    const cards = await db.collection('cards').find({}).toArray();
    return json(cards);
}

// POST: Neue Karte hinzufügen
export async function POST({ request }) {
    const db = await connect();
    const newCard = await request.json();

    // Sicherstellen, dass das isCustom-Flag existiert
    if (!('isCustom' in newCard)) {
        newCard.isCustom = true;  // Setze isCustom auf true, wenn nicht vorhanden
    }

    try {
        const result = await db.collection('cards').insertOne(newCard);
        return json({ message: 'Karte erfolgreich hinzugefügt', id: result.insertedId });
    } catch (error) {
        return json({ error: 'Fehler beim Hinzufügen der Karte' }, { status: 500 });
    }
}
