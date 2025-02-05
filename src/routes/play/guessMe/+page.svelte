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
    <div class="overlay">
        <div class="overlay-content">
            <h2>enter your name</h2>
            <input type="text" bind:value={playerName} placeholder="Your name..." />
            <button on:click={startGame}>start game</button>
        </div>
    </div>
{/if}

<div class="game-container">
    <div class="oben">
        <h1>guess the Animal</h1>

        <div class="chat-container">
            <button on:click={getHint}>do you need a hint?</button>
            <p class="chat-response">{chatResponse}</p>
        </div>
    </div>

    <div class="card-grid">
        {#each selectedCards as animal (animal._id)}
            <div 
                class="cardSize {excludedCards.has(animal._id) ? 'inactive' : ''}"
                on:click={() => toggleCard(animal)}
            >
                <Card animal={animal} />
            </div>
        {/each}
    </div>

    {#if gameOver}
        <div class="overlay">
            <div class="overlay-content">
                {#if win}
                    <h2>🎉 You won!</h2>
                    <p>the secret animal was: {secretAnimal.name_german}.</p>
                {:else}
                    <h2>❌ You lost!</h2>
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
</div>

<style>
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
        background: #E0E4DC;
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
