<script>
    import { onMount } from 'svelte';
    import Card from '$lib/components/Card.svelte';

    let playerDeck = [];
    let computerDeck = [];
    let playerCard = null;
    let computerCard = null;
    let playerTurn = true; // Spieler beginnt
    let gameResult = '';
    let selectedStat = null;
    let computerCardFlipped = true;

    // Karten laden und Decks erstellen
    async function loadCards() {
        try {
            const response = await fetch('/api/cards/trumpfcards'); // API zum Abrufen der Karten
            const allCards = await response.json();
            if (allCards.length < 32) {
                alert('Nicht genügend Karten in der Datenbank!');
                return;
            }

            // Mischen und Decks erstellen
            const shuffled = allCards.sort(() => Math.random() - 0.5);
            playerDeck = shuffled.slice(0, 16);
            computerDeck = shuffled.slice(16, 32);

            drawCards();
        } catch (error) {
            console.error('Fehler beim Laden der Karten:', error);
        }
    }

    // Karte vom Stapel ziehen
    function drawCards() {
        if (playerDeck.length === 0 || computerDeck.length === 0) {
            checkWinner();
            return;
        }

        playerCard = playerDeck.shift();
        computerCard = computerDeck.shift();
        gameResult = '';
        selectedStat = null;
        computerCardFlipped = true;
    }

    // Spieler wählt einen Wert
    function selectStat(stat) {
        if (!playerTurn || selectedStat) return;
        selectedStat = stat;

        // Karte des Computers umdrehen und Runde auswerten
        computerCardFlipped = false;
        setTimeout(evaluateTurn, 1000);
    }

    // Runde auswerten
    function evaluateTurn() {
        const playerValue = playerCard[selectedStat];
        const computerValue = computerCard[selectedStat];

        if (playerValue > computerValue) {
            gameResult = 'Player wins the round!';
            playerDeck.push(playerCard, computerCard); // Karten zurücklegen
        } else if (playerValue < computerValue) {
            gameResult = 'Computer wins the round!';
            computerDeck.push(playerCard, computerCard);
            playerTurn = false; // Computer beginnt nächste Runde
        } else {
            gameResult = 'Draw! Cards are discarded.';
        }

        // Nächste Runde vorbereiten
        setTimeout(drawCards, 2000);
    }

    // Gewinner ermitteln
    function checkWinner() {
        if (playerDeck.length > computerDeck.length) {
            gameResult = 'Player wins the game!';
        } else if (computerDeck.length > playerDeck.length) {
            gameResult = 'Computer wins the game!';
        } else {
            gameResult = 'It\'s a draw!';
        }
    }

    onMount(loadCards);
</script>

<div class="game-wrapper">
    {#if playerCard && computerCard}
        <div class="game-area">
            <!-- Spielerbereich -->
            <div class="player-side">
                <h2>Your Deck</h2>
                <div class="deck">
                    {#each playerDeck as _, i (i)}
                        <div class="card-back" style="top: {i * 2}px; left: {i * 2}px;"></div>
                    {/each}
                </div>
                <Card animal={playerCard} flipped={false} on:statClick={(e) => selectStat(e.detail)} />
            </div>

            <!-- Computerbereich -->
            <div class="computer-side">
                <h2>Computer's Deck</h2>
                <div class="deck">
                    {#each computerDeck as _, i (i)}
                        <div class="card-back" style="top: {i * 2}px; left: {i * 2}px;"></div>
                    {/each}
                </div>
                <Card animal={computerCard} flipped={computerCardFlipped} />
                {#if selectedStat}
                    <p>Computer's {selectedStat}: {computerCard[selectedStat]}</p>
                {/if}
            </div>
        </div>

        <!-- Ergebnisanzeige -->
        <div class="result">
            <p>{gameResult}</p>
        </div>
    {:else if gameResult}
        <h1>{gameResult}</h1>
    {:else}
        <p>Loading cards...</p>
    {/if}
</div>

<style>
    .game-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 20px;
    }

    .game-area {
        display: flex;
        justify-content: space-around;
        width: 100%;
        position: relative;
        padding-top: 100px;
    }

    .player-side, .computer-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .deck {
        position: relative;
        width: 100px;
        height: 150px;
    }

    .card-back {
        position: absolute;
        width: 100px;
        height: 150px;
        background: #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .result {
        text-align: center;
    }
</style>
