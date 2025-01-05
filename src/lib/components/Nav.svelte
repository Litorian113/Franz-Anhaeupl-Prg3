


<nav>
    <div id="content-wrapper">
    <div class="nav-left">
	    <a href="/">Home</a>
	    <a href="/collection">Collection</a>
        <a href="/generate">Generate</a>
        <a href="/test">test</a>
    </div>
    <div class="nav-right">
        <p>|</p>
        <a href="/play">Play</a>
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
        display: flex;
        background-color: #000000a0;
        margin: auto;
        padding: 0px;
        color: white;
        font-size: 25px;
        align-items: center;
        position: fixed;
        width: 100%;
        z-index: 3;

        
    }
    a {
        color: white;
        text-decoration: none;
    }

    .nav-left {
        display: flex;
        flex: 1;
        gap: 30px;
    }

    .nav-right {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
</style>