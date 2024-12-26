<!-- <script>
    import { imageMap } from '../../data/imageMap.js';
    export let animal;
  
    // Bildpfad dynamisch basierend auf der Zuordnungsliste laden
    let imagePath = imageMap[animal.name_german] || '/images/fallback.webp';
  </script>
  
  <div class="card-wrapper" data-group={animal.groupname}>
    <div class="top-section">
      <div class="card-id">
        <p>id.{animal.id}</p>
      </div>
      <div class="card-title">
        <p>{animal.name_german}</p>
      </div>
    </div>
  
    <div class="image-section">
      <img
        src={imagePath}
        alt={animal.name}
        class="img-respo"
      />
    </div>
  
    <div class="trivia-section">
      <p class="trivia-style">{animal.trivia_german}</p>
    </div>
  
    <div class="main-section">
      <div class="left-main-section">
        <div class="attribute-section">
          <div class="icon weight">
            <img src="/images/icon-weight.svg" class="scaleLOL" alt="Weight Icon" />
          </div>
          <div class="value weight">
            <p class="value-text">{animal.max_weight} kg</p>
          </div>
        </div>
        <div class="attribute-section">
          <div class="icon age">
            <img src="/images/icon-stregth.svg" class="scaleLOL" alt="Age Icon" />
          </div>
          <div class="value age">
            <p class="value-text">{animal.max_age} Jahre</p>
          </div>
        </div>
        <div class="attribute-section">
          <div class="icon speed">
            <img src="/images/icon-speed.svg" class="scaleLOL" alt="Speed Icon" />
          </div>
          <div class="value speed">
            <p class="value-text">{animal.top_speed} km/h</p>
          </div>
        </div>
      </div>
  
      <div class="right-main-section">
        <div class="attribute-section">
          <div class="icon length">
            <img src="/images/icon-size.svg" class="scaleLOL" alt="Size Icon" />
          </div>
          <div class="value length">
            <p class="value-text">{animal.max_length} cm</p>
          </div>
        </div>
        <div class="attribute-section">
          <div class="icon death">
            <img src="/images/icon-death.svg" class="scaleLOL" alt="Death Icon" />
          </div>
          <div class="value death">
            <p class="value-text">{animal.deaths}</p>
          </div>
        </div>
        <div class="attribute-section">
          <div class="icon intelligence">
            <img src="/images/icon-intelligence.svg" class="scaleLOL" alt="Intelligence Icon" />
          </div>
          <div class="value intelligence">
            <p class="value-text">{animal.intelligence}/10</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
  :root {
      --dark-color: #181818;
      --background-color: rgb(255, 255, 255);  
  }
  
  @font-face {
      font-family: 'Jedi';
      src: local('Jedi'), url('../fonts/Starjedi.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
  }
  
  * {
      box-sizing: border-box;
  }
  body {
      margin: 0;
      font-family: 'Jedi', sans-serif;
      background-color: #181818;
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
      font-family: Helvetica, sans-serif;
      font-style: italic;
      font-weight: 100;
      text-align: center;
      margin: 18px;
  }
  
  .card-wrapper {
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      color: #fff;
      background: rgba(198, 198, 198, 0.07);
      border: 4px solid rgba(255, 255, 255, 0.035);
      border-radius: 40px;
      width: 380px;
      height: 666px;
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
  
  .attribute-section:hover {
      background-color: rgba(200, 200, 200, 0.15);
      cursor: pointer;
      border-radius: 40px;
  }
  </style>
   -->