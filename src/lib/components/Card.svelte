<script>
  export let animal;

  // Farbzuordnung für Gruppen
  const groupColors = {
    A: "#FF5733",  // Rot
    B: "#33A1FF",  // Orange
    C: "#FFC300",  // Grün
    D: "#C70039",  // Dunkelblau
    E: "#6A1B9A",   // Gelb
    F: "#00B894",   // Gelb
    G: "#D84315",   // Gelb
    H: "#1E88E5",   // Gelb
    I: "#8BC34A",   // Gelb
    J: "#E91E63",   // Gelb
    K: "#FF6F61",   // Gelb
    L: "#3F51B5",   // Gelb
    M: "#F4A460"   // Gelb
  };

    // Funktion zur Ersetzung von Umlauten
    function formatFilename(str) {
    return str
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/\s+/g, "-"); // Ersetzt Leerzeichen durch Bindestriche
  }

  // Fallback, falls keine passende Gruppe gefunden wird
  const groupColor = groupColors[animal.group] || "#6d6875";



  async function deleteCard() {
    const response = await fetch(`/api/cards/${animal._id}`, {
    method: 'DELETE'
    });


      if (response.ok) {
          console.log('Karte erfolgreich gelöscht');
          location.reload();  // Aktualisiert die Seite nach dem Löschen
      } else {
          console.error('Fehler beim Löschen der Karte');
      }
  }
</script>

<div class="card-wrapper">
  <div class="top-section">
    <div class="card-id" style="background-color: {groupColor};">
      <p>id.{animal.id}</p>
    </div>
    <div class="card-title">
      <p>{animal.name_german}</p>
    </div>
  </div>

  <div class="image-section">
    <img src="/images/{formatFilename(animal.name_german)}{animal.id < 10 ? `0${animal.id}` : animal.id}.webp" alt={animal.name} class="img-respo" />
  <div class="trivia-section">
    <p class="trivia-style">{animal.trivia_german}</p>
  </div>

  <div class="main-section">
    <div class="left-main-section">
      <div class="attribute-section">
        <div class="icon weight">
          <img src="/vectors/icon-weight.svg" class="scaleLOL" alt="Weight Icon" />
        </div>
        <div class="value weight">
          <p class="value-text">{animal.max_weight} kg</p>
        </div>
      </div>

      <div class="attribute-section">
        <div class="icon age">
          <img src="/vectors/icon-stregth.svg" class="scaleLOL" alt="Age Icon" />
        </div>
        <div class="value age">
          <p class="value-text">{animal.max_age} Jahre</p>
        </div>
      </div>

      <div class="attribute-section">
        <div class="icon speed">
          <img src="/vectors/icon-speed.svg" class="scaleLOL" alt="Speed Icon" />
        </div>
        <div class="value speed">
          <p class="value-text">{animal.top_speed} km/h</p>
        </div>
      </div>
    </div>

    <div class="right-main-section">
      <div class="attribute-section">
        <div class="icon length">
          <img src="/vectors/icon-size.svg" class="scaleLOL" alt="Size Icon" />
        </div>
        <div class="value length">
          <p class="value-text">{animal.max_length} cm</p>
        </div>
      </div>

      <div class="attribute-section">
        <div class="icon death">
          <img src="/vectors/icon-death.svg" class="scaleLOL" alt="Death Icon" />
        </div>
        <div class="value death">
          <p class="value-text">{animal.deaths}</p>
        </div>
      </div>

      <div class="attribute-section">
        <div class="icon intelligence">
          <img src="/vectors/icon-intelligence.svg" class="scaleLOL" alt="Intelligence Icon" />
        </div>
        <div class="value intelligence">
          <p class="value-text">{animal.intelligence}/10</p>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- Löschen-Button -->
  {#if animal.isCustom}
    <div class="delete-button">
      <button on:click={deleteCard}>Karte löschen</button>
    </div>
  {/if}
</div>




<style>

.delete-button {
    margin-top: 15px;
    text-align: center;
  }
  .delete-button button {
    background-color: #e63946;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }


:root {
    --dark-color: #181818;
    --background-color:rgb(255, 255, 255);  
}



* {
    box-sizing: border-box;
}


p {
    font-size: 18px;
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


}

.card-wrapper {
    backdrop-filter: blur(10px); /* Weichzeichner-Effekt */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    color: #fff;
    background: rgba(198, 198, 198, 0.07); /* halbtransparentes Weiß */
    border: 4px solid rgba(255, 255, 255, 0.035); /* leichter Rand */
    border-radius: 40px;
    width: 380px;
    height: 666px;
    background-color: #181818;
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

}

.card-id {
 flex: 1;
 padding-left: 20px;
 border-radius: 38px 0px 0px 0px;
}

.card-title {
    text-align: center;
    flex: 5;
    background-color: #353535;
    border-radius: 0px 35px 0px 0px;

}

.main-section {
    display: flex;
    flex-direction: row;
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
}

.value {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
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

.scaleLOL {
    scale: 2;
}

.attribute-section {
    display: flex;
    flex-direction: row;
    transition: background-color 0.3s ease; /* Sanfter Übergang bei Hover */
    border-radius: 40px;
}

/* Hover-Effekt für die Eigenschaften-Divs */
.attribute-section:hover {
    background-color: rgba(200, 200, 200, 0.15); /* Hellgrauer Hintergrund bei Hover */
    cursor: pointer; /* Zeigt einen Zeiger-Cursor für Interaktivität */
    border-radius: 40px;
}


</style>