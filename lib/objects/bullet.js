(function () {
  if (typeof Asteroids === undefined) {
    window.Asteroids = {}
  }

  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;
  var Vector = Asteroids.Vector;
  var Collision = Asteroids.Collision;
  var Asteroid = Asteroids.Asteroid;
  var Ship = Asteroids.Ship;

  var Bullet = Asteroids.Bullet = function (ship, options) {
    var bulletOption = options || {};
    this.pos = ship.pos;
    var angle = bulletOption.angle || ship.direction.getAngle();
    var mag = ship.vel.getMagnitude() + ship.bulletSpeed;
    this.direction = new Vector( { angle: angle, magnitude: 1 } );
    this.vel = (new Vector({ angle: angle, magnitude: mag}));
    this.radius = 5;
    this.game = ship.game;
    this.ship = ship;
  }

  Bullet.inherits(MovingObject);

  Bullet.SingleBullet = function (ship) {
    var newBullet = new Bullet(ship);
    newBullet.power = 1;
    ship.game.bullets.push(newBullet);
  };

  Bullet.DualBullets = function (ship) {
    var bullet1 = new Bullet(ship, {
      angle: ship.direction.getAngle() + Math.PI / 12
    });
    bullet1.power = 2;
    var bullet2 = new Bullet(ship, {
      angle: ship.direction.getAngle() - Math.PI / 12
    })
    bullet2.power = 2;
    ship.game.bullets.push(bullet1, bullet2);
  };

  Bullet.GenerateNewBullet = function (ship) {
    switch (ship.bulletType) {
      case "single":
        Bullet.SingleBullet(ship);
        break;
      case "double":
        Bullet.DualBullets(ship);
        break;
    }
  };

  Bullet.prototype.drawDups = function (context) {
    switch (this.ship.bulletType) {
      case "single":
      if (typeof this.image === "undefined") {
        this.image = new Image();
        this.image.src = 'assets/art/bullets/bullet1.png';
        break;
      }
      case "double":
      if (typeof this.image === "undefined") {
        this.image = new Image();
        this.image.src = 'assets/art/bullets/bullet2.png';
        break;
      }
    }
    Util.directionDraw(this, context)
  };

  Bullet.prototype.collideWith = function (otherObject) {
    if (Collision.isCollidedWith(this, otherObject)) {
      this.collisionCal(otherObject)
    }
  };

  Bullet.prototype.collisionCal = function (otherObject) {
    var Asteroid = Asteroids.Asteroid;
    var Ship = Asteroids.Ship;
    var EnemyShip = Asteroids.EnemyShip;
    if (otherObject instanceof Asteroid) {
      otherObject.removeSelf();
      this.removeSelf()
    } else if (otherObject !== this.ship && otherObject instanceof Ship ){
      otherObject.takeDamage(this.power)
      this.removeSelf()
    }
  };

  Bullet.prototype.checkRemove = function () {
    if ((this.pos.x < 0 || this.pos.x > this.game.canvas.width) ||
        (this.pos.y < 0 || this.pos.y > this.game.canvas.height)) {
          this.removeSelf();
        }
  }

  Bullet.prototype.removeSelf = function () {
    this.game.remove(this)
  };

})();
