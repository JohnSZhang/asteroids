(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Vector = Asteroids.Vector;
  var Util = Asteroids.Util;
  var Bullet = Asteroids.Bullet;
  var Powerup = Asteroids.Powerup;

  var Ship = Asteroids.Ship = function (object) {
    MovingObject.call(this, object);
    this.radius = object.radius || Ship.RADIUS;
    this.color = object.color || Ship.COLOR;
    this.vel = object.vel || new Vector({x: 0, y: 0});
    this.direction = object.direction || new Vector({ x: 1, y: 0 });
    this.image = new Image();
    this.image.src = 'ship.png';
    this.bulletSpeed = object.bulletSpeed || 10
  };

  Ship.inherits(MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "#bb2200";

  Ship.prototype.collideWith = function (otherObject) {
    console.log("colliding with ship")
  };
  
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = this.direction.multiply(2)
  };

  Ship.prototype.power = function (mag) {
    if (mag < 1){
      this.vel = this.vel.multiply(mag);
    } else {
      var impulse = this.direction.multiply(mag);
      this.vel = this.vel.add(impulse);
    }
  };

  Ship.prototype.turn = function (degree) {
    var turn = degree * Math.PI / 10;
    var currentAngle = this.direction.getAngle();
    this.direction = new Vector({
      magnitude: 1,
      angle: currentAngle + turn
    });
  };
  
  Ship.prototype.move = function (mag) {
    var mag = mag || 0.99;
    this.vel = this.vel.multiply(mag);
    this.pos = this.pos.add(this.vel);
  };

  Ship.prototype.draw = function (context) {
    context.save();
    
    var angle = this.direction.getAngle();
    context.translate(this.pos.x, this.pos.y)
    context.rotate(angle + (Math.PI / 2));
    context.drawImage(this.image, -(this.radius), -(this.radius),
     this.radius*2, this.radius*2); 
    context.restore();
  };

  Ship.prototype.fireBullet = function () {
    var newBullet = new Bullet(this);
    this.game.bullets.push(newBullet);
  };
  
  Ship.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Powerup) {
        otherObject.use(this)
      }
  };

})();