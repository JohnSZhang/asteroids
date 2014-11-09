(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Vector = Asteroids.Vector;
  var Util = Asteroids.Util;
  var Bullet = Asteroids.Bullet;
  var Powerup = Asteroids.Powerup;
  var Ship = Asteroids.Ship

  var PlayerShip = Asteroids.PlayerShip = function (object) {
    Ship.call(this, object);
    this.radius = object.radius || Ship.RADIUS;
    this.vel = object.vel || new Vector({x: 0, y: 0});
    this.direction = object.direction || new Vector({ x: 1, y: 0 });
    this.image = new Image();
    this.image.src = 'assets/art/ship/player.png';
    this.bulletSpeed = object.bulletSpeed || 10;
    this.bulletType = object.bulletType || "double";
  };

  PlayerShip.inherits(Ship);

  PlayerShip.prototype.power = function (mag) {
    if (mag < 1){
      this.vel = this.vel.multiply(mag);
    } else {
      var impulse = this.direction.multiply(mag);
      this.vel = this.vel.add(impulse);
    }
  };

  PlayerShip.prototype.turn = function (degree) {
    var turn = degree * Math.PI / 10;
    var currentAngle = this.direction.getAngle();
    this.direction = new Vector({
      magnitude: 1,
      angle: currentAngle + turn
    });
  };

  PlayerShip.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = this.direction.multiply(2)
  };

  PlayerShip.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Powerup) {
        otherObject.use(this)
      }
  };

})();
