(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Ship = Asteroids.Ship;
  var Bullet = Asteroids.Bullet;
  var Util = Asteroids.Util;
  var Collision = Asteroids.Collision;
  var Powerup = Asteroids.Powerup
  
  var Asteroid = Asteroids.Asteroid = function (object) {
    object.color = object.color || Asteroid.COLOR;
    object.radius = object.radius || Asteroid.RADIUS;
    MovingObject.call(this, object);
  };
  
  var CreateAsteroid = Asteroids.CreateAsteroid = function (options) {
    return new Asteroid({
      pos: options.pos,
      vel: options.vel || Util.randomVec(3),
      color: options.color || 'hsla(' + Math.random() * 360 + ', 100%, 70%, 0.6)',
      radius: options.radius || Math.random() * 30 + 15,
      game: options.game
    });
  } 
  
  Asteroid.inherits(MovingObject);

  Asteroid.COLOR = "#efefef";
  Asteroid.RADIUS = 10;
  
  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
    }
      
    else if (otherObject instanceof Asteroid) {
      var sizeDiff = Collision.sizeDiff(this, otherObject);
      // If theres a more than five-fold difference in size, they merge
      if (sizeDiff > 5 ) {
        Collision.merge(this, otherObject)
      }
      else {
        Collision.collide(this, otherObject)
      }
    }
  };
  
  Asteroid.prototype.removeSelf = function () {
   if (Util.trigger(0.5)) {
     this.dropPowerup();
   };
    this.game.remove(this);
  };
  
  Asteroid.prototype.dropPowerup = function () {
    var newPowerup = new Powerup({
      game: this.game,
      pos: this.pos
    })
    
    this.game.powerUps.push(newPowerup);
  };

})();