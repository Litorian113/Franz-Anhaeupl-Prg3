<script>
    import { onMount } from 'svelte';
    import Memoriecard from '$lib/components/MemorieCard.svelte';
    import { goto } from '$app/navigation';

    let cards = [];
    let flippedCards = [];
    let flippedIndexes = [];
    let matchedCards = 0;
    let lockBoard = false;
    let startTime;
    let elapsedTime = 0;
    let interval;
    let playerName = '';
    let gameStarted = false;
    let showHighscoreOverlay = false;
    let highscores = [];

    // Karten abrufen und duplizieren (für Memory-Spiel)
    async function fetchMemorieCards() {
        try {
            const response = await fetch('/api/cards/memorie');
            const data = await response.json();
            cards = shuffle([...data, ...data]); // Karten duplizieren und mischen
            flippedCards = Array(cards.length).fill(false);
        } catch (error) {
            console.error('Fehler beim Abrufen der Karten:', error);
        }
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function flipCard(index) {
        if (lockBoard || flippedCards[index] || flippedIndexes.length === 2) {
            return;
        }

        flippedCards[index] = true;
        flippedIndexes.push(index);

        if (flippedIndexes.length === 2) {
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [firstIndex, secondIndex] = flippedIndexes;

        if (cards[firstIndex].id === cards[secondIndex].id) {
            matchedCards += 2;
            resetBoard();
        } else {
            setTimeout(() => {
                flippedCards[firstIndex] = false;
                flippedCards[secondIndex] = false;
                resetBoard();
            }, 1000);
        }
    }

    async function resetBoard() {
        flippedIndexes = [];
        lockBoard = false;

        // Spiel beenden und Highscore speichern
        if (matchedCards === cards.length) {
            clearInterval(interval);
            showHighscoreOverlay = true;

            try {
                const response = await fetch('/api/highscores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        playerName,
                        elapsedTime,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    console.log('Highscore gespeichert:', data.result);
                    fetchHighscores();
                } else {
                    console.error('Fehler beim Speichern des Highscores');
                }
            } catch (error) {
                console.error('Netzwerkfehler beim Speichern des Highscores:', error);
            }
        }
    }

    // Spiel starten
    function startGame() {
        if (!playerName) return;
        gameStarted = true;
        matchedCards = 0;
        startTime = Date.now();
        interval = setInterval(() => {
            elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        }, 1000);
    }

    function restartGame() {
        showHighscoreOverlay = false;
        fetchMemorieCards();
        gameStarted = false;
        elapsedTime = 0;
    }

    function returnToHub() {
        goto('/play');
    }

    // Highscores abrufen
    async function fetchHighscores() {
        const response = await fetch('/api/highscores');
        highscores = await response.json();
    }

    onMount(() => {
        fetchMemorieCards();
        fetchHighscores();
    });
</script>

<main>
    {#if !gameStarted}
        <div class="start-screen">
            <h2 class="main-header">start memory</h2>
            <div class="gameStart">
                <input type="text" bind:value={playerName} placeholder="enter your name" />
                <button id="generate" on:click={startGame} disabled={!playerName}>start game</button>
            </div>
        </div>
    {/if}

    {#if gameStarted}
    <div class="page">
        <div class="sidebar">
        <h1 class="heading1">memory game</h1>
        <p class="timer">time: {elapsedTime} seconds</p>
    </div>
        <div class="card-grid-container">
        <div class="card-grid">
            {#each cards as card, index}
                <Memoriecard
                    animal={card}
                    isFlipped={flippedCards[index]}
                    on:flip={() => flipCard(index)}
                />
            {/each}
        </div>
    </div>
</div>
    {/if}

    {#if showHighscoreOverlay}
        <div class="highscore-overlay">
            <div class="overlay-content">
                <h2>game ended!</h2>
                <p>congratulations, {playerName}!</p>
                <p>your time: {elapsedTime} Sekunden</p>

                <h3>highscores</h3>
                <ul>
                    {#each highscores as score}
                        <li>{score.playerName} – {score.elapsedTime} Sekunden</li>
                    {/each}
                </ul>
                
                <button on:click={restartGame}>play again</button>
                <button on:click={returnToHub}>back to hub</button>
            </div>
        </div>
    {/if}
</main>


<style>
.page {

    padding-top: 5%;
}

.sidebar {
    display: flex;
    flex-direction: column;
    padding-left: 3%;
    justify-content: center;
    align-items: center;
}
main {
    text-align: center;
    padding: 20px;
}

.start-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}

.card-grid-container {
    display: flex;
    justify-content: center; /* Zentriert horizontal */
    align-items: center; /* Zentriert vertikal */
    height: 80vh; /* Die volle Höhe des Bildschirms */
    width: 100vw; /* Die volle Breite des Bildschirms */
    overflow: hidden; /* Optional: Verhindert, dass Inhalte über den Bildschirm hinausragen */
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Grid mit 4 Spalten */
    gap: 30px; /* Abstand zwischen den Karten */
    justify-items: center; /* Karten innerhalb der Zellen zentrieren */
    transform: scale(0.4);
}

.timer {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.highscore-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #E0E4DC;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 2;
}

.overlay-content {
    background: #252525;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.overlay-content h2 {
    font-size: 2rem;
    margin-bottom: 20px;
}

.overlay-content p {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.overlay-content ul {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.overlay-content li {
    font-size: 1.1rem;
    margin: 5px 0;
}

.overlay-content button {
    padding: 10px 20px;
    font-size: 1rem;
    margin: 10px;
    background: #c4191f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.overlay-content button:hover {
    background: #a3161a;
}

.gameStart {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

#generate {
    padding: 12px 45px;
    font-size: 16px;
    color: #C4191F;
    border: 2px solid #C4191F;
    border-radius: 15px;
    cursor: pointer;
    background-color: #E0E4DC;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.3s ease;
}

#generate::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #C4191F;
    z-index: -1;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

#generate:hover::before {
    transform: translateX(0);
}

#generate:hover {
    color: #E0E4DC;
    border-color: #C4191F;
}

#generate:disabled {
    background: #ccc;
    color: #555555;
    cursor: not-allowed;
    border: 2px solid #ccc;
    position: relative;
}

#generate:disabled::before {
    content: none; /* Entfernt die Animation */
}

#generate:disabled:hover {
    cursor: not-allowed;
}

input {
    padding: 10px;
    font-size: 16px;
    color: #2C2A2D;
    background-color: #E0E4DC;
    cursor: auto;
    border-style: solid;
    border: none;             
    border-bottom: 2px solid #7e7e7e;
    width: 270px;
}

input:focus {
    outline: none;  /* Entfernt den blauen Rahmen */
    border-bottom: 2px solid #C4191F;  /* Optional: Linie unten ändern */
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background: #c4191f;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

button:hover {
    background: #a3161a;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    font-size: 1.1rem;
    margin: 5px 0;
}

.main-header {
    font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 64px;
        line-height: 55px;
        color: #2C2A2D;
        text-align: left;
        padding-right: 100px;
}

.heading1 {
    font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 64px;
        line-height: 55px;
        color: #2C2A2D;
        text-align: left;
        margin: 0px;
}

.timer {
    font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 32px;
        line-height: 55px;
        color: #2C2A2D;
        text-align: left;
        margin: 0px;
        padding-right: 170px;
}

</style>
