


<nav>
    <div id="content-wrapper">
    <div class="nav-left">
	    <a href="/">home</a>
	    <a href="/collection">collection</a>
        <a href="/generate">generate</a>
    </div>
    <div class="nav-right">
        <p>|</p>
        <a href="/play">play</a>
    </div>
</div>
</nav>


<style>

    #content-wrapper {
        padding-left: 50px;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        gap: 100px;
        height: 80px;
        
    }

    nav {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 22px;
    display: flex;
    margin: auto;
    padding: 0px;
    align-items: center;
    position: fixed;
    width: 100%;
    background-color: rgba(224, 228, 220, 1);   /* 30% Transparenz */
    z-index: 3;
    background: linear-gradient(to bottom, #E0E4DC, transparent);
    /* box-shadow: 0 10px 8px rgba(224, 228, 220, 0.7);   */
}
a {
    text-decoration: none;
    color: #2C2A2D; /* Standard: Schwarz */
    position: relative;
    font-size: 22px;
    font-weight: 600;
    transition: color 0.3s ease; /* Animiert die Textfarbe */
}

a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px; /* Abstand unter dem Text */
    width: 0;
    height: 4px;
    background-color: #C4191F; /* Rote Linie */
    transition: width 0.3s ease; /* Animiert die Breite der Linie */
}


a:hover::after {
    width: 100%; /* Linie breitet sich über die gesamte Breite des Links aus */
}


    .nav-left {
        display: flex;
        flex: 1;
        gap: 40px;
        color: #2C2A2D;
    }

    .nav-right {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: #C4191F;
    }

    @media (max-width: 768px) {
    nav {
        font-size: 18px; /* Reduce font size for navigation */
    }

    a {
        font-size: 18px; /* Reduce link font size */
    }

    .burger-menu {
        font-size: 26px; /* Slightly adjust the burger icon size */
    }
}
</style>