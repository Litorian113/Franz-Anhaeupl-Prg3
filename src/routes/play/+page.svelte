<script>
    const games = [
      { name: "Memorie", path: "/play/memorie" },
      { name: "Trumpfquartett", path: "/play/trumpfquartett" },
      { name: "Quartett", path: "/play/quartett" }
    ];
  </script>
  
  <main>
    <h1>Spiele Hub</h1>
    <div class="game-grid">
      {#each games as game}
        <div class="game-card">
          <a href={game.path}>
            <h2>{game.name}</h2>
          </a>
        </div>
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
    }
    .game-grid {
      display: flex;
      gap: 20px;
      justify-content: center;
    }
    .game-card {
      width: 300px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #333;
      color: white;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .game-card:hover {
      transform: scale(1.05);
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  </style>
  