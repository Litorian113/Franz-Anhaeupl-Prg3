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

    // Karten abrufen und duplizieren (für Memorie-Spiel)
    async function fetchMemorieCards() {
        try {
            const response = await fetch('/api/cards/memorie');
            const data = await response.json();
            cards = shuffle([...data, ...data]);  // Karten duplizieren und mischen
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        playerName,
                        elapsedTime
                    })
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
        <div class="overlay">
            <div class="overlay-content">
                <h2>Memorie Starten</h2>
                <input type="text" bind:value={playerName} placeholder="Dein Name" />
                <button on:click={startGame}>Spiel starten</button>
            </div>
        </div>
    {/if}

    {#if gameStarted}
        <h1>Memorie Spiel</h1>
        <p class="timer">Zeit: {elapsedTime} Sekunden</p>
        <div class="card-grid">
            {#each cards as card, index}
                <Memoriecard
                    animal={card}
                    isFlipped={flippedCards[index]}
                    on:flip={() => flipCard(index)}
                />
            {/each}
        </div>
    {/if}

    {#if showHighscoreOverlay}
        <div class="overlay">
            <div class="overlay-content">
                <h2>Spiel beendet!</h2>
                <p>Herzlichen Glückwunsch, {playerName}!</p>
                <p>Deine Zeit: {elapsedTime} Sekunden</p>

                <h3>Highscores</h3>
                <ul>
                    {#each highscores as score}
                        <li>{score.playerName} – {score.elapsedTime} Sekunden</li>
                    {/each}
                </ul>
                
                <button on:click={restartGame}>Noch einmal spielen</button>
                <button on:click={returnToHub}>Zurück zum Hub</button>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 20px;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        justify-items: center;
        margin-top: 20px;
    }

    .timer {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .overlay-content {
        background: #252525;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
    }

    input {
        margin-bottom: 20px;
        padding: 10px;
        font-size: 1rem;
    }

    button {
        padding: 10px 20px;
        margin: 10px;
        font-size: 1rem;
        cursor: pointer;
    }
</style>
