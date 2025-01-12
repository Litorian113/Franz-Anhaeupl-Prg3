<script>


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

<style>
    * {
    font-family: Arial, Helvetica, sans-serif;
}


.info-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Abstand zwischen der Überschrift und den Karten */
    padding: 20px;
}

.heading-section h1 {
    font-size: 96px;
    font-weight: 800;
    color: #2C2A2D;
    line-height: 90%;
    margin: 0;
    padding-left: 6%;
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
    color: #C4191F;
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
