


<footer>
<div class="footer-section">
    <div class="footer-left-section">
        <ul class="bigFoot">
            <li>Impressum</li>
            <li>Datenschutz</li>
        </ul>
    </div>
    <div class="footer-right-section">
        <p>Copyright 2024</p>
    </div>
</div>
</footer>


<style>
    footer {
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgb(35, 35, 35);
    justify-content: center;
    align-items: center;
    border-top: 1px solid #fff;
    font-family: Helvetica, sans-serif;
    color: white;
}

.footer-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.footer-left-section {
    display: flex;
    flex-direction: row;
}

.footer-right-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.bigFoot {
    display: flex;
    gap: 20px;
    list-style-type: none; 
}


@media (max-width: 550px) {

    .footer-section {
        gap: 0px;
    }
}
</style>