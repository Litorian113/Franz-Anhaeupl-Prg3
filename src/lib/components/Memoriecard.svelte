<script>
    import { createEventDispatcher } from 'svelte';
    export let animal;
    export let isFlipped = false;
  
    // Farbzuordnung für Gruppen
    const groupColors = {
      A: "#FF5733",
      B: "#33A1FF",
      C: "#FFC300",
      D: "#C70039",
      E: "#6A1B9A",
      F: "#00B894"
    };
  
    // Dispatcher für Custom-Events
    const dispatch = createEventDispatcher();

    // Funktion zur Ersetzung von Umlauten
    function formatFilename(str) {
      return str
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/\s+/g, "-");
    }
  
    const groupColor = groupColors[animal.group] || "#6d6875";
  
    // Karte umdrehen und Event senden
    function flipCard() {
      dispatch('flip', { index: animal.id });
    }
  
    // Umdrehen mit Enter oder Leertaste
    function handleKeyPress(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        flipCard();
      }
    }
</script>

  
  <div class="card-wrapper">
    <div class="card-inner {isFlipped ? '' : 'flipped'}">

      
      <!-- Vorderseite der Karte -->
      <div class="card-front" on:click={flipCard} tabindex="0" role="button" on:keypress={handleKeyPress}>
        
        <div class="top-section">
          <div class="card-id" style="background-color: {groupColor};">
            <p>{animal.group} {animal.id}</p>
          </div>
          <div class="card-title">
            <p>{animal.name_german}</p>
          </div>
        </div>
  
        <div class="image-section">
          <img src={animal.imageUrl || `/images/${formatFilename(animal.name_german)}${animal.id < 10 ? `0${animal.id}` : animal.id}.webp`} 
            alt={animal.name_german} 
            class="img-respo" />
        </div>

  

      </div>
  
      <!-- Rückseite der Karte -->
      <div class="card-back" on:click={flipCard} tabindex="0" role="button" on:keypress={handleKeyPress}>
        <img src="/images/card-back.webp" alt="Kartenrückseite" class="img-back" />
      </div>
  
    </div>
  </div>
  
  <style>



    .card-wrapper {
      color: #fff;
      background: rgba(198, 198, 198, 0.07); /* halbtransparentes Weiß */
      width: 380px;
      height: 400px;
      perspective: 1000px;  /* Perspektive für Flip-Effekt */
      border-radius: 40px;
      /* transform: scale(0.5); */
    }
  
    .card-inner {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.6s;
      background-color: #181818;
      border-radius: 40px;
      border: 4px solid rgba(255, 255, 255, 0.035);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); 
    }
  
    .card-inner.flipped {
      transform: rotateY(180deg);
    }
  
    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 40px;
    }
  
    .card-front {
      background-color: #252525;
    }
  
    .card-back {
      background-color: #181818;
      transform: rotateY(180deg);
    }
  
    .img-back {
      width: 100%;
    height: 100%;
    object-fit: cover; /* Passt das Bild an, sodass es den Container vollständig ausfüllt */
    object-position: center;
    border-radius: 38px;
    }
  
    .image-section {
      width: 100%;
      height: 320px;
    }

    .img-respo {
      width: 100%;
    height: 100%;
    object-fit: cover; /* Passt das Bild an, sodass es den Container vollständig ausfüllt */
    object-position: center;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 38px;
    border-bottom-left-radius: 38px;
    }
  
    .top-section {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
  
    .card-id {
      flex: 1;
      /* padding-left: 20px; */
      border-radius: 38px 0px 0px 0px;
      font-size: 18px;
      padding-top: 10px;
      justify-content: center;
      align-items: center;
    }
  
    .card-title {
      text-align: center;
      flex: 5;
      background-color: #353535;
      border-radius: 0px 35px 0px 0px;
      font-size: 24px;
      font-weight: bold;
    }
  </style>
  