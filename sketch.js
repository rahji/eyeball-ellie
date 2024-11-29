let bg;
let introtext;
let walltop, wallbottom;
let righteye, lefteye;
let shootsound, suckedoutsound, winsound, introsound;
let targetnames = ["baby", "banana", "book", "broccoli", "burger", "cake", "drink", "phone", "pickles", "poop", "potato", "redboot", "strawberry", "turkey"];
let targets = [];
let shootforce = 50;
let eyeshoottimestamp = 0;
let lefteyeshoot = false;
let intro = true;
let pointstowin = 14;
let points = 0;

function preload() {
	bg = loadImage("assets/ellie8.png");
	shootsound = loadSound("assets/shoot.wav");
	introsound = loadSound("assets/intro.wav");
	suckedoutsound = loadSound("assets/suckedout.wav");
	winsound = loadSound("assets/win.wav");
	introtext = loadImage("assets/title.png");
}

function setup() {
	createCanvas(800, 800);
	textSize(200);
	displayMode('centered', 'pixelated', 8);
	world.gravity.y = 1;

	strokeWeight(20);

	walltop = new Sprite([[10, height / 3], [10, 10], [width - 10, 10], [width - 10, height / 3]]);
	walltop.collider = 'static';
	walltop.color = "#7FFFD4";
	wallbottom = new Sprite([[10, height * (2 / 3)], [10, height - 10], [width - 10, height - 10], [width - 10, height * (2 / 3)]]);
	wallbottom.collider = 'static';
	wallbottom.color = "#7FFFD4";

	righteye = new Sprite(320, 388, 40);
	righteye.image = "assets/eyeball.png";
	lefteye = new Sprite(510, 380, 40)
	lefteye.image = "assets/eyeball.png";
	socketEyes();

	i = 0;
	targetnames.forEach(element => {
		targets[i] = new Sprite(200, 200, 60, 60);
		targets[i].image = "assets/" + element + ".png";
		i++;
	});

	allSprites.bounciness = 1;
	allSprites.visible = false;
	allSprites.sleeping = true;
}

function draw() {
	if (intro) {
		background("red");
		scale(2);
		image(introtext, 20, 50);
		return;
	}

	background(bg);

	// shoot
	if (millis() - eyeshoottimestamp > 1000) {
		socketEyes();
		eyeshoottimestamp = 0;
	}

	// die
	targets.forEach(element => {
		if (element.x > width - 20 || element.x < 20) {
			suckedoutsound.play();
			element.remove();
			points++;
		}
	});
	if (points >= pointstowin) {
		stroke("white");
		fill("white");
		text("YOU", 200, 200);
		text("WIN", 200, 400);
		text("!!!", 200, 600);
		winsound.play();
		noLoop();
	}

}

function socketEyes() {
	lefteye.rotationLock = true;
	lefteye.moveTowards(510, 380);
	righteye.rotationLock = true;
	righteye.moveTowards(320, 388);
	righteye.collider = "none";
	lefteye.collider = "none";
}

function keyPressed() {
//	if (key != " ") return;
	if (intro) {
		intro = false;
		introsound.play();
		allSprites.visible = true;
		allSprites.sleeping = false;
		return;
	}

	// fudgey keyboard control stuff
	k = key.toLowerCase();
	console.log(k);
	if (k == "q" || k == "w" || k == "e" || k == "r" || k == "a" ||
		k == "s" || k == "d" || k == "f" || k == "z" || k == "x" || k == "c" || k == "v") {
		lefteyeshoot = false;
	} else if (k == "y" || k == "u" || k == "i" || k == "o" || k == "p" ||
		k == "h" || k == "j" || k == "k" || k == "l" || k == ";" || k == "b" || k == "n" || k == "m" || k == "," || k ==".") {
		lefteyeshoot = true;
	} else { return}

	if (eyeshoottimestamp == 0) { // if we're not already shooting
		eyeshoottimestamp = millis(); // we're shooting now, so mark the start time
		//lefteyeshoot = !lefteyeshoot; // switch eyes from last shoot
		if (lefteyeshoot) {
			lefteye.collider = "dynamic";
			lefteye.vel.x = floor(random(-shootforce, shootforce));
			lefteye.vel.y = floor(random(-shootforce, shootforce));
		} else {
			righteye.collider = "dynamic";
			righteye.vel.x = floor(random(-shootforce, shootforce));
			righteye.vel.y = floor(random(-shootforce, shootforce));
		}
		shootsound.play();
	}
}

