<script>
    import { onMount } from 'svelte';

    let highscores = {
        memoryGame: [],
        guessGame: [],
        quizGame: []
    };

    async function fetchHighscores() {
        try {
            const [memoryRes, guessRes, quizRes] = await Promise.all([
                fetch('/api/highscores'),
                fetch('/api/guessHighscore'),
                fetch('/api/quizHighscores')
            ]);

            highscores.guessGame = await guessRes.json();
            highscores.memoryGame = await memoryRes.json();
            highscores.quizGame = await quizRes.json();
        } catch (error) {
            console.error('Error loading high scores:', error);
        }
    }

    onMount(() => {
        fetchHighscores();
    });
</script>

<div class="highscore-section">
    <h2>🏆 game leaderboards</h2>
    <div class="sectionHigh">
    <div class="highscore-grid">
        <div class="card">
            <div class="card-content">
              <p class="card-title">memory
              </p>           <ul>
                {#each highscores.memoryGame as score}
                    <li>{score.playerName} - {score.elapsedTime}s</li>
                {/each}
            </ul>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <p class="card-title">guess me
              </p>           <ul>
                {#each highscores.guessGame as score}
                    <li>{score.playerName} - {score.elapsedTime}s</li>
                {/each}
            </ul>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <p class="card-title">quiz
              </p>           <ul>
                {#each highscores.quizGame as score}
                    <li>{score.playerName} - {score.elapsedTime}s</li>
                {/each}
            </ul>
            </div>
          </div>
     
       
    </div>
</div>
</div>

<style>
    .sectionHigh {
        height: auto;
        display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 5px;
    }

    .highscore-section {
        width: 100%;
        /* height: 70vh; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        padding-bottom: 4em;
    }

    .highscore-section h2 {
        margin-bottom: 20px;
        text-align: center;
    }

    .highscore-grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        max-width: 1200px;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 20px;
    }

    /* .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 5px;
    justify-items: center;
    margin-top: 100px;
  } */

    /* From Uiverse.io by gharsh11032000 */ 
.card {
  width: 300px;
  height: 400px;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #83322B 0%, #E23626 46%, #C4191F 100%);
  border-radius: 8px;
  color: white;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  cursor: pointer;
}
h2 {
    padding-bottom: 2em;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 32px;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* height: 100%; */
}

.card-content .card-title {
    font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: inherit;
  /* text-transform: uppercase; */
}

li {
    list-style-type: none;
    text-align: left;
    align-items: center;
    padding-right: 3em;
    line-height: 1.5em;
}

.card:hover {
  transform: rotateY(10deg) rotateX(10deg) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  z-index: 1;
}

.card:hover:before {
  transform: translateX(-100%);
}

.card:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  z-index: 1;
}

.card:hover:after {
  transform: translateX(100%);
}






</style>
