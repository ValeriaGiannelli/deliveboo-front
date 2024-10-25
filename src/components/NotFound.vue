<script>
export default {
    name: "NotFound",
    mounted() {
      this.startDinoGame();
    },
    data() {
      return {
        isGameOver: false,
        isPaused: false,
        topScores: this.getTopScores()
      };
    },
    methods: {
      startDinoGame() {
        const canvas = this.$refs.gameCanvas;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 2;
  
        const groundHeight = 50;
        const dinoWidth = 50;
        const minObstacleGap = dinoWidth * 4.5;
        let dinoImg, obstacleImg, dino, obstacles, gameSpeed, score, scoreInterval;
  
        const initializeGame = () => {
          dinoImg = new Image();
          dinoImg.src = 'https://pngimg.com/d/burger_sandwich_PNG4135.png';
          dinoImg.onload = () => {
            console.log('Dino image loaded successfully');
            startGame();
          };
          dinoImg.onerror = () => {
            console.error('Failed to load dino image');
            dinoImg.src = 'https://via.placeholder.com/50x50/008000/FFFFFF?text=Dino';
          };
  
          obstacleImg = new Image();
          obstacleImg.src = 'https://opengameart.org/sites/default/files/styles/medium/public/RTS_Crate_0.png';
          obstacleImg.onload = () => {
            console.log('Obstacle image loaded successfully');
          };
          obstacleImg.onerror = () => {
            console.error('Failed to load obstacle image');
            obstacleImg.src = 'https://via.placeholder.com/30x30/FF0000/FFFFFF?text=Obstacle';
          };
        };
  
        const startGame = () => {
          dino = {
            x: 50,
            y: canvas.height - groundHeight - 50,
            width: dinoWidth,
            height: 50,
            dy: 0,
            gravity: 0.25,
            jumpHeight: -10,
            grounded: false
          };
  
          obstacles = [];
          gameSpeed = 5 / 3;
          score = 0;
  
          if (scoreInterval) {
            clearInterval(scoreInterval);
          }
  
          scoreInterval = setInterval(() => {
            score++;
          }, 1000);
  
          gameLoop();
        };
  
        const drawDino = () => {
          if (dinoImg.complete && dinoImg.naturalHeight !== 0) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(dinoImg, -dino.x - dino.width, dino.y, dino.width, dino.height);
            ctx.restore();
          } else {
            ctx.fillStyle = "green";
            ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
          }
        };
  
        const drawObstacles = () => {
          obstacles.forEach(obstacle => {
            if (obstacleImg.complete && obstacleImg.naturalHeight !== 0) {
              ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            } else {
              ctx.fillStyle = "red";
              ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
          });
        };
  
        const drawScore = () => {
          ctx.fillStyle = "black";
          ctx.font = "20px Arial";
          ctx.fillText(`Score: ${score}`, canvas.width - 120, 30);
          
          // Draw top scores
          ctx.fillText("Top Scores:", 10, 30);
          this.topScores.forEach((topScore, index) => {
            ctx.fillText(`${index + 1}. ${topScore}`, 10, 60 + index * 30);
          });
        };
  
        const createObstacle = () => {
          let lastObstacle = obstacles[obstacles.length - 1];
          if (!lastObstacle || (canvas.width - lastObstacle.x) >= minObstacleGap) {
            let obstacle = {
              x: canvas.width,
              y: canvas.height - groundHeight - 30,
              width: 30,
              height: 30
            };
            obstacles.push(obstacle);
          }
        };
  
        const updateObstacles = () => {
          obstacles.forEach(obstacle => {
            obstacle.x -= gameSpeed;
          });
  
          if (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0) {
            obstacles.shift();
          }
  
          if (Math.random() < 0.01) {
            createObstacle();
          }
        };
  
        const jump = () => {
          if (dino.grounded) {
            dino.dy = dino.jumpHeight;
            dino.grounded = false;
          }
        };
  
        const updateDino = () => {
          dino.y += dino.dy;
          dino.dy += dino.gravity;
  
          if (dino.y + dino.height >= canvas.height - groundHeight) {
            dino.y = canvas.height - groundHeight - dino.height;
            dino.grounded = true;
            dino.dy = 0;
          }
        };
  
        const checkCollision = () => {
          for (let obstacle of obstacles) {
            if (
              dino.x < obstacle.x + obstacle.width &&
              dino.x + dino.width > obstacle.x &&
              dino.y < obstacle.y + obstacle.height &&
              dino.y + dino.height > obstacle.y
            ) {
              // Collision detected
              this.isGameOver = true;
              this.updateTopScores(score);
              if (confirm(`Game Over! Il tuo punteggio è: ${score}. Torna a trovarci!`)) {
                setTimeout(() => {
                  window.location.reload(); // Ricarica la pagina dopo 1 secondo
                }, 50);
              } else {
                clearInterval(scoreInterval);
                return; // Uscita dal gioco
              }
            }
          }
        };
  
        const gameLoop = () => {
            if (this.isGameOver || this.isPaused) return; // Esci dal ciclo se il gioco è finito o in pausa

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawDino();
            drawObstacles();
            drawScore();
            updateObstacles();
            updateDino();
            checkCollision();
            requestAnimationFrame(gameLoop);
        };
  
        document.addEventListener('keydown', event => {
          if (event.code === 'Space') {
            event.preventDefault();
            jump();
          }
        });
  
        initializeGame();
      },
      getTopScores() {
        const scores = JSON.parse(localStorage.getItem('topScores')) || [];
        return scores.sort((a, b) => b - a).slice(0, 5);
      },
      updateTopScores(newScore) {
        let scores = JSON.parse(localStorage.getItem('topScores')) || [];
        scores.push(newScore);
        scores.sort((a, b) => b - a);
        scores = scores.slice(0, 5);
        localStorage.setItem('topScores', JSON.stringify(scores));
        this.topScores = scores;
      }
    },
    beforeRouteLeave(to, from, next) {
        this.isPaused = true; // Metti in pausa il gioco
        next();
    }
  };
</script>

<template>
    <section>
        <h2>PAGE NOT FOUND: ERROR 404</h2>
        <canvas id="dino-game" ref="gameCanvas"></canvas>
    </section>
</template>

<style scoped>
h2 {
    text-align: center;
}
#dino-game {
    display: block;
    margin: 0 auto;
    background: #f4f4f4;
  }
</style>

