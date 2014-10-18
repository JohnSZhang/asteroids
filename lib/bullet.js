(function () {
  if (typeof Asteroids === undefined) {
    window.Asteroids = {}
  }
  
  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;
  var Vector = Asteroids.Vector;
 
  var Bullet = Asteroids.Bullet = function (ship) {
    this.pos = ship.pos;
    var angle = ship.direction.getAngle();
    var mag = ship.vel.getMagnitude() + 10;
    this.direction = new Vector( { angle: angle, magnitude: 1 } );
    this.vel = (new Vector({ angle: angle, magnitude: mag}));
    this.radius = 5;
    this.color = "#000000";
    this.game = ship.game;
  }
  
  Bullet.inherits(MovingObject);
  
  
  Bullet.prototype.drawDups = function (context) {  
    Util.drawCircle(this.pos, this.radius, context);
  };
  
  Bullet.prototype.collideWith = function (otherObject) {
    var Asteroid = Asteroids.Asteroid;
    if (this.isCollidedWith(otherObject) && (otherObject instanceof Asteroid)) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };
  
})();