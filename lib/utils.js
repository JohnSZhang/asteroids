(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Vector = Asteroids.Vector = function (params) {
    if (typeof params.x !== "undefined") {
      this.x = params.x;
      this.y = params.y;
    }
    else {
      this.x = params.magnitude * Math.cos(params.angle);
      this.y = params.magnitude * Math.sin(params.angle);
    }
  };

  Vector.prototype.add = function (vector) {
    return new Vector({
      x: this.x + vector.x,
      y: this.y + vector.y
    });
  };

  Vector.prototype.subtract = function (vector) {
    return new Vector({
      x: this.x - vector.x,
      y: this.y - vector.y
    });
  };

  Vector.prototype.multiply = function (mag) {
    return new Vector({
      x: this.x * mag,
      y: this.y * mag
    })
  };

  Vector.prototype.distanceTo = function (vector) {
    return this.subtract(vector).getMagnitude();
  };

  Vector.prototype.angleTo = function (vector) {
    return this.subtract(vector).getAngle();
  };

  Vector.prototype.getMagnitude = function () {
    return Math.pow(this.x * this.x + this.y * this.y, 0.5);
  };

  Vector.prototype.getAngle = function () {
    return Math.atan2(this.y, this.x);
  };

  Vector.prototype.wrap = function (width, height) {
    var w = width;
    var h = height;
    var x = this.x;
    var y = this.y;
    this.x = (x % w + w) % w;
    this.y = (y % h + h) % h;
  };

  var Util = Asteroids.Util = function () {
  }

  Util.randomPos = function (width, height) {
    return new Vector({
      x: Math.random() * width,
      y: Math.random() * height
    });
  }

  Util.randomVec = function (length) {
   var angle = Math.random() * 2 * Math.PI;
   return new Vector({
     magnitude: length,
     angle: angle
   });
  };

  Util.drawCircle = function (pos, radius, context) {
    context.beginPath();
    context.arc(
      pos.x,
      pos.y,
      radius,
      0,
      2 * Math.PI
    );
    context.fill();
  }
  
  Util.gravity = function (ship, obj) {
    var constant = 0.01; // Another Awesome Constant To Play With
    var distance = ship.pos.distanceTo(obj.pos);
    var distanceDir = ship.pos.subtract(obj.pos).getAngle();
    var shipMass = ship.radius * ship.radius;
    var objMass = obj.radius * obj.radius;
    var force = constant * shipMass * objMass / (distance * distance);
    var acc = force / objMass;
    var accVector = new Vector( {
          angle: distanceDir,
          magnitude: constant });
    obj.vel = obj.vel.add(accVector)
  };


  Function.prototype.inherits = function (SuperClass) {
    var Subclass = this;
    function Surrogate() {};
    Surrogate.prototype = SuperClass.prototype;
    Subclass.prototype = new Surrogate();
  };
  

})();