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

  Function.prototype.inherits = function (SuperClass) {
    var Subclass = this;
    function Surrogate() {};
    Surrogate.prototype = SuperClass.prototype;
    Subclass.prototype = new Surrogate();
  };
  
  Util.collision = function (ob1, ob2) {
    var ob1Mass = ob1.radius;
    var ob2Mass = ob2.radius;
    var center1 = ob1.pos;
    var center2 = ob2.pos;
    var vel1 = ob1.vel;
    var vel2 = ob2.vel;
    var vel1Mag = vel1.getMagnitude();
    var vel2Mag = vel2.getMagnitude();
    var theta1 = vel1.getAngle();
    var theta2 = vel2.getAngle();
    var normAngle = new Vector({
      x: center1.x - center2.x,
      y: center1.y - center2.y
    }).getAngle();
    var colAngle = colAngle + Math.PI/2;
    
    var newVel1x = ((vel1Mag * (Math.cos(theta1 - normAngle)) * (ob1Mass - ob2Mass) + 2* ob2Mass * vel2Mag * Math.cos(theta2 - normAngle)) / (ob1Mass + ob2Mass) * Math.cos(normAngle) ) + vel1Mag * Math.sin(theta1 - normAngle) * Math.cos(normAngle + Math.PI / 2)
    
    var newVel1y = ((vel1Mag * (Math.cos(theta1 - normAngle)) * (ob1Mass - ob2Mass) + 2* ob2Mass * vel2Mag * Math.cos(theta2 - normAngle)) / (ob1Mass + ob2Mass) * Math.sin(normAngle) ) + vel1Mag * Math.sin(theta1 - normAngle) * Math.sin(normAngle + Math.PI / 2)
     
    var newVel2x = ((vel2Mag * (Math.cos(theta2 - normAngle)) * (ob2Mass - ob1Mass) + 2* ob1Mass * vel1Mag * Math.cos(theta1 - normAngle)) / (ob1Mass + ob2Mass) * Math.cos(normAngle) ) + vel2Mag * Math.sin(theta2 - normAngle) * Math.cos(normAngle + Math.PI / 2)
    
    var newVel2y = ((vel2Mag * (Math.cos(theta2 - normAngle)) * (ob2Mass - ob1Mass) + 2* ob1Mass * vel1Mag * Math.cos(theta1 - normAngle)) / (ob2Mass + ob1Mass) * Math.sin(normAngle) )+ vel2Mag * Math.sin(theta2 - normAngle) * Math.sin(normAngle + Math.PI / 2)
    
      ob1.vel = new Vector({ x: newVel1x, y: newVel1y })
      ob2.vel = new Vector({ x: newVel2x, y: newVel2y })
    
  };

})();