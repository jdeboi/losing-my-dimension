import P5Wrapper from 'react-p5-wrapper';



export default function sketch (p) {
  let rotation = 0;

  let ps0, ps1;
  let fr;
  let percent = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight); //, p.WEBGL
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.x) {
      if (!ps0) {
        ps0 = new ParticleSystem(p, p.createVector(props.x, props.y), true);
        ps0.initParticles(100);
      }
      else {
        // ps0.setPercent(props.percent0);
        ps0.origin.set(props.x, props.y,0);
      }
    }
    if (props.x1){
      if (!ps1) {
        ps1 = new ParticleSystem(p, p.createVector(props.x1, props.y1), false);
        ps1.initParticles(100);
      }
      else {
        // ps1.setPercent(props.percent1);
        ps1.origin.set(props.x1, props.y1,0);
      }
    }
  };

  p.draw = function () {
    percent += .1;

    p.clear();
    if (ps0) {
      ps0.run(percent);
      // ps1.run(percent);
    }

    p.fill(255);
    p.noStroke();
    p.rect(50, 50, 50, 50);
    p.fill(0);
    p.textSize(30);
    p.text(p.round(p.frameRate()), 50, 80);

  };
};

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

function Particle(p, origin, id, isLeft) {
  this.p5 = p;
  this.acceleration = this.p5.createVector(0,0);
  this.gravity = this.p5.createVector(0,0.1);
  if (isLeft) this.velocity = this.p5.createVector(this.p5.random(-.8,5),this.p5.random(0,.5));
  else this.velocity = this.p5.createVector(this.p5.random(-5,.8),this.p5.random(0,.5));
  this.positionOG = this.p5.createVector(origin.x, origin.y);
  this.position = this.p5.createVector(origin.x, origin.y);
  this.lifespan = 0;
  this.r = Math.random()*15+8;
  this.id = id;

  this.run = function(percent, origin) {
    this.update(percent, origin);
    this.display(percent);
  }

  // Method to update position
  this.update = function(percent, origin) {
    let dt = this.getTime(percent);
    this.position.x = origin.x + this.velocity.x * dt;
    this.position.y = origin.y +  1 * this.gravity.y * dt *dt + this.velocity.y * dt;
  }


  this.getTime = function(percent) {
    return (percent*6-this.id)%80;
  }

  this.updateOG = function() {
    // let c = 0.02;
    // let friction = this.p5.createVector(this.velocity.x,this.velocity.y,this.velocity.z);
    // friction.mult(-1);
    // friction.normalize();
    // friction.mult(c);
    // this.acceleration.add(friction);
    this.acceleration.add(this.gravity);
    this.velocity.add(this.acceleration);

    this.position.add(this.velocity);

    // let bufferX = 50;
    // if (this.position.y > window.innerHeight-100) {
    //   this.velocity.y *= -1*Math.random()*.3-.1;
    //   this.position.y = window.innerHeight-100;
    // }
    // if (this.position.x < bufferX) {
    //   this.position.x = bufferX;
    //   this.velocity.x *= -1;
    // }
    // if (this.position.x > window.innerWidth-bufferX) {
    //   this.position.x = window.innerWidth-bufferX;
    //   this.velocity.x *= -1;
    // }

    this.acceleration.mult(0);
    this.lifespan += 1;
  }


  // Method to display
  this.display = function(percent) {
    let dt = this.getTime(percent);
    if (dt > 0) {
      let alpha = this.p5.map(dt, 0, 80, 255, 0);
      this.p5.noStroke();
      this.p5.fill(0, alpha);
      this.p5.ellipse(this.position.x,this.position.y,this.r,this.r);
    }
  }

  // Is the particle still useful?
  this.isDead = function() {
    return (this.y > window.innerHeight+ 100);
  }
}

function percentBar(p5, x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.p5 = p5;

  this.display = function(percent) {
    let swimmer = "🏊🏾";
    let posX = this.p5.map(percent, 0, 100, this.x, this.x + this.w);
    let posY = this.y + 10*this.p5.sin(this.p5.frameCount/10);

    this.p5.textSize(40);
    this.p5.push();
    this.p5.scale(-1, 0);
    this.p5.translate(this.p5.textWidth(swimmer) + this.x, this.y);
    this.p5.text(swimmer, 0, 0);
    this.p5.pop();
  }
}

function ParticleSystem(p, position, isLeft) {
  this.p5 = p;
  this.particles = [];
  this.numParticle = 0;
  this.origin = this.p5.createVector(position.x, position.y);
  this.percent = 0;
  this.isLeft = true; //isLeft;

  this.initParticles = function(num) {
    for (let i =0; i < num; i++) {
      this.addParticle(i);
    }
  }

  this.setPercent = function(percent) {
    this.percent = percent;
  }

  this.addParticle = function(id) {
    this.particles.push(new Particle(this.p5, this.origin, id, this.isLeft));
  }

  this.run = function(percent) {

    // if (this.percent > 100) this.percent = 100;
    // this.percent = this.p5.mouseX/10; //this.p5.map(this.p5.mouseX, 0, window.innerWidth, 0, 100);
    this.particles.forEach((particle) => {
      particle.run(percent, this.origin);
    });
  }
}
