import { connect } from '$lib/db/db.js';
import { ObjectId } from 'mongodb';

export async function DELETE({ params }) {
    const { id } = params;

    try {
        const db = await connect();
        const result = await db.collection('cards').deleteOne({
            _id: new ObjectId(id),
            isCustom: true  // Lösche nur benutzerdefinierte Karten
        });

        if (result.deletedCount === 1) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Karte nicht gefunden oder Löschen nicht erlaubt' }), { status: 404 });
        }
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
        return new Response(JSON.stringify({ message: 'Interner Serverfehler' }), { status: 500 });
    }
}
