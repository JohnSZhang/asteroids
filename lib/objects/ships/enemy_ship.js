(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Vector = Asteroids.Vector;
  var Util = Asteroids.Util;
  var Bullet = Asteroids.Bullet;
  var Powerup = Asteroids.Powerup;
  var Ship = Asteroids.Ship;
  var Collision = Asteroids.Collision;

  var EnemyShip = Asteroids.EnemyShip = function (object) {
    MovingObject.call(this, object);
    this.radius = object.radius || Ship.RADIUS
    this.color = object.color
    this.vel = object.vel || new Vector({x: 0, y: 0});
    this.direction = object.direction || new Vector({ x: 1, y: 0 });
    this.image = new Image();
    this.image.src = 'assets/art/ship/enemy1.png';
    this.bulletSpeed = object.bulletSpeed || 10;
    this.bulletType = object.bulletType || "single";
  };

  EnemyShip.inherits(Ship);

  EnemyShip.prototype.power = function (mag) {
    if (mag < 1){
      this.vel = this.vel.multiply(mag);
    } else {
      var impulse = this.direction.multiply(mag);
      this.vel = this.vel.add(impulse);
    }
  };
  
  EnemyShip.prototype.aimShip = function () {
    var playerShip = this.game.playerShip;
    var shipAngle = new Vector({
          x: playerShip.pos.x - this.pos.x ,
          y: playerShip.pos.y -  this.pos.y }).getAngle();
    this.direction = new Vector({ angle: shipAngle, magnitude: 1})
  };
  
  EnemyShip.prototype.move = function () {
    var self = this;
    Util.gravity({ ship: this.game.playerShip,
          obj: self, 
          constant: 0.02})
    this.aimShip();      
    this.pos = this.pos.add(this.vel); 
    if(Util.trigger(.995)) {
      this.fireBullet();
    }         
  };
  
  EnemyShip.prototype.collideWith = function (otherObject) {
     if (otherObject instanceof EnemyShip) {
        Collision.collide(this, otherObject)
    }
  };
  
  var CreateEnemy = Asteroids.CreateEnemy = function (options) {
    return new EnemyShip({
      pos: options.pos,
      vel: options.vel || Util.randomVec(3),
      radius: 20,
      game: options.game
    });
  } 


})();