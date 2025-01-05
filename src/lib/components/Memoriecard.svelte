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
            <p>id.{animal.id}</p>
          </div>
          <div class="card-title">
            <p>{animal.name_german}</p>
          </div>
        </div>
  
        <div class="image-section">
          <img src="/images/{formatFilename(animal.name_german)}{animal.id < 10 ? `0${animal.id}` : animal.id}.webp" 
               alt={animal.name} 
               class="img-respo" />
        </div>

        <div class="trivia-section">
          <p class="trivia-style">{animal.trivia_german}</p>
        </div>
  
        <div class="main-section">
          <div class="left-main-section">
            <div class="attribute-section">
              <div class="icon weight">
                <img src="/vectors/icon-weight.svg" class="scaleLOL" alt="Gewicht Icon" />
              </div>
              <div class="value weight">
                <p class="value-text">{animal.max_weight} kg</p>
              </div>
            </div>
            <div class="attribute-section">
              <div class="icon age">
                <img src="/vectors/icon-stregth.svg" class="scaleLOL" alt="Alter Icon" />
              </div>
              <div class="value age">
                <p class="value-text">{animal.max_age} Jahre</p>
              </div>
            </div>
            <div class="attribute-section">
              <div class="icon speed">
                <img src="/vectors/icon-speed.svg" class="scaleLOL" alt="Geschwindigkeit Icon" />
              </div>
              <div class="value speed">
                <p class="value-text">{animal.top_speed} km/h</p>
              </div>
            </div>
          </div>
  
          <div class="right-main-section">
            <div class="attribute-section">
              <div class="icon length">
                <img src="/vectors/icon-size.svg" class="scaleLOL" alt="Länge Icon" />
              </div>
              <div class="value length">
                <p class="value-text">{animal.max_length} cm</p>
              </div>
            </div>
            <div class="attribute-section">
              <div class="icon death">
                <img src="/vectors/icon-death.svg" class="scaleLOL" alt="Todesfälle Icon" />
              </div>
              <div class="value death">
                <p class="value-text">{animal.deaths}</p>
              </div>
            </div>
            <div class="attribute-section">
              <div class="icon intelligence">
                <img src="/vectors/icon-intelligence.svg" class="scaleLOL" alt="Intelligenz Icon" />
              </div>
              <div class="value intelligence">
                <p class="value-text">{animal.intelligence}/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Rückseite der Karte -->
      <div class="card-back" on:click={flipCard}>
        <img src="/images/card-back.webp" alt="Kartenrückseite" class="img-back" />
      </div>
  
    </div>
  </div>
  
  <style>

.trivia-section {
    display: flex;
    border-top: 1px solid #fff;
    margin-top: -5px;
    background-color: #353535;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    width: 100%;
  }

  .trivia-style {
    font-style: italic;
    text-align: center;
    font-weight: 300;
    line-height: 1.4;
    margin: 0;
  }
    .card-wrapper {
      color: #fff;
      background: rgba(198, 198, 198, 0.07); /* halbtransparentes Weiß */
      width: 380px;
      height: 666px;
      perspective: 1000px;  /* Perspektive für Flip-Effekt */
      border-radius: 40px;
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
      max-width: 380px;
      height: auto;
      border-radius: 38px;
    }
  
    .image-section {
      width: 100%;
      height: 320px;
    }

    .img-respo {
      width: 100%;
    max-width: 380px;
    height: auto;
    max-height: 320px;
    object-fit: fill;
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
  
    .main-section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 90%;
    }
  
    .left-main-section {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  
    .right-main-section {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  
    .attribute-section {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 5px 0;
      border-radius: 40px;
      transition: none;  /* Kein Hover-Effekt */
    }
  
    .icon {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      background-color: rgba(72, 72, 72, 0.236);
      margin: 5px;
      border-radius: 100px;
    }
  
    .icon img {
      width: 30px;
    }
  
    .value {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }
  
    .value-text {
      margin-left: 10px;
      font-size: 16px;
    }
  
    .trivia-section {
      display: flex;
      border-top: 1px solid #fff;
      margin-top: -5px;
      background-color: #353535;
      justify-content: center;
      align-items: center;
    }
  
    .trivia-style {
      font-style: italic;
      font-weight: 100;
      text-align: center;
      margin: 18px;
      font-size: 16px;
    }
  </style>
  