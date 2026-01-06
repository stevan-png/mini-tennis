document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('tennis');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const scoreElem = document.getElementById('score');
  const livesElem = document.getElementById('lives');
  const levelElem = document.getElementById('level');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let racketWidth = 90;  // plus petite
  let racketHeight = 12;
  let racketX = canvas.width/2 - racketWidth/2;

  let ballRadius = 6;
  let ballX = canvas.width/2;
  let ballY = canvas.height/2;
  let baseSpeed = 4;
  let dx = baseSpeed;
  let dy = -baseSpeed;

  let score = 0;
  let lives = 3;
  let level = 1;
  let gameOver = false;

  function drawRacket() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(racketX, canvas.height - racketHeight - 10, racketWidth, racketHeight);
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.closePath();
  }

  document.addEventListener("keydown", e => {
    if(e.key === "ArrowLeft") racketX -= 25;
    if(e.key === "ArrowRight") racketX += 25;
    if(racketX < 0) racketX = 0;
    if(racketX + racketWidth > canvas.width) racketX = canvas.width - racketWidth;
  });

  function resetBall() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    dy = -baseSpeed;
  }

  function updateLevel() {
    level = Math.floor(score/5)+1;
    levelElem.innerText = level;
    baseSpeed = 4 + (level-1);  // vitesse augmente chaque niveau
    dx = dx > 0 ? baseSpeed : -baseSpeed;
    dy = dy > 0 ? baseSpeed : -baseSpeed;
  }

  function draw() {
    if(gameOver) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawRacket();
    drawBall();

    ballX += dx;
    ballY += dy;

    if(ballX + ballRadius > canvas.width || ballX - ballRadius < 0) dx = -dx;
    if(ballY - ballRadius < 0) dy = -dy;

    if(ballY + ballRadius > canvas.height - racketHeight - 10 &&
       ballX > racketX && ballX < racketX + racketWidth) {
      dy = -dy;
      let hitPos = (ballX - racketX) / racketWidth;
      dx = (hitPos - 0.5) * 8;
      score++;
      scoreElem.innerText = score;
      updateLevel();
    }

    if(ballY + ballRadius > canvas.height) {
      lives--;
      livesElem.innerText = lives;
      if(lives <= 0){
        gameOver = true;
        status.innerText = "💥 Game Over !";
        restartBtn.style.display = "inline-block";
      } else {
        resetBall();
      }
    }

    requestAnimationFrame(draw);
  }

  restartBtn.addEventListener("click", () => {
    score = 0;
    lives = 3;
    level = 1;
    scoreElem.innerText = score;
    livesElem.innerText = lives;
    levelElem.innerText = level;
    status.innerText = "";
    gameOver = false;
    resetBall();
    draw();
  });

  draw();
});
