<script>
    import { onMount } from 'svelte';

    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = Array(8).fill(null); // Array to track if answers are correct
    let playerName = '';
    let showQuiz = false;
    let showLeaderboard = false;
    let elapsedTime = 0;
    let timer;
    let leaderboard = [];

    // Funktion zum Dekodieren von HTML-Zeichen
    function decodeHtmlEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    // Fetch questions from the Open Trivia API
    async function loadQuestions() {
        try {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=8&category=27&type=multiple'
            );
            const data = await response.json();
            questions = data.results.map((q) => ({
                question: decodeHtmlEntities(q.question), // Frage dekodieren
                correctAnswer: decodeHtmlEntities(q.correct_answer), // Richtige Antwort dekodieren
                answers: [...q.incorrect_answers.map(decodeHtmlEntities), decodeHtmlEntities(q.correct_answer)]
                    .sort(() => Math.random() - 0.5), // Antworten dekodieren und mischen
            }));
        } catch (error) {
            console.error('Error loading questions:', error);
            alert('Failed to load questions. Please try again later.');
        }
    }

    // Start the timer
    function startTimer() {
        timer = setInterval(() => {
            elapsedTime++;
        }, 1000);
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Check the selected answer
    function checkAnswer(answer) {
        userAnswers[currentQuestionIndex] = answer === questions[currentQuestionIndex].correctAnswer;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        } else {
            finishQuiz();
        }
    }

    // Finish the quiz
    async function finishQuiz() {
        stopTimer();
        showQuiz = false;
        showLeaderboard = true;

        const correctAnswers = userAnswers.filter((answer) => answer === true).length;

        if (playerName.trim() === '') {
            playerName = 'Anonymous'; // Fallback, falls kein Name eingegeben wurde
        }

        // Save the player's result to the database
        try {
            const response = await fetch('/api/quizHighscores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerName,
                    correctAnswers,
                    elapsedTime,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save highscore');
            }

            // Fetch the updated leaderboard
            const leaderboardResponse = await fetch('/api/quizHighscores');
            leaderboard = await leaderboardResponse.json();
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    }

    // Restart the quiz
    function restartQuiz() {
        // Quiz-Variablen zurücksetzen
        currentQuestionIndex = 0;
        userAnswers = Array(8).fill(null);
        elapsedTime = 0;
        showQuiz = false; // Zeigt die Startansicht mit der Namenseingabe erneut
        showLeaderboard = false;
        playerName = ''; // Spielername löschen

        // Neue Fragen laden
        loadQuestions();
    }

    // Start the quiz
    function startQuiz() {
        currentQuestionIndex = 0;
        userAnswers = Array(8).fill(null);
        elapsedTime = 0;
        startTimer();
        showQuiz = true;
        showLeaderboard = false;
    }

    onMount(loadQuestions);
</script>

{#if !showQuiz && !showLeaderboard}
<div class="start-screen">
    <h1 class="main-header">welcome to <br> the quiz</h1>
    <div class="gameStart">
    <input type="text" placeholder="enter your name" bind:value={playerName} />
    <button id="generate" on:click={startQuiz} disabled={!playerName}>start game</button>
</div>
</div>
{/if}

{#if showQuiz}
<div class="quiz">
    <h2>{questions[currentQuestionIndex].question}</h2>
    <div class="answers">
        {#each questions[currentQuestionIndex].answers as answer}
        <button on:click={() => checkAnswer(answer)}>{answer}</button>
        {/each}
    </div>
    <div class="progress">
        {#each userAnswers as answer, index}
        <div
            class="circle"
            class:selected={index === currentQuestionIndex}
            class:correct={answer === true}
            class:incorrect={answer === false}
        ></div>
        {/each}
    </div>
</div>
{/if}

{#if showLeaderboard}
<div class="results">
    <h1 id="quizresults">quiz results</h1>
    <p id="output">you scored {userAnswers.filter((answer) => answer === true).length} out of 8 in {elapsedTime} seconds!</p>
    <h2>leaderboard</h2>
    <ul>
        {#each leaderboard as player}
        <div class="format">
        <li id="left">
            {player.playerName}:
        </li>
        <li id="middle">
            {player.correctAnswers} correct
        </li>
        <li id="right">
            Time: {player.elapsedTime}
        </li>
    </div>
        {/each}
    </ul>
    <div>
    <button on:click={() => window.location.href = '/play'}>back to hub</button>
    <button on:click={restartQuiz}>restart quiz</button>
    </div>
</div>
{/if}

  <style>
 
    #left {
        text-align: left;
        width: 100px;
    }
    #middle {
 
        width: 100px;
    }
    #right {
        width: 100px;
        text-align: left;
        padding-left: 40px;
    }
    .format {
        display: flex;
        flex-direction: row;
        gap: 20px;
        padding-left: 40px;
        
    }

    #output {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 32px;
    }
    #quizresults {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 64px;
    }

.quiz, .results, .start-screen {
    background-image: url('../images/BGQIUZ.png'); /* Pfad zum Bild */
    background-repeat: no-repeat;
    background-size: cover; /* Deckt die gesamte Breite und Höhe ab, ohne Verzerrungen */
    background-position: center; /* Zentriert das Bild */
}

.start-screen {
    opacity: 0;
    animation: fadeIn 1.5s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

 .main-header {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        font-size: 64px;
        line-height: 55px;
        color: #2C2A2D;
        text-align: left;
        padding-bottom: 30px;
        padding-right: 110px;
    }

    .gameStart {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    #generate {
    padding: 12px 45px;
    font-size: 16px;
    color: #C4191F;
    border: 2px solid #C4191F;
    border-radius: 15px;
    cursor: pointer;
    /* background-color: #E0E4DC; */
    background-image: url('../images/stageCover.jpg'); /* Pfad zum Bild */
    background-repeat: no-repeat;
    background-size: cover; /* Deckt die gesamte Breite und Höhe ab, ohne Verzerrungen */
    background-position: center; /* Zentriert das Bild */
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.3s ease;
}

#generate::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #C4191F;
    z-index: -1;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

#generate:hover::before {
    transform: translateX(0);
}

#generate:hover {
    color: #E0E4DC;
    border-color: #C4191F;
}
#generate:disabled {
    background: #ccc;
    color: #555555;
    cursor: not-allowed;
    border: 2px solid #ccc;
    position: relative;
}

#generate:disabled::before {
    content: none; /* Entfernt die Animation */
}

#generate:disabled:hover {
    cursor: not-allowed;
}




    /* Centering the content */
    .start-screen, .quiz, .results {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
  
    input {
        padding: 10px;
        font-size: 16px;
        color: #2C2A2D;
        background-color: #E0E4DC;
        cursor: auto;
        border-style:solid;
        border: none;             
        border-bottom: 2px solid #7e7e7e;
        width: 270px;
    }

    input:focus {
    outline: none;  /* Entfernt den blauen Rahmen */
    border-bottom: 2px solid #C4191F;  /* Optional: Linie unten ändern */
    }
  
    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      background: #c4191f;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  
    .answers {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }
  
    button:hover {
      background: #a3161a;
    }
  
    .progress {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
  
    .circle {
      width: 20px;
      height: 20px;
      border: 2px solid #c3c1c1;
      border-radius: 50%;
      background: transparent;
      transition: background 0.3s, border-color 0.3s;
    }
  
    .circle.selected {
      border-color: #000000;
    }
  
    .circle.correct {
      background: #4caf50;
      border-color: #4caf50;
    }
  
    .circle.incorrect {
      background: transparent;
      background: #f44336;
      border-color: #f44336;
    }
  
    ul {
      list-style: none;
      padding: 0;
    }
  
    li {
      font-size: 18px;
      margin: 5px 0;
    }
  </style>
  