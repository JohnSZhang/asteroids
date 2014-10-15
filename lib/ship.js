(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Vector = Asteroids.Vector;
  var Util = Asteroids.Util;
  var Bullet = Asteroids.Bullet;

  var Ship = Asteroids.Ship = function (object) {
    MovingObject.call(this, object);
    this.radius = object.radius || Ship.RADIUS;
    this.color = object.color || Ship.COLOR;
    this.vel = object.vel || new Vector({x: 0, y: 0});
    this.direction = object.direction || new Vector({ x: 1, y: 0 });
    this.image = new Image();
    this.image.src = 'ship.png';
  };

  Ship.inherits(MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "#bb2200";

  Ship.prototype.collideWith = function (otherObject) {
    console.log("colliding with ship")
  };
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = new Vector({ x: 1, y: 0});
  };
  
  Ship.prototype.power = function (mag) {
    var impulse = this.direction.multiply(mag)
    this.vel = this.vel.add(impulse.add(this.vel)); 
  };
  
  Ship.prototype.turn = function (degree) {
    var turn = degree * Math.PI / 20;
    var currentAngle = this.direction.getAngle();
    var currentMag = this.vel.getMagnitude();
    this.direction = new Vector({
      magnitude: 1,
      angle: currentAngle + turn
    });
  };
  
  Ship.prototype.draw = function (context) {
    context.save();

    context.rotate(this.direction.getAngle());
    context.drawImage(this.image, this.pos.x, this.pos.y, this.radius*3, this.radius*3);
    context.rotate(-this.direction.getAngle());
    console.log(this.direction.getAngle());
    context.restore();
  };
    
  Ship.prototype.fireBullet = function () {
    var pos = this.pos;
    var angle = this.vel.getAngle();
    var vel = this.vel.add(new Vector({x: 10, y: 10}));
    var radius = 5;
    var color = "#000000";
    var game = this.game;
    var newBullet = new Bullet({
      pos: pos,
      vel: vel,
      radius: radius,
      color: color,
      game: game
    });
    this.game.bullets.push(newBullet);
  };

})();