import { connect } from '$lib/db/db.js';

export async function GET() {
    try {
        const db = await connect();

        // 8 zufällige Karten aus der Collection abrufen
        const cards = await db.collection('cards')
            .aggregate([{ $sample: { size: 8 } }])
            .toArray();

        return new Response(JSON.stringify(cards), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Karten:', error);
        return new Response(JSON.stringify({ message: 'Interner Serverfehler' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
