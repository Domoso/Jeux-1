var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var x = (canvas.width/2) - 25;
var y = canvas.height-80;

var dx = 2;
var dy = -10;

var tRadius = 40;
var mtx = randomIntFromRange(-2,2);
var mty = randomIntFromRange(2,1);

var tx = randomIntFromRange(tRadius, canvas.width - tRadius);
var ty = randomIntFromRange(tRadius, 100 - tRadius);

var rightPressed = false;
var leftPressed = false;
var spacebarPressed = false;

var ballRadius = 20;

var canonWidth = 50;
var canonHeight = 100;
var canonX = (canvas.width-canonWidth)/2;

var bx = (canvas.width-canonWidth)/2;

var score = 0;

var lives = 3;

var target = {x: 0, y: 0, status: 1};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    } else if(e.keyCode == 32) {
        spacebarPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawBall () {
	c.beginPath();
	c.arc(bx, y, ballRadius, 0, Math.PI * 2, true);
	c.fillStyle = "black";
	c.fill();
	c.closePath();
}

function drawCanon () {

	c.beginPath();
	c.arc(canonX, canvas.height, canonWidth, 0, Math.PI, true);
	c.fillStyle = "blue";
	c.fillRect(canonX - 25, canvas.height - 100, 50, canonHeight);
	c.fill();
	c.closePath();
}

function drawTarget () {
	c.beginPath();
	c.arc(tx, ty, tRadius, 0, Math.PI * 2, true);
	c.fillStyle = "red";
	c.fill();
	c.closePath();
}

function shoot () {
	if (spacebarPressed) {
		y += dy;
	}
}

function drawScore() {
	c.font = "16px Arial";
	c.fillStyle = "#0095DD";
	c.fillText("Score : "+score,16,50);
}

function drawLives() {
    c.font = "16px Arial";
    c.fillStyle = "#0095DD";
    c.fillText("Lives: "+lives, canvas.width-100, 50);
}

function collisionDetection() {
	if (bx - ballRadius > tx && bx -ballRadius < tx - tRadius && y + ballRadius > ty && y+ ballRadius < ty + tRadius) {
		tx = randomIntFromRange(tRadius, canvas.width - tRadius);
		ty = randomIntFromRange(tRadius, 100 - tRadius);
		score++;
		if(score == 10) {
        	alert("YOU WIN, CONGRATULATIONS!");
        	document.location.reload();
        }
	}
}

function draw () {
	c.clearRect(0, 0, canvas.width, canvas.height);
	drawCanon();
	drawTarget();
	drawBall();
	shoot();
	drawScore();
	drawLives();
	collisionDetection();

	if(tx + mtx > canvas.width-tRadius || tx + dx < tRadius) {
    	mtx = -mtx;
	}
	if(ty + mty < tRadius) {
	    mty = -mty;
	} 
	else if (ty + mty > canvas.height - tRadius) {
		lives--;

		if(!lives) {
	    	alert("GAME OVER");
	    	document.location.reload();
		}
		else {
			tx = randomIntFromRange(tRadius, canvas.width - tRadius);
			ty = randomIntFromRange(tRadius, 100 - tRadius);
			mtx = randomIntFromRange(-2,2);
			mty = randomIntFromRange(2,1);
			canonX = (canvas.width-canonWidth)/2;
			bx = (canvas.width-canonWidth)/2;
		}
	};

	if(rightPressed && canonX < canvas.width-canonWidth  || rightPressed && bx < canvas.width-canonWidth) {
        canonX += 7;
        bx += 7;
    }
    else if(leftPressed && canonX > 0 || leftPressed && bx > 0) {
        canonX -= 7;
        bx -= 7;
    }

	if(y + dy < ballRadius) {
    	spacebarPressed = false;
    	 bx = canonX;
    	 y = canvas.height-80;
    }

    tx += mtx;
    ty += mty;

    requestAnimationFrame(draw);
}

draw();
shoot();