// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

//Load sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
	bgReady = true;
};
// Win frame image
var winReady = false;
var winImage = new Image();
winImage.src = "images/win.png";
winImage.onload = function () {
	winReady = true;
};
// Player image
var playerReady = false;
var playerImage = new Image();
playerImage.src = "images/player.png";
playerImage.onload = function () {
	playerReady = true;
};
// Goodies image
var goodyReady = false;
var goodyImage = new Image();
goodyImage.src = "images/goody.png";
goodyImage.onload = function () {
	goodyReady = true;
};

// Create global game objects 
var player = {
	speed: 10, // movement in pixels per second 
	width: 32,
	height: 32
};
var goodies = [ // this is an array
	{
		width: 32,
		height: 32
	}
];

// Velocity variables
var vX = 0;
//var vY = 0;

var pts; //points
var time;  //time
var timer; //timer
var time_over; //end of game condition

var hScore; //container for highest score from DB

// Handle keyboard controls
addEventListener("keydown", function (e) {
	//Keystrokes
	if (e.keyCode == 37) { // LEFT
		vX = -player.speed;
		vY = 0;
	}
	if (e.keyCode == 39) { // RIGHT
		vX = player.speed;
		vY = 0;
	}
	if (e.keyCode == 32) { // STOP spacebar
		vX = 0;
		vY = 0;
	}
}, false);

// Handle touch controls
addEventListener("touchstart", function (e) {
	if (e.target.id == "lArrow") { // LEFT
		vX = -player.speed;
		vY = 0;
	} else if (e.target.id == "rArrow") { //RIGHT
		vX = player.speed;
		vY = 0;
	} else { // STOP This stops if you touch anywhere else
		vX = 0;
		vY = 0;
	}
});

//Set initial state
var init = function () {
	//Put the player in the centre
	player.x = (canvas.width - player.width) / 2;
	player.y = canvas.height - player.height - 10;
	//Place goodies at random locations 
	for (var i in goodies) {
		goodies[i].x = (Math.random() *
			(canvas.width - goodies[i].width));
		goodies[i].y = 0; ///start goodies at the top
	}
	pts = 20;
	time = 5;
	timer = setInterval(clock,1000);
	time_over = false;
};


// The main game loop
var main = function () {
	if (time_over) {
		render_end();
	} else {
		//Play game
		//move player
		if (player.x > 0 &&
			player.x < canvas.width - player.width) {
			player.x += vX;
		} else {
			player.x -= vX;
			vX = -vX; //bounce
		}


		if (Math.random() > 0.99) {
			spawnGoody();
		}

		//check collisions
		for (var i in goodies) {
			goodies[i].y++;

			if (checkCollision(player, goodies[i])) {
				goodies.splice(i, 1);
				pts++;
			}

			if (goodies[i].y > canvas.height) {
				goodies.splice(i, 1);
			}
		}
		render();
		window.requestAnimationFrame(main);
	}
};
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if (goodyReady) {
		for (var i in goodies) {
			ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
		}
	}

	//Label
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20pt Acme";
	ctx.fillText("Time left: " + time, 32, 32);
	ctx.fillText("Points: " + pts, 32, 64);
	ctx.fillText("Highest Score: " + hScore, 32, 96);

};

var render_end = function () {
	if (bgReady) {
		ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	
	//Display the score and prepare the form
	document.getElementById("scoreBox").style.display = "block";
	document.getElementById("score_display").innerHTML = pts; //visible score
	document.getElementById("ScoreInput").value = pts; //form input score
};

//Generic function to check for collisions 
var checkCollision = function (obj1, obj2) {
	if (obj1.x < (obj2.x + obj2.width) &&
		(obj1.x + obj1.width) > obj2.x &&
		obj1.y < (obj2.y + obj2.height) &&
		(obj1.y + obj1.height) > obj2.y
	) {
		return true;
	}
};


var spawnGoody = function () {
	goodies.push({
		width: 32,
		height: 32,
		x: (Math.random() * (canvas.width - 32)),
		y: 0
	});
};

var clock = function() {
	if (time == 1) {
		clearInterval(timer);
		time_over = true;
	}
	else {
		time--;
	}
};

//Start the gameplay
init();
window.requestAnimationFrame(main);



