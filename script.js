const pongCard = document.getElementById("pongCard");

const gameContainer = document.getElementById("gameContainer");

pongCard.addEventListener("click", function(){
    gameContainer.innerHTML = `
    <h2>Pong</h2>

    <canvas id="gameCanvas" width="800" height="500"></canvas>
    `;
    startPong();
});

function startPong(){
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let ballX = 400;
let ballY = 250;
let ballSpeedX = 4;
let ballSpeedY = 3;
let paddleX = 350;
let paddleY = 470;
let paddleWidth = 100;
let paddleHeight = 20;
let leftPressed = false;
let rightPressed = false;
function draw(){

    if(leftPressed){
        paddleX -= 6;
    }

    if(rightPressed){
        paddleX += 6;
    }

    if(paddleX < 0){
        paddleX = 0;
    }

    if(paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > canvas.width - 15){
        ballSpeedX = -ballSpeedX;
    }

    if(ballX < 15){
        ballSpeedX = -ballSpeedX;
    }

    if(ballY < 15){
        ballSpeedY = -ballSpeedY;
    }

    if (
    ballY + 15 >= paddleY &&
    ballY - 15 <= paddleY + paddleHeight &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
) {
    let paddleCenter = paddleX + paddleWidth / 2;
    let hitPosition = ballX - paddleCenter;
    ballSpeedX += hitPosition * 0.05;
    ballSpeedY = -ballSpeedY;
    ballY = paddleY - 15;
}
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.fillRect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight
    );

}
document.addEventListener("keydown", function(event){

    if(event.key === "ArrowLeft"){
        leftPressed = true;
    }

    if(event.key === "ArrowRight"){
        rightPressed = true;
    }

});
document.addEventListener("keyup", function(event){

    if(event.key === "ArrowLeft"){
        leftPressed = false;
    }

    if(event.key === "ArrowRight"){
        rightPressed = false;
    }

});
setInterval(draw, 16);
}