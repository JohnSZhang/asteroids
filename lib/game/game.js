(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util;
  var Asteroid = Asteroids.Asteroid;
  var Vector = Asteroids.Vector;
  var Ship = Asteroids.Ship;
  var Bullet = Asteroids.Bullet;
  var Collision = Asteroids.Collision;
  var PlayerShip = Asteroids.PlayerShip;
  var Powerup = Asteroids.Powerup;

  var Game = Asteroids.Game = function (canvasSize) {
  
    var self = this;
    this.asteroids = [];
    this.bullets = [];
    this.powerUps = [];
    this.enemies = [];
    this.canvas = canvasSize || { width: Game.DIM_X, height: Game.DIM_Y };
    this.addAsteroids();
    this.addEnemies();
    this.playerShip = new PlayerShip({
      pos: Util.randomPos(self.canvas.width, self.canvas.height),
      vel: Util.randomVec(2),
      game: this
    });
  };

  // add new asteroids to array
  Game.prototype.addAsteroids = function () {
    var self = this;
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var asteroid = Asteroids.CreateAsteroid({
          pos: Util.randomPos(self.canvas.width, self.canvas.height),
          game: this}); 
      this.asteroids.push(asteroid);
    };
  };
  
  Game.prototype.addEnemies = function () {
    var self = this;
    for (var i = 0; i < Game.NUM_ENEMIES; i++) {
      var enemy = Asteroids.CreateEnemy({
          pos: Util.randomPos(self.canvas.width, self.canvas.height),
          game: this }); 
      this.enemies.push(enemy);
    };
  };

  Game.prototype.allObjects = function () {
    return this.bullets.concat
    (this.asteroids).concat([this.playerShip])
    .concat(this.enemies).concat(this.powerUps);
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.allObjects().forEach(function (object) {
      object.draw(context);
    });
  };

  Game.prototype.moveObjects = function () {
    var self = this;
    this.allObjects().forEach(function (object) {
      object.move();
      if(!(object instanceof Bullet)) {
        object.pos.wrap(self.canvas.width, self.canvas.height);
      } else {
        object.checkRemove()
      }
      if(object instanceof Asteroid) {
        Util.gravity({ ship: self.playerShip, obj: object })
      }
    });
  };

  Game.prototype.checkCollisions = function () {
    var collisions = [];
    
    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (Collision.isCollidedWith(
              this.allObjects()[i], 
              this.allObjects()[j])) {
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
    else if (object instanceof Powerup) {
      var powerupNum = this.powerUps.indexOf(object);
      this.powerUps.splice(powerupNum, 1);
    }
    else {
      (console.log("trying to remove something not existent"))
    }
  };
  Game.prototype.randomPos = function () {
    var self = this;
    return new Vector({
      x: Math.random() * self.canvas.width,
      y: Math.random() *  self.canvas.height,
    })
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 0;
  Game.NUM_ENEMIES = 5;

})();