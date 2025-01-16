<script>
    const games = [
      { name: "Memorie", path: "/play/memorie" },
      { name: "Trumpfquartett", path: "/play/trumpfquartett" },
      { name: "Quartett", path: "/play/quartett" }
    ];
  </script>
  
  <main>
    <div class="heading-section">
    <h1>game hub</h1>
  </div>
  <div class="game-grid">
    {#each games as game}
      <a href={game.path} class="game-card">
        <h2>{game.name}</h2>
      </a>
    {/each}
  </div>
  </main>
  
  <style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  height: 100vh; /* Nimmt die gesamte Höhe des Bildschirms ein */
  box-sizing: border-box; /* Stellt sicher, dass Padding berücksichtigt wird */
  padding-bottom: 10%;
}
    .game-grid {
      display: flex;
      gap: 50px;
      justify-content: center;
    }
    .game-card {
  width: 250px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f0; /* Heller Hintergrund */
  color: #2c2a2d; /* Dunkler Text */
  cursor: pointer;
  border-radius: 5px;
  position: relative; /* Für die Effekte */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden; /* Verhindert Überlauf der Animation */
  border-bottom: 10px solid #c4191f; /* Default rote Linie am unteren Rand */
  transition: color 0.3s ease; /* Sanfter Farbwechsel */
}

.game-card::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #c4191f;
  z-index: 0; /* Legt es hinter den Text */
  transform: translateY(100%); /* Startet außerhalb des Buttons */
  transition: transform 0.3s ease; /* Sanfter Übergang */
}

.game-card:hover::before {
  transform: translateY(0); /* Bewegt die rote Farbe nach oben */
}

.game-card:hover {
  color: #f5f5f0; /* Textfarbe beim Hover auf Weiß ändern */
}

.game-card > * {
  position: relative;
  z-index: 1; /* Text bleibt über der roten Farbe sichtbar */
}


    a {
      text-decoration: none;
      color: inherit;
    }

    .heading-section {
      display: flex;
      font-size: 64px;

    }
  </style>
  