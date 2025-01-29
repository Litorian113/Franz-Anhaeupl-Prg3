


<footer>
<div class="footer-section">
    <div class="footer-left-section">
        <ul class="bigFoot">
            <li>franz anhäupl</li>
            <li>programmieren 3</li>
        </ul>
    </div>
    <div class="footer-right-section">
        <p>wise 2025</p>
    </div>
</div>
</footer>


<style>
    footer {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #E0E4DC;
    justify-content: center;
    align-items: center;
    color: white;
    border-top: 3px solid #2C2A2D;
    margin-top: 70px;
}

.footer-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    font-size: 16px;
    font-weight: 600;
    color: #2C2A2D;

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