
class EyeBall {

	constructor(side) {
		this.side = side;
		this.d = 80;
		this.color = color("black");
		this.rot = 0;
		this.speed = .9;
	}

	update() {
		this.rot = this.rot + this.speed;
	}

	show() {
		push();
		noStroke();
		fill("white");
		if (this.side == "left") {
			translate(320,388);
		} else {
			translate(510,380);
		}
		ellipse(0, 0, this.d);
		fill("black");
		rotate(this.rot);
		ellipse(20, 0, this.d/2);
		pop()
	}
}