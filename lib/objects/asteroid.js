(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Ship = Asteroids.Ship;
  var Bullet = Asteroids.Bullet;
  var Util = Asteroids.Util;
  var Collision = Asteroids.Collision;
  
  var Asteroid = Asteroids.Asteroid = function (object) {
    object.color = object.color || Asteroid.COLOR;
    object.radius = object.radius || Asteroid.RADIUS;
    MovingObject.call(this, object);
  };

  Asteroid.inherits(MovingObject);

  Asteroid.COLOR = "#efefef";
  Asteroid.RADIUS = 10;

  MovingObject.prototype.collideWith = function (otherObject) {
    if (Collision.isCollidedWith(this, otherObject)) {
      if (otherObject instanceof Ship) {
        otherObject.relocate();
        
      }
      else if (otherObject instanceof Bullet){
        this.game.remove(otherObject);
        this.game.remove(this);
      }
      
      else {
        Collision.collide(this, otherObject);
        Collision.moveApart(this, otherObject);
      }
    }
  };

})();