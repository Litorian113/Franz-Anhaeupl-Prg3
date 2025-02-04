<script>

    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from 'svelte';
    import Card from '$lib/components/Card.svelte';
    import OpenAI from "openai";
    import GenerateButton from '$lib/components/GenerateButton.svelte';
	import Loader from "$lib/components/Loader.svelte";
  
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
    const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
    });
  
    let newAnimalName = '';
    let generatedAnimal = null;
    let errorMessage = '';
    let successMessage = '';

    let isLoading = false;

  
    // Funktion zur Ermittlung der nächsten Gruppen-ID
    function determineNextGroup(lastGroup, nextId) {
        const groupLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lastGroupIndex = groupLetters.indexOf(lastGroup);
        
        // Erstelle eine neue Gruppe alle vier Karten
        if (nextId % 4 === 1) {
            return groupLetters[lastGroupIndex + 1] || "A";
        }
        return lastGroup;
    }
  
    // Tierdaten generieren mit OpenAI
    async function generateAnimalData(animalName) {
    try {
        console.log(`Tierdaten für ${animalName} werden generiert...`);

        // OpenAI-Anfrage zur Generierung der Tierdaten
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: `Create a short description and suitable attributes for the animal '${animalName}'.
                                The result must be in JSON format using the following fields:
                    {
                        "name_german": "Animal name in english",
                        "trivia_german": "Short Trivia in english (120 characters maximum)",
                        "max_weight": Zahl,
                        "max_age": Zahl,
                        "top_speed": Zahl,
                        "deaths": Zahl,
                        "max_length": Zahl,
                        "intelligence": Zahl
                    }
                    Die Trivia darf maximal 120 Zeichen lang sein. Gib keine Einheiten wie kg, km/h oder Jahre an. Nur Zahlen!`,
                },
            ],
        });

        const generatedText = completion.choices[0]?.message?.content;
        const cleanText = generatedText.replace(/```json|```/g, '');
        const animalData = JSON.parse(cleanText);

        // Generiere ein Bild für das Tier
        const imageResponse = await openai.images.generate({
            prompt: `A highly detailed, semi-realistic illustration of a ${animalName} in its natural environment.
             The scene showcases the ${animalName} in a lifelike pose, with intricate details such as fur, scales, or feathers.
              The environment is depicted with cinematic lighting, capturing a serene and atmospheric mood.
               The background complements the habitat, such as lush savannahs for land animals,
                vibrant coral reefs or deep oceans for aquatic animals, or dense forests for other species.
                 The artistic style blends realism with soft illustrative elements, featuring rich, natural colors, dramatic lighting,
                  and a focus on harmony between the animal and its surroundings.
                   The composition emphasizes depth, texture, and balance, creating a visually stunning and immersive piece.
`, 
            n: 1,
            size: "1024x1024"
        });

        const imageUrl = imageResponse.data[0].url; // Bild-URL aus der Antwort extrahieren

        animalData.trivia_german = animalData.trivia_german.substring(0, 120);

        // Karten aus der Datenbank abrufen, um höchste ID zu ermitteln
        const response = await fetch('/api/cards');
        const existingCards = await response.json();

        // Bestimme die höchste ID und die nächste verfügbare ID
        const highestId = existingCards.reduce((max, card) => Math.max(max, card.id), 0);
        const nextId = highestId + 1;

        // Bestimme die aktuelle Gruppe basierend auf den letzten vier Karten
        const lastGroup = existingCards.length > 0 ? existingCards[existingCards.length - 1].group : "A";
        const nextGroup = determineNextGroup(lastGroup, nextId);

        generatedAnimal = {
            id: nextId,
            ...animalData,
            imageUrl, // Füge die generierte Bild-URL hinzu
            group: nextGroup,
            groupname_german: "Neue Tiere",
            groupname: "New Animals",
            group_number: 5,
        };

    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        errorMessage = 'Es gab ein Problem mit der Tiergenerierung.';
    }
}
  
    // Karte in die MongoDB-Datenbank speichern
    async function addToCollection() {
        if (generatedAnimal) {
            try {
                const response = await fetch('/api/cards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(generatedAnimal),
                });
  
                if (response.ok) {
                    successMessage = `${generatedAnimal.name_german} added to your collection!`;
                    generatedAnimal = null;
                } else {
                    const errorData = await response.json();
                    errorMessage = `Fehler: ${errorData.message}`;
                }
            } catch (error) {
                errorMessage = 'Fehler beim Speichern der Karte in der Datenbank.';
            }
        }
    }
  
    function deleteGeneratedCard() {
        generatedAnimal = null;
        errorMessage = 'deleted card, feel free to create a new one.';
    }
  
    async function generateCard() {
        if (!newAnimalName) {
            errorMessage = 'please enter an animals name.';
            return;
        }
        isLoading = true; // Start Loader
        errorMessage = '';
        successMessage = '';
        await generateAnimalData(newAnimalName);
        isLoading = false; 
        newAnimalName = '';
    }
  </script>
  <div class="wrapper">
  <main>
    <div class="form-section">
        <h1 class="main-header">create your own <br> 
            animal card</h1>
            <div class="button-area">
                <input type="text" bind:value={newAnimalName} placeholder="type your animals name here" />
                <!-- <button id="generate" on:click={generateCard} disabled={isLoading}>
                    {#if isLoading}
                        <span class="loader"></span>
                    {/if}
                    {#if !isLoading}
                        generate
                    {/if}

                </button> -->
                <GenerateButton on:click={generateCard}/>
            </div>
        {#if errorMessage}
            <p class="error">{errorMessage}</p>
        {/if}
        {#if successMessage}
            <p class="success">{successMessage}</p>
        {/if}
        <Loader {isLoading}/>
    </div>
    {#if !generatedAnimal}
    <div class="card-placeholder">
        <p>your card will appear here</p>
    </div>
{/if}
  
    {#if generatedAnimal}
        <h2>your generated card:</h2>
        <Card animal={generatedAnimal} />
        <div class="button-section">
            <button class="delete" on:click={deleteGeneratedCard}>delete</button>
            <button class="add" on:click={addToCollection}>add to collection</button>
        </div>
    {/if}
  </main>
</div>

<Footer />
  
  <style>

.loader {
    border: 3px solid #f3f3f3; /* Light gray */
    border-top: 3px solid #C4191F; /* Blue */
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
    display: inline-block;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

button:disabled {
    opacity: 1;
    cursor: not-allowed;
}

.card-placeholder {
    width: 285px; /* Breite der Karte (380px) * 0.75 */
    height: 500px; /* Höhe der Karte (666px) * 0.75 */
    border: 3px dashed #7e7e7e;
    border-radius: 15px; /* Angepasst für kleinere Skalierung */
    margin: 20px auto; /* Platzierung in der Mitte mit reduziertem Margin */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7e7e7e;
    font-size: 16px; /* Schriftgröße für kleinere Platzhalter */
}

    .button-area {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .main-header {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 64px;
        line-height: 55px;
        color: #2C2A2D;
    }

    .wrapper {
        height: ma;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .form-section {
        flex: 1;
        flex-direction: column;
        margin-top: 100px;
        display: flex;
        gap: 10px;
        width: 100%;
        align-items: center;
        padding-bottom: 20px;
    }
    .button-section {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }
    input {
        padding: 10px;
        font-size: 16px;
        color: #2C2A2D;
        background-color: #E0E4DC;
        cursor: auto;
        border-style:solid;
        border: none;             
        border-bottom: 2px solid #7e7e7e;
        width: 270px;
    }

    input:focus {
    outline: none;  /* Entfernt den blauen Rahmen */
    border-bottom: 2px solid #C4191F;  /* Optional: Linie unten ändern */
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



    button {
        padding: 10px 20px;
        font-size: 16px;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .delete {
        background-color: #C4191F;
        font-size: 16;
        border-radius: 15px;
        padding: 12px 45px 12px 45px;
        border: #2C2A2D;
        border-style:solid;
        background-color: transparent;
        color: #2C2A2D;
        opacity: 0.6;
        transition: opacity 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    .delete:hover {
        opacity: 1;
    }
    .add {
    background-color: transparent;
    color: #C4191F;
    font-size: 16px;
    border-radius: 15px;
    padding: 12px 45px;
    border: 2px solid #C4191F;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.3s ease;
}

.add::before {
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

.add:hover::before {
    transform: translateX(0);
}

.add:hover {
    color: #E0E4DC;
    border-color: #C4191F;
}

    .error {
        color: #C4191F;
    }
    .success {
        color: #2C2A2D;
    }
  </style>
  