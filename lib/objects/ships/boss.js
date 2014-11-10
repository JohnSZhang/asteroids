(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var MovingObject = Asteroids.MovingObject;
  var Vector = Asteroids.Vector;
  var Util = Asteroids.Util;
  var Bullet = Asteroids.Bullet;
  var Ship = Asteroids.Ship;
  var Collision = Asteroids.Collision;

  var Boss = Asteroids.Boss = function (object) {
    Ship.call(this, object);
    this.radius = object.radius || 60
    this.color = object.color
    this.vel = object.vel || new Vector({x: 0, y: 0});
    this.direction = object.direction || new Vector({ x: 1, y: 0 });
    this.image = new Image();
    this.image.src = 'assets/art/ship/boss.png';
    this.bulletSpeed = object.bulletSpeed || 10;
    this.bulletType = object.bulletType || "double";
    this.maxSpeed = object.maxSpeed || 4;
    this.life = object.life;
  };

  Boss.inherits(Ship);

  Boss.prototype.move = function () {
    this.pos = this.pos.add(this.vel);
    if(Util.trigger(.98)) {
      this.fireBullet();
    }
    if (this.vel.getMagnitude() > this.maxSpeed) {
      this.vel = this.direction.multiply(this.maxSpeed);
    }
  };

  Boss.prototype.collideWith = function (otherObject) {
     if (otherObject instanceof PlayerShip &&
     Collision.isCollidedWith(self, otherObject)) {
       otherObject.life = 0;
    }
  };

})();
