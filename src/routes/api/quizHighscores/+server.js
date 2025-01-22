import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/db';

export async function POST({ request }) {
    const db = await connect();
    const quizHighscores = db.collection('quizhighscores');

    try {
        const { playerName, correctAnswers, elapsedTime } = await request.json();

        const newHighscore = {
            playerName,
            correctAnswers,
            elapsedTime,
            date: new Date()
        };

        // Highscore in die Datenbank einfügen
        await quizHighscores.insertOne(newHighscore);

        // Bestenliste sortieren (mehr richtige Antworten zuerst, dann nach Zeit)
        const topScores = await quizHighscores
            .find()
            .sort({ correctAnswers: -1, elapsedTime: 1 }) // Richtige zuerst, bei Gleichstand schnellste Zeit
            .limit(10) // Nur die besten 10
            .toArray();

        return json(topScores);
    } catch (error) {
        console.error('Fehler beim Speichern des Quiz-Highscores:', error);
        return json({ error: 'Fehler beim Speichern des Highscores' }, { status: 500 });
    }
}

export async function GET() {
    const db = await connect();
    const quizHighscores = db.collection('quizhighscores');

    try {
        const topScores = await quizHighscores
            .find()
            .sort({ correctAnswers: -1, elapsedTime: 1 })
            .limit(10)
            .toArray();

        return json(topScores);
    } catch (error) {
        console.error('Fehler beim Abrufen der Bestenliste:', error);
        return json({ error: 'Fehler beim Abrufen der Bestenliste' }, { status: 500 });
    }
}
