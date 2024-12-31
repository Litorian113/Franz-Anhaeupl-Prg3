<script>
    import { onMount } from 'svelte';
    import { data } from '../../data/animalData.js';
    import Card from '$lib/components/Card.svelte';
  
    let newAnimalName = '';
    let generatedAnimal = null;
    let imageUrl = '';
    let errorMessage = '';
  
    // Platzhalterfunktion zur Generierung des Bildes
    async function generateImage(animalName) {
      console.log(`Bild für ${animalName} wird generiert...`);
      // Platzhalter: Ersetze dies mit API-Aufruf
      imageUrl = `/images/placeholder-${animalName}.webp`;
    }
  
    // Platzhalterfunktion zur Generierung des Datensatzes
    async function generateAnimalData(animalName) {
      console.log(`Tierdaten für ${animalName} werden generiert...`);
      // Platzhalter: Ersetze dies mit API-Aufruf
      generatedAnimal = {
        id: data.length + 1,
        name_german: animalName,
        trivia_german: `${animalName} ist ein faszinierendes Tier!`,
        trivia: `${animalName} is a fascinating animal!`,
        group: "F",
        groupname_german: "Neue Tiere",
        groupname: "New Animals",
        group_number: 5,
        name: animalName,
        max_weight: Math.floor(Math.random() * 500),
        max_age: Math.floor(Math.random() * 100),
        top_speed: Math.floor(Math.random() * 70),
        deaths: Math.floor(Math.random() * 50),
        max_length: Math.floor(Math.random() * 400),
        litter_size: Math.floor(Math.random() * 10),
        continents: "Global",
        intelligence: Math.floor(Math.random() * 10)
      };
  
      data.push(generatedAnimal);
    }
  
    async function generateCard() {
      if (!newAnimalName) {
        errorMessage = 'Bitte gib einen Tiernamen ein';
        return;
      }
  
      errorMessage = '';
      await generateImage(newAnimalName);
      await generateAnimalData(newAnimalName);
  
      newAnimalName = '';
    }
  
    function formatFilename(str) {
      return str
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\s+/g, '-');
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
    </div>
  
    {#if generatedAnimal}
      <h2>Deine generierte Karte:</h2>
      <Card animal={generatedAnimal} />

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
    input {
      padding: 10px;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #2a9d8f;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .error {
      color: red;
    }
  </style>
  