document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('tennis');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const scoreElem = document.getElementById('score');
  const livesElem = document.getElementById('lives');
  const levelElem = document.getElementById('level');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let racketWidth = 100;
  let racketHeight = 12;
  let racketX = canvas.width/2 - racketWidth/2;

  let ballRadius = 10;
  let ballX = canvas.width/2;
  let ballY = canvas.height/2;
  let baseSpeed = 5; // légèrement plus rapide
  let dx = baseSpeed;
  let dy = -baseSpeed;

  let score = 0;
  let lives = 3;
  let level = 1;
  let gameOver = false;

  const obstacles = [];
  const obstacleWidth = 15;  // plus petits
  const obstacleHeight = 15; // plus petits

  function drawRacket() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(racketX, canvas.height - racketHeight - 10
