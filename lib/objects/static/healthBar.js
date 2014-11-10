(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var StaticObj = Asteroids.StaticObj;
  var Vector = Asteroids.Vector;

  var Healthbar = Asteroids.Healthbar = function (options) {
    StaticObj.call(this, options)
    this.image = new Image();
    this.ship = options.ship;
    this.image.src = 'assets/art/static/squareRed.png';
    this.initialize();
  }
  Healthbar.inherits(StaticObj);

  Healthbar.prototype.initialize = function () {
    var width = Healthbar.WIDTH * this.ship.life;
    var height = Healthbar.WIDTH;
    this.size = new Vector({ x: width, y: height })
  };

  Healthbar.prototype.updateState = function () {
    this.size.x = Healthbar.WIDTH * this.ship.life;
  }

  Healthbar.WIDTH = 19;
  Healthbar.HEIGHT = 26;

})();
