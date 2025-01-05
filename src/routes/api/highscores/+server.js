import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/db';

// POST-Route zum Speichern des Highscores
export async function POST({ request }) {
    const db = await connect();
    const highscores = db.collection('highscores');

    try {
        const { playerName, elapsedTime } = await request.json();

        const newHighscore = {
            playerName,
            elapsedTime,
            date: new Date()
        };

        // Neuen Highscore speichern
        await highscores.insertOne(newHighscore);

        // Highscores sortieren und auf die besten 10 begrenzen
        const topScores = await highscores
            .find()
            .sort({ elapsedTime: 1 })  // Sortieren (kürzeste Zeit zuerst)
            .toArray();

        if (topScores.length > 10) {
            const worstScore = topScores[topScores.length - 1];
            await highscores.deleteOne({ _id: worstScore._id });  // Langsamster wird gelöscht
        }

        return json({ success: true });
    } catch (error) {
        console.error('Fehler beim Speichern des Highscores:', error);
        return json({ error: 'Fehler beim Speichern des Highscores' }, { status: 500 });
    }
}

// GET-Route zur Highscore-Abfrage (Top 10)
export async function GET() {
    const db = await connect();
    const highscores = db.collection('highscores');

    const results = await highscores
        .find()
        .sort({ elapsedTime: 1 })
        .limit(10)
        .toArray();

    return json(results);
}
