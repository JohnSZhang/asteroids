(function () {
  if (typeof Asteroids === undefined) {
    window.Asteroids = {}
  }
  
  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;
  var Vector = Asteroids.Vector;
  var Collision = Asteroids.Collision;
 
  var Bullet = Asteroids.Bullet = function (ship, options) {
    var bulletOption = options || {};
    this.pos = ship.pos;
    var angle = bulletOption.angle || ship.direction.getAngle();
    var mag = ship.vel.getMagnitude() + ship.bulletSpeed;
    this.direction = new Vector( { angle: angle, magnitude: 1 } );
    this.vel = (new Vector({ angle: angle, magnitude: mag}));
    this.radius = 5;
    this.color = "#000000";
    this.game = ship.game;
    this.ship = ship;
  }
  
  Bullet.inherits(MovingObject);
  
  Bullet.SingleBullet = function (ship) {
    var newBullet = new Bullet(ship);
    ship.game.bullets.push(newBullet);  
  };
  
  Bullet.DualBullets = function (ship) {
    var bullet1 = new Bullet(ship, {
      angle: ship.direction.getAngle() + Math.PI / 12
    });
    var bullet2 = new Bullet(ship, {
      angle: ship.direction.getAngle() - Math.PI / 12
    })
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
    Util.drawCircle(this.pos, this.radius, context);
  };
  
  Bullet.prototype.collideWith = function (otherObject) {
    var Asteroid = Asteroids.Asteroid;
    if (Collision.isCollidedWith(this, otherObject) && (otherObject instanceof Asteroid) ) {
      otherObject.removeSelf();
      this.removeSelf()
    } 
  };
  
  
  Bullet.prototype.removeSelf = function () {
    this.game.remove(this)
  };
  
})();