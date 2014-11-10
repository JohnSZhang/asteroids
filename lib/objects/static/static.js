(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Vector = Asteroids.Vector;

  var StaticObj = Asteroids.StaticObj = function (options) {
    this.location = options.pos || new Vector({x: 0,  y: 0});
    this.size = options.size || new Vector({ x: 1, y: 1})
    this.image = options.image;
  };

  StaticObj.prototype.draw = function (context) {
    context.save();
    var canvasX = context.canvas.width;
    var canvasY = context.canvas.height;
    var pattern = context.createPattern(this.image, 'repeat')
    context.fillStyle = pattern;
    context.fillRect(
        this.location.x
        , this.location.y
        , this.size.x
        , this.size.y);
    context.restore();
  }

})();
