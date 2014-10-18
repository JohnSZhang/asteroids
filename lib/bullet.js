(function () {
  if (typeof Asteroids === undefined) {
    window.Asteroids = {}
  }
  
  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;
  
  var Bullet = Asteroids.Bullet = function (object) {
    MovingObject.call(this, object)
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