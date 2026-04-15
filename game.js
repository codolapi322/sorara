const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreDisplay = document.getElementById("score");

let playerImg = new Image();
let enemyImg = new Image();

let imagesLoaded = 0;

playerImg.onload = checkLoaded;
enemyImg.onload = checkLoaded;

playerImg.src = "Player.png";
enemyImg.src = "enemy.png";

function checkLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 2) {
    console.log("画像読み込み完了！");
  }
}


let player = { x: 200, y: 550, w: 40, h: 40, speed: 5 };
let enemy = { x: Math.random() * 360, y: -40, w: 40, h: 40, speed: 3 };
let score = 0;
let gameOver = false;
let gameRunning = false;

let left = false, right = false;
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") left = true;
  if (e.key === "ArrowRight") right = true;
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") left = false;
  if (e.key === "ArrowRight") right = false;
});

function loop() {
  if (!gameRunning || gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // プレイヤー移動
  if (left) player.x -= player.speed;
  if (right) player.x += player.speed;
  player.x = Math.max(0, Math.min(360, player.x));

  // 敵移動
  enemy.y += enemy.speed;
  if (enemy.y > 600) {
    enemy.y = -40;
    enemy.x = Math.random() * 360;
    enemy.speed += 0.2;
    score++;
    scoreDisplay.textContent = "スコア: " + score;
  }

  // 当たり判定
  if (player.x < enemy.x + enemy.w &&
      player.x + player.w > enemy.x &&
      player.y < enemy.y + enemy.h &&
      player.y + player.h > enemy.y) {
    gameOver = true;
    gameRunning = false;
    alert("ゲームオーバー！ スコア: " + score);
  }

  // 描画
  ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.w, enemy.h);

  requestAnimationFrame(loop);
}

startBtn.onclick = () => {
  if (imagesLoaded < 2) {
    alert("画像を読み込み中です。少し待ってからスタートしてください。");
    return;
  }

  if (!gameRunning) {
    gameRunning = true;
    gameOver = false;
    score = 0;
    enemy.y = -40;
    enemy.speed = 3;
    scoreDisplay.textContent = "スコア: 0";
    loop();
  }
};


resetBtn.onclick = () => {
  gameRunning = false;
  gameOver = false;
  score = 0;
  player.x = 180;
  enemy.y = -40;
  enemy.speed = 3;
  scoreDisplay.textContent = "スコア: 0";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
