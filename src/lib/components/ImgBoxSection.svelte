<script>
	import { goto } from "$app/navigation";
	import PlayButton from "./PlayButton.svelte";
</script>

<div class="info-container">
    <div class="heading-section">
        <h1>welcome to the wild <br> world of quattera.</h1>
    </div>

    <div class="infocard-section">
        <div class="infocard">
            <div class="heading-area">
                <h3>generate your own cards</h3>
            </div>
            <div class="text-area">
                <p>
                    Discover the thrill of creating unique animal cards with ease! Simply enter the name of an animal,
                    and our AI will generate a card complete with stats, trivia, and a beautiful design. Perfect for
                    building your own custom collection or expanding the game universe.
                </p>
            </div>
        </div>

        <div class="infocard">
            <div class="heading-area">
                <h3>discover the game hub</h3>
            </div>
            <div class="text-area">
                <p>
                    Step into the fun with our interactive game hub! Play Memory to test your matching skills or
                    challenge yourself with classic card games like Quartett. Every game uses your custom cards,
                    creating a personalized and engaging experience every time.
                </p>
            </div>
        </div>

        <div class="infocard">
            <div class="heading-area">
                <h3>explore your animal collection</h3>
            </div>
            <div class="text-area">
                <p>
                    Discover and browse your personalized animal cards! The collection page lets you uncover fascinating details about both familiar and rare animals. Explore their unique traits, stats, and trivia in an organized and enjoyable way.
                </p>
            </div>
        </div>
    </div>
</div>
<div class="section-main">
    <PlayButton onclick={() => {
        goto("/play");
    }}/>
    <!-- <div>
            <a href="/play" class="game-card">
            <h2>to the gamehub</h2>
            </a>
    </div> -->


</div>
<style>
    * {
    font-family: Arial, Helvetica, sans-serif;
}




.section-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100vw;
    margin-top: 0px;
    margin-bottom: 0px; /* Abstand zwischen den Sektionen */

    background: url('../images/Background-Gamehub.jpg') no-repeat center center; /* Hintergrundbild hinzufügen */
    background-size: contain; /* Bild soll den gesamten Container ausfüllen */
    background-color: #E0E4DC;
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
  /* border: none; */
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
  /* z-index: 1;
  position: relative; */
}

.game-card > * {
  position: relative;
  z-index: 1; /* Text bleibt über der roten Farbe sichtbar */
}


    a {
      text-decoration: none;
      color: inherit;
    }



    .info-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    height: auto; /* Passt sich dem Inhalt an */
    align-items: center; /* Startet den Inhalt oben */
    justify-content: center; /* Positioniert den Inhalt oben */
}

.heading-section h1 {
    font-size: 96px;
    font-weight: 800;
    color: #2C2A2D;
    line-height: 90%;
    margin: 0;
    padding-top: 40px;
    padding-bottom: 100px;
    text-align: left; /* Links ausgerichtet */
}

.infocard-section {
    display: flex;
    flex-wrap: wrap; /* Ermöglicht den automatischen Umbruch in die nächste Zeile */
    gap: 50px; /* Abstand zwischen den Karten */
    justify-content: center; /* Zentriert die Karten innerhalb des Containers */
    padding: 20px;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 70px;
}

.infocard {
    flex: 1 1 calc(33.333% - 20px); /* Passt die Breite der Karten an: Ein Drittel bei drei Karten pro Reihe */
    max-width: 400px; /* Maximale Breite für jede Karte */
    min-width: 250px; /* Mindestbreite, bevor sie umbrechen */
    background-color: #E0E4DC; /* Heller Hintergrund für die Karten */
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    border-style: solid;
    border: none;
    border-left: 12px solid #C4191F;
}

.heading-area h3 {
    font-size: 32px;
    color: #2C2A2D;
    margin-bottom: 10px;
    text-align: left;
    margin-top: 0px;
}

.text-area p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    text-align: left;
    margin-bottom: 0px;
    text-transform: lowercase;
}


</style>
