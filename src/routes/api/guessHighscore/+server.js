import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/db';

// POST route to store a new high score
export async function POST({ request }) {
    const db = await connect();
    const highscores = db.collection('guessHighscores');

    try {
        const { playerName, elapsedTime } = await request.json();

        const newHighscore = {
            playerName,
            elapsedTime,
            date: new Date()
        };

        // Insert the new high score
        await highscores.insertOne(newHighscore);

        // Fetch and sort the high scores, keeping only the top 10
        const topScores = await highscores
            .find()
            .sort({ elapsedTime: 1 }) // Shortest time first
            .limit(10)
            .toArray();

        return json({ success: true, highscores: topScores });
    } catch (error) {
        console.error('Error saving high score:', error);
        return json({ error: 'Error saving high score' }, { status: 500 });
    }
}

// GET route to retrieve the top 10 high scores
export async function GET() {
    const db = await connect();
    const highscores = db.collection('guessHighscores');

    try {
        const results = await highscores
            .find()
            .sort({ elapsedTime: 1 }) // Shortest time first
            .limit(10)
            .toArray();

        return json(results);
    } catch (error) {
        console.error('Error retrieving high scores:', error);
        return json({ error: 'Error retrieving high scores' }, { status: 500 });
    }
}
