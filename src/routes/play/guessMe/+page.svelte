<script>
    import Card from '$lib/components/GuessCard.svelte';
    import { onMount } from 'svelte';
    import OpenAI from "openai";
	import { SvelteSet } from 'svelte/reactivity';

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    let animals = [];
    let secretAnimal = null; // Das zu erratende Tier
    let selectedCards = [];  // Karten, die im Spiel sind
    let excludedCards = new SvelteSet(); // Karten, die ausgegraut werden (Set für einfaches Hinzufügen/Entfernen)
    let userInput = '';      // Eingabe vom Spieler
    let chatResponse = '';   // Antwort von OpenAI
    let gameOver = false;    // Spielstatus
    let win = false;         // Ob der User gewonnen hat

    // 5 zufällige Karten abrufen
    async function fetchCards() {
        try {
            const response = await fetch('/api/cards/guessCards');
            const data = await response.json();
            animals = data;
            selectedCards = [...data];  // Kopie der Karten für Auswahl
            secretAnimal = data[Math.floor(Math.random() * data.length)]; // Zufällige Karte wählen
        } catch (error) {
            console.error('Fehler beim Laden der Karten:', error);
        }
    }

    onMount(() => {
        fetchCards();
    });

    // Nutzer stellt eine Frage an OpenAI
    async function askAI() {
        if (!userInput.trim()) return;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `Give a very short (max 100 characters) response describing the secret animal's characteristics 
                        without revealing the name. Example: "It is large and has a thick fur."`
                    },
                    {
                        role: "user",
                        content: `The secret animal has these attributes:
                        Weight: ${secretAnimal.max_weight} kg, 
                        Age: ${secretAnimal.max_age} years, 
                        Speed: ${secretAnimal.top_speed} km/h, 
                        Length: ${secretAnimal.max_length} cm, 
                        Intelligence: ${secretAnimal.intelligence}/10.
                        The user asks: "${userInput}". Give a very short answer.`
                    }
                ]
            });

            chatResponse = completion.choices[0]?.message?.content || "No response.";
            userInput = ''; // Eingabe zurücksetzen
        } catch (error) {
            console.error("Fehler beim Abrufen der KI-Antwort:", error);
            chatResponse = "Sorry, I couldn't process your question.";
        }
    }

    // Karte deaktivieren oder wieder aktivieren
    function toggleCard(animal) {
    if (excludedCards.has(animal._id)) {
        excludedCards.delete(animal._id); // Falls bereits ausgegraut, wieder aktivieren
    } else {
        if (excludedCards.size < 4) {
            excludedCards.add(animal._id); // Falls nicht ausgegraut, deaktivieren
        }
    }

    // Überprüfe, ob das Spiel beendet werden soll
    if (excludedCards.size === 4) {
        gameOver = true;
    } else {
        gameOver = false; // Falls eine Karte reaktiviert wurde, das Spiel zurücksetzen
    }
}

    // Prüfen, ob der User gewonnen hat
    function checkWin() {
        if (selectedCards.length - excludedCards.size === 1) {
            const remainingCard = selectedCards.find(card => !excludedCards.has(card._id));
            if (remainingCard._id === secretAnimal._id) {
                win = true;
            } else {
                win = false;
            }
        }
    }
</script>

<div class="game-container">
    <h1>Guess the Animal</h1>

    <!-- ChatGPT Eingabe -->
    <div class="chat-container">
        <input type="text" bind:value={userInput} placeholder="Ask about the animal..." />
        <button on:click={askAI}>Ask AI</button>
        <p class="chat-response">{chatResponse}</p>
    </div>

    <!-- Kartenbereich -->
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
        <button class="check-button" on:click={checkWin}>Check Answer</button>
    {/if}

    <!-- Gewinn-Overlay -->
    {#if gameOver}
        <div class="overlay">
            <div class="overlay-content">
                {#if win}
                    <h2>🎉 You won!</h2>
                    <p>The secret animal was: {secretAnimal.name_german}.</p>
                {:else}
                    <h2>❌ You lost!</h2>
                    <p>The correct animal was: {secretAnimal.name_german}.</p>
                {/if}
                <button on:click={() => location.reload()}>Play Again</button>
            </div>
        </div>
    {/if}
</div>

<style>
    .game-container {
        text-align: center;
        margin-top: 50px;
    }

    .chat-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    input {
        padding: 10px;
        font-size: 16px;
        width: 300px;
        margin-bottom: 10px;
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
        margin: 0px;
        padding: 0px;
        width: 280px;
        cursor: pointer;
        transition: opacity 0.3s ease, filter 0.3s ease;
    }

    .cardSize:hover {
        opacity: 0.7;
    }

    .inactive {
    filter: grayscale(100%) brightness(0.6);
    pointer-events: auto; /* Wieder klickbar machen */
}

    .check-button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 18px;
        background-color: #C4191F;
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }

    /* Overlay für das Gewinn-/Verloren-Popup */
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
    }
 

    .overlay-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
    }

    .overlay-content button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #C4191F;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
