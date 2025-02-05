<script>
    import { onMount } from 'svelte';

    let highscores = {
        memoryGame: [],
        guessGame: [],
        quizGame: []
    };

    async function fetchHighscores() {
        try {
            const [memoryRes, guessRes, quizRes] = await Promise.all([
                fetch('/api/highscores'),
                fetch('/api/guessHighscore'),
                fetch('/api/quizHighscores')
            ]);

            highscores.guessGame = await guessRes.json();
            highscores.memoryGame = await memoryRes.json();
            highscores.quizGame = await quizRes.json();
        } catch (error) {
            console.error('Error loading high scores:', error);
        }
    }

    onMount(() => {
        fetchHighscores();
    });
</script>

<div class="highscore-section">
    <h2>🏆 leaderboard overview</h2>
    <div class="highscore-grid">
        <!-- Guess Game Highscores -->
        <div class="highscore-column">
            <h3>memory</h3>
            <ul>
                {#each highscores.memoryGame as score}
                    <li>{score.playerName} - {score.elapsedTime}s</li>
                {/each}
            </ul>
        </div>

        <!-- Mode 2 Highscores -->
        <div class="highscore-column">
            <h3>guess me</h3>
            <ul>
                {#each highscores.guessGame as score}
                    <li>{score.playerName} - {score.elapsedTime}s</li>
                {/each}
            </ul>
        </div>

        <!-- Mode 3 Highscores -->
        <div class="highscore-column">
            <h3>quiz</h3>
            <ul>
                {#each highscores.quizGame as score}
                    <li>{score.playerName} - {score.elapsedTime}s</li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
    .highscore-section {
        width: 100%;
        height: 70vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .highscore-section h2 {
        margin-bottom: 20px;
        font-size: 2rem;
        text-align: center;
    }

    .highscore-grid {
        display: flex;
        width: 100%;
        max-width: 1200px;
        justify-content: space-around;
        gap: 20px;
    }

    .highscore-column {
        flex: 1;
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .highscore-column h3 {
        margin-bottom: 15px;
        font-size: 1.5rem;
        color: #C4191F;
    }

    .highscore-column ul {
        list-style: none;
        padding: 0;
    }

    .highscore-column li {
        font-size: 1.2rem;
        padding: 5px;
    }
</style>
