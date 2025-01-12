

<div class="banner">

</div>


<style>
.banner {
    background-image: url('../images/stageCover.jpg'); /* Pfad zum Bild */
    background-repeat: no-repeat;
    background-size: cover; /* Deckt die gesamte Breite und Höhe ab, ohne Verzerrungen */
    background-position: center; /* Zentriert das Bild */
    width: 100%;
    height: 650px; /* Standardhöhe für das Banner */
}

@media (max-width: 768px) {
    .banner {
        height: 300px; /* Kleinere Höhe für mobile Geräte */
    }
}

@media (max-width: 480px) {
    .banner {
        height: 200px; /* Noch kleinere Höhe für sehr kleine Bildschirme */
    }
}
</style>
