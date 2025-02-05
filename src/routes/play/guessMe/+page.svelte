<script>
    import Card from '$lib/components/GuessCard.svelte';
    import { onMount } from 'svelte';
    import OpenAI from "openai";
    import { SvelteSet } from 'svelte/reactivity';

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    let animals = [];
    let secretAnimal = null;
    let selectedCards = [];
    let excludedCards = new SvelteSet();
    let chatResponse = '';
    let gameOver = false;
    let win = false;
    let playerName = '';
    let gameStarted = false;
    let startTime, elapsedTime;
    let highscores = [];

    async function fetchCards() {
        try {
            const response = await fetch('/api/cards/guessCards');
            const data = await response.json();
            animals = data;
            selectedCards = [...data];
            secretAnimal = data[Math.floor(Math.random() * data.length)];
        } catch (error) {
            console.error('Error loading cards:', error);
        }
    }

    async function fetchHighscores() {
        try {
            const response = await fetch('/api/guessHighscore');
            highscores = await response.json();
        } catch (error) {
            console.error('Error loading high scores:', error);
        }
    }

    async function saveHighscore() {
        try {
            await fetch('/api/guessHighscore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerName, elapsedTime })
            });
            await fetchHighscores();
        } catch (error) {
            console.error('Error saving high score:', error);
        }
    }

    onMount(() => {
        fetchCards();
        fetchHighscores();
    });

    async function getHint() {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `Provide a short, somewhat cryptic hint about the secret animal.
                        Do not reveal the name or make it too obvious, but also do not make it overly difficult.
                        Ensure that the hint gives the player some insight but still requires thought to deduce.
                        Example: "It has a trait that makes it a master of patience in the wild."`
                    },
                    {
                        role: "user",
                        content: `The secret animal has these attributes:
                        Weight: ${secretAnimal.max_weight} kg, 
                        Age: ${secretAnimal.max_age} years, 
                        Speed: ${secretAnimal.top_speed} km/h, 
                        Length: ${secretAnimal.max_length} cm, 
                        Intelligence: ${secretAnimal.intelligence}/10.
                        Generate a clever, slightly enigmatic hint based on these attributes. Not longer than 70 Characters.`
                    }
                ]
            });

            chatResponse = completion.choices[0]?.message?.content || "No hint available.";
        } catch (error) {
            console.error("Error getting hint:", error);
            chatResponse = "Sorry, I couldn't generate a hint.";
        }
    }

function startGame() {
    gameStarted = true;
    startTime = Date.now();
    elapsedTime = 0; // Reset timer

    // Start interval to update the timer every second
    interval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Remove milliseconds
    }, 1000);
}

    function toggleCard(animal) {
        if (excludedCards.has(animal._id)) {
            excludedCards.delete(animal._id);
        } else {
            if (excludedCards.size < 4) {
                excludedCards.add(animal._id);
            }
        }

        if (excludedCards.size === 4) {
            elapsedTime = parseInt((Date.now() - startTime) / 1000, 10);
            const remainingCard = selectedCards.find(card => !excludedCards.has(card._id));
            gameOver = true;
            win = remainingCard._id === secretAnimal._id;
            if (win) {
                saveHighscore();
            }
        } else {
            gameOver = false;
        }
    }

    

    
</script>

{#if !gameStarted}
<div class="start-screen">
    <h2 class="main-header">welcome to <br> guess me</h2>
    <div class="gameStart">
        <input type="text" bind:value={playerName} placeholder="enter your name" />
        <button id="generate" on:click={startGame} disabled={!playerName}>start game</button>
    </div>
</div>
{/if}

    <div class="game-container">
    <div class="oben">
        <h1>guess the animal</h1>

        <div class="chat-container">
            <button on:click={getHint}>do you need a hint?</button>
            <p class="chat-response">{chatResponse}</p>
            <p class="timer">time: {elapsedTime}</p>
        </div>
    </div>

    <div class="card-grid">
        {#each selectedCards as animal (animal._id)}
            <div 
                class="cardSize {excludedCards.has(animal._id) ? 'inactive' : ''}"
                on:click={() => toggleCard(animal)}>
                <Card animal={animal} />
            </div>
        {/each}
    </div>
</div>

    {#if gameOver}
        <div class="overlay">
            <div class="overlay-content">
                {#if win}
                    <h2>🎉 you won!</h2>
                    <p>the secret animal was: {secretAnimal.name_german}.</p>
                {:else}
                    <h2>❌ you lost!</h2>
                    <p>the correct animal was: {secretAnimal.name_german}.</p>
                {/if}
                <h3>Leaderboard</h3>
                <ul>
                    {#each highscores as score}
                        <li>{score.playerName} - {score.elapsedTime}s</li>
                    {/each}
                </ul>
                <div class="button-group">
                    <button on:click={() => window.location.href = '/play'}>back to hub</button>
                    <button on:click={() => location.reload()}>play again</button>
                </div>
            </div>
        </div>
    {/if}


<style>


.start-screen, .game-container, .overlay {
    background-image: url('../images/BGGUESS.png'); /* Pfad zum Bild */
    background-repeat: no-repeat;
    background-size: cover; /* Deckt die gesamte Breite und Höhe ab, ohne Verzerrungen */
    background-position: center; /* Zentriert das Bild */

}
.start-screen, .game-container, .overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }

.start-screen {
    opacity: 0;
    animation: fadeIn 1.5s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

#generate {
    padding: 12px 45px;
    font-size: 16px;
    color: #C4191F;
    border: 2px solid #C4191F;
    border-radius: 15px;
    cursor: pointer;
    background-image: url('../images/stageCover.jpg'); /* Pfad zum Bild */
    background-repeat: no-repeat;
    background-size: cover; /* Deckt die gesamte Breite und Höhe ab, ohne Verzerrungen */
    background-position: center; /* Zentriert das Bild */
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

.main-header {
    font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 64px;
        line-height: 55px;
        color: #2C2A2D;
        text-align: left;
        padding-right: 125px;
}

.gameStart {
    display: flex;
    flex-direction: row;
    gap: 20px;
}
.start-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}
    .oben {
        display: flex;
        flex-direction: column;
        margin-top: 5em;
        justify-content: center;
        align-items: center;
    }
    .game-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        height: 100vh;
    }
    .chat-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }
    .chat-response {
        background-color: #e0e0e0;
        padding: 10px;
        border-radius: 5px;
        max-width: 400px;
        text-align: center;
    }
    .card-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
    }
    .cardSize {
        transform: scale(0.8);
        cursor: pointer;
        width: 280px;
        transition: opacity 0.3s ease, filter 0.3s ease;
    }
    .cardSize:hover {
        opacity: 0.7;
    }
    .inactive {
        filter: grayscale(100%) brightness(0.6);
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background: #E0E4DC; */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
    .overlay-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
    }

    .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.button-group button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #C4191F;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
