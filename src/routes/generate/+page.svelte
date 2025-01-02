<script>
  import { onMount } from 'svelte';
  import { data } from '../../data/animalData.js';
  import Card from '$lib/components/Card.svelte';
  import OpenAI from "openai";

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
  });

  let newAnimalName = '';
  let generatedAnimal = null;
  let errorMessage = '';
  let successMessage = '';

  async function generateAnimalData(animalName) {
      try {
          console.log(`Tierdaten für ${animalName} werden generiert...`);

          const completion = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                  {
                      role: "user",
                      content: `Erstelle eine kurze Beschreibung und passende Werte für das Tier '${animalName}'.
                      Das Ergebnis muss im JSON-Format mit den Feldern sein:
                      {
                          "name_german": "Tiername auf Deutsch",
                          "trivia_german": "Kurze Trivia (maximal 120 Zeichen)",
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

          animalData.trivia_german = animalData.trivia_german.substring(0, 120);

          const nextId = data.length + 1;
          const lastGroup = data.length > 0 ? data[data.length - 1].group : "A";
          const nextGroup = determineNextGroup(lastGroup, nextId);

          generatedAnimal = {
              id: nextId,
              ...animalData,
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

  function determineNextGroup(lastGroup, nextId) {
      const groupLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lastGroupIndex = groupLetters.indexOf(lastGroup);

      if (nextId % 4 === 1) {
          return groupLetters[lastGroupIndex + 1] || "A";
      }
      return lastGroup;
  }

  async function generateCard() {
      if (!newAnimalName) {
          errorMessage = 'Bitte gib einen Tiernamen ein';
          return;
      }

      errorMessage = '';
      successMessage = '';
      await generateAnimalData(newAnimalName);
      newAnimalName = '';
  }

  function addToCollection() {
      if (generatedAnimal) {
          data.push(generatedAnimal);
          successMessage = `${generatedAnimal.name_german} wurde zur Kollektion hinzugefügt!`;
          generatedAnimal = null;
      }
  }

  function deleteGeneratedCard() {
      generatedAnimal = null;
      errorMessage = 'Die generierte Karte wurde gelöscht. Erstelle eine neue Karte!';
  }
</script>

<main>
  <h1>Erstelle eine neue Tierkarte</h1>
  <div class="form-section">
      <input type="text" bind:value={newAnimalName} placeholder="Tiername eingeben..." />
      <button on:click={generateCard}>Karte generieren</button>
      {#if errorMessage}
          <p class="error">{errorMessage}</p>
      {/if}
      {#if successMessage}
          <p class="success">{successMessage}</p>
      {/if}
  </div>

  {#if generatedAnimal}
      <h2>Deine generierte Karte:</h2>
      <Card animal={generatedAnimal} />
      <div class="button-section">
          <button class="delete" on:click={deleteGeneratedCard}>Löschen</button>
          <button class="add" on:click={addToCollection}>Hinzufügen zur Kollektion</button>
      </div>
  {/if}
</main>

<style>
  main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
  }
  .form-section {
      margin: 20px 0;
      display: flex;
      gap: 10px;
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
      background-color: #e63946;
  }
  .add {
      background-color: #2a9d8f;
  }
  .error {
      color: red;
  }
  .success {
      color: green;
  }
</style>
