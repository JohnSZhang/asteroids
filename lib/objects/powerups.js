(function () {
  if(typeof Asteroids === "undefined") { Asteroids = {} } 
  
  var MovingObject = Asteroids.MovingObject;
  var Vector = Asteroids.Vector;
  
  var Powerup = Asteroids.Powerup = function (options) {
    this.type = options.type || 'none';
    this.game = options.game;
    this.pos = options.pos;
    this.direction = options.direction || new Vector({ x: 0, y: -1});
    this.radius = 10;
    this.image = new Image();
    this.image.src = 'powerup.png';
  }
  
  Powerup.prototype.draw = function (context) {
    context.save();
    var angle = this.direction.getAngle();
    context.translate(this.pos.x, this.pos.y)
    context.rotate(angle + (Math.PI / 2));
    context.drawImage(this.image, -(this.radius), -(this.radius),
     this.radius*2, this.radius*2); 
    context.restore();
  };
  
  Powerup.prototype.move = function () {
    //Powerups Do Not Move
  };
  Powerup.prototype.use = function(ship) {
    ship.bulletSpeed += 3;
    this.game.remove(this)
  };
  
})();  