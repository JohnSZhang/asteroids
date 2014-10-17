(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util;
  var Asteroid = Asteroids.Asteroid;
  var Vector = Asteroids.Vector;
  var Ship = Asteroids.Ship;
  var Bullet = Asteroids.Bullet;

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Ship({
      pos: Util.randomPos(Game.DIM_X, Game.DIM_Y),
      vel: Util.randomVec(2),
      game: this
    });
  };

  // add new asteroids to array
  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var asteroid = new Asteroid({
        pos: Util.randomPos(Game.DIM_X, Game.DIM_Y),
        vel: Util.randomVec(2),
        color: 'hsla(' + Math.random() * 360 + ', 100%, 70%, 0.6)',
        game: this
      });
      this.asteroids.push(asteroid);
    };
  };

  Game.prototype.allObjects = function () {
    return this.bullets.concat(this.asteroids).concat([this.ship]);
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (object) {
      object.draw(context);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
      if(!(object instanceof Bullet)) {
        object.pos.wrap(Game.DIM_X, Game.DIM_Y);
      }
    });
  };

  Game.prototype.checkCollisions = function () {
    var collisions = [];
    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          collisions.push([this.allObjects()[i],this.allObjects()[j]]);
        }
      };
    };
    collisions.forEach(function (collision) {
      collision[0].collideWith(collision[1]);
    });
  };
  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Bullet) {
      var bulletNum = this.bullets.indexOf(object);
      this.bullets.splice(bulletNum, 1);
    }
    else if (object instanceof Asteroid) {
      var asteroidNum = this.asteroids.indexOf(object);
      this.asteroids.splice(asteroidNum, 1);
    }
    else {
      (console.log("trying to remove something not existent"))
    }
  };
  Game.prototype.randomPos = function () {
    return new Vector({
      x: Math.random() * Game.DIM_X,
      y: Math.random() * Game.DIM_Y
    })
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 1;

})();