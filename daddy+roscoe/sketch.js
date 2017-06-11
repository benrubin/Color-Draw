var ww;
var hh;
var r;
var g;
var b;
var x1;
var y1;
var x2;
var y2;
var sw;
var count;

var lines = [];
var neverPressed;
var cx = 0;
var cy = 0;
var m = 100;
var dt = 0;
var Tstart;

var mm = false;
var gg = false;
var mx1 = 0;
var my1 = 0;
var	mx2 = 0;
var	my2 = 0;
var mySound;
var crayon = false;
var scribble;            // global mode



function setup() {
	createCanvas(1450, 1450);
	cx = width/2; 
	cy = height/2;
	background(64);
	frameRate(60	);
	count = 0;
	ww = 32;
 	hh = 132;
 	r = 0; g = 0; b = 255;
 	x1 = 200;
 	y1 = 200;
 	x2 = 200;
 	y2 = 200;
 	sw = 4;
 	background(237, 34, 93);
 	fill(0, 102, 153);
 	textSize(40);
 	textAlign(LEFT,TOP);
	text("COLOR DRAW", 10, 50);
	neverPressed = true;
    scribble = new Scribble(); 
    scribble.roughness = 0.5;       // changes the roughness of lines
    crayon = false;
 	

}

function draw() {
	var rr;
	var bb;
	var gg;
	rr = random(255);
	gg = random(255);
	bb = random(255);
	fill(r,g,b);
	textSize(28);
	noStroke();
	textAlign(LEFT,TOP);
	text("By Roscoe xxx Rubin-Rottenberg", 10, 88);
    // text(key, 33,105); // Display last key pressed.
    

    if (neverPressed) {
        fill(25, 25, 25);
    //	var dt = (millis() - Tstart);
        var dt = (frameCount % (width/50)) * 20;
        r = random(255);
        g = random(255);
        b = random(255);
        stroke(r,g,b);
        strokeWeight(30);
        line(cx-dt,cy-dt,cx+dt,cy-dt);
        line(cx+dt,cy-dt,cx+dt,cy+dt);
        line(cx+dt,cy+dt,cx-dt,cy+dt);
        line(cx-dt,cy+dt,cx-dt,cy-dt);
        textAlign(CENTER,CENTER);
        textSize(200);
        stroke(255-r, 255-g, 255-b);
        text("COLOR DRAW", cx, cy-20);
    } else {
        background(25, 25, 25);
        fill(0, 102, 153);
        textSize(40);
        textAlign(LEFT,TOP);
        text("COLOR DRAW", 10, 50);
        fill(r,g,b);
        textSize(28);
        textAlign(LEFT,TOP);
        text("By Roscoe xxxxxyyyy xxx  zz Rubin-Rottenberg", 10, 88);
        text(key, 33,105); // Display last key pressed.
    }

      if (mouseIsPressed) {
        stroke(r,g,b);
        x2 = mouseX;
        y2 = mouseY;
        strokeWeight(4);
        line(x1, y1, x2, y2);
      }  

      for (var i = 0; i < count; i++) {
        lines[i].update();
        lines[i].draw();
        }	
}   
 
function preload() {
  	mySound = loadSound('assetts/bip.mp3');
}


function mousePressed() {
	neverPressed = false;
	r = random(255);
	g = random(255);
	b = random(255);
   	x1 = mouseX;
	y1 = mouseY;
}

function mouseReleased() {
	x2 = mouseX;
	y2 = mouseY;
	lines[count] = new Aline(x1-cx, y1-cy, x2-cx, y2-cy, r, g, b);
	count++;
}



function keyPressed() {
  if (keyCode === UP_ARROW) {
    sw++;
  } else if (keyCode === DOWN_ARROW) {
    sw--;
  } else if (keyCode === LEFT_ARROW) {
  	mm = true;
  	gg = false;
    mySound.setVolume(0.4);
	mySound.play();
  } else if (keyCode === RIGHT_ARROW) {
  	mm = false;
  	gg = false;
  	mx1 = 0;
  	mx2 = 0;
  	my1 = 0;
  	ggmy2 = 0;
  } else if (key === 'E') {   // erase everything
      count = 0;
  } else if (key === 'F') {  // crayon
      crayon = false;
  } else if (key === 'X') {
      crayon = true;
  } else if (key === 'G' ) {  // pulls everything to center
        mm = false;
        gg = true;
        mx1 = 0;
        mx2 = 0;
        my1 = 0;
        my2 = 0;
  } else if (key === 'A') {
    scribble.roughness++;
  } else if (key === 'S') {
    scribble.roughness--;
  } 
else {
return(false);
  }

}

function Aline(_x1, _y1, _x2, _y2, _r, _g, _b) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.cc = color(_r,_g,_b);
}

// Custom method for updating the variables
Aline.prototype.update = function() {
	if (mm) {
		mx1 += random(.5)-0.25;
		my1	+= random(.5)-0.25;
		mx2 += random(.5)-0.25;
		my2 += random(.5)-0.25;
		this.x1 += mx1;
		this.y1 += my1;		
		this.x2 += mx2;
		this.y2 += my2;
	} else if (gg) {
		if (abs(this.x1 - cx) > 1) { 
			this.x1 = this.x1 * (0.9 + random(.1));
		} else {
			this.x1 = 0;
		}
		if (abs(this.y1) > 1) { 
			this.y1 = this.y1 * (0.9 + random(.11));
            print(this.y1);
		} else if (this.y1 != 0) {
			this.y1 = 0;
 			mySound.setVolume(0.4);
  			mySound.play();
		}
		if (abs(this.x2 - cx) > 1) { 
			this.x2 = this.x2 * (0.9 + random(.09));
		} else {
			this.x2 = 0;
		}
		if (abs(this.y2 - cy) > 1) { 
			this.y2 = this.y2 * (0.9 + random(.1))
		} else {
			this.y2 = 0;
		}
	}
}

// Custom method for drawing the object
Aline.prototype.draw = function() {
	stroke(this.cc);
	strokeWeight(sw);
    if (crayon) {
        scribble.scribbleLine(this.x1+cx, this.y1+cy, this.x2+cx, this.y2+cy);  
    } else {
        line(this.x1+cx, this.y1+cy, this.x2+cx, this.y2+cy);  
    }
}


// function draw() {
// 	r = rand
// 	r = 0; g = 0; b = 255;
//   	var c = color(r, g, b);  // Define color 'c'
// 	fill(c);  // Use color variable 'c' as fill color
// 	noStroke();  // Don't draw a stroke around shapes // 480;
// 	// r = (r - 153) * 0.98 + 153;
// 	// g = (g - 153) * 0.98 + 153;
// 	// b = (b - 153) * 0.98 + 153;
// 	// ww = ww * 1.02;
// 	line(90, 90, ww, hh, 00, 20, 20, 00);  // Draw rectangle

// }