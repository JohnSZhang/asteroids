(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Util = Asteroids.Util;
  var Vector = Asteroids.Vector;

  var MovingObject = Asteroids.MovingObject = function (object) {
    this.pos = object.pos || new Vector({ x: 0, y: 0 });
    this.vel = object.vel || new Vector({ x: 0, y: 0 });
    this.direction = new Vector({ 
        angle: this.vel.getAngle(),
        magnitude: this.vel.getMagnitude()});
    this.radius = object.radius || 10;
    this.color = object.color || "#000000";
    this.game = object.game
  }

  MovingObject.prototype.draw = function (context) {
    context.save();
    context.fillStyle = this.color;
    var canvasX = context.canvas.width;
    var canvasY = context.canvas.height;
    var radius = this.radius;
    this.drawDups(context, canvasX, canvasY);
    context.restore();
  };

  MovingObject.prototype.drawDups = function (context, total_x, total_y) {
    for (var y = -1; y < 2; y++) {
      for (var x = -1; x < 2; x++) {
        var pos = new Vector({
              x: this.pos.x + x * total_x,
              y: this.pos.y + y * total_y
            });
        Util.drawCircle(pos, this.radius, context);
      };
    };
  };

  MovingObject.prototype.move = function () {
    this.pos = this.pos.add(this.vel);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // To Be Implemented By Children
  };

})();