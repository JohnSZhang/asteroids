(function () {
  if(typeof Asteroids === "undefined") { Asteroids = {}; } 
  
  
  var Collision = Asteroids.Collision = {}
  var Vector = Asteroids.Vector
  
  Collision.collide = function (ob1, ob2) {
    var coeOfRes = 1 // Very Fun To Allow Objects To Stick
    var ob1Mass = ob1.radius * ob1.radius;
    var ob2Mass = ob2.radius * ob2.radius;
    var center1 = ob1.pos;
    var center2 = ob2.pos;
    var vel1Mag = ob1.vel.getMagnitude();
    var vel2Mag = ob2.vel.getMagnitude();
    var theta1 = ob1.vel.getAngle();
    var theta2 = ob2.vel.getAngle();
    
    var normAngle = new Vector({
      x: center1.x - center2.x,
      y: center1.y - center2.y
    }).getAngle();
    var colAngle = normAngle + Math.PI/2;
    
    var ob1VelxRelnorm = vel1Mag * Math.cos(theta1 - normAngle)
    var ob1VelyRelnorm = vel1Mag * Math.sin(theta1 - normAngle)
    var ob2VelxRelnorm = vel2Mag * Math.cos(theta2 - normAngle)
    var ob2VelyRelnorm = vel2Mag * Math.sin(theta2 - normAngle)
  
    var newVel1x = (coeOfRes * ((ob1VelxRelnorm) * (ob1Mass - ob2Mass) + 2 * ob2Mass * ob2VelxRelnorm ) / (ob1Mass + ob2Mass))* Math.cos(normAngle) + ob1VelyRelnorm * Math.cos(colAngle);
    var newVel1y = (coeOfRes * (ob1VelxRelnorm) * (ob1Mass - ob2Mass) + 2 * ob2Mass * ob2VelxRelnorm) / (ob1Mass + ob2Mass) * Math.sin(normAngle) + ob1VelyRelnorm * Math.sin(colAngle)
     
    var newVel2x = (coeOfRes * (ob2VelxRelnorm) * (ob2Mass - ob1Mass) + 2 * ob1Mass * ob1VelxRelnorm) / (ob1Mass + ob2Mass) * Math.cos(normAngle) + ob2VelyRelnorm *  Math.cos(colAngle)
    var newVel2y = (coeOfRes * (ob2VelxRelnorm) * (ob2Mass - ob1Mass) + 2 * ob1Mass * ob1VelxRelnorm) / (ob2Mass + ob1Mass) * Math.sin(normAngle) + ob2VelyRelnorm * Math.sin(colAngle)
    
      ob1.vel = new Vector({ x: newVel1x, y: newVel1y })
      ob2.vel = new Vector({ x: newVel2x, y: newVel2y })
    
  };
  
  Collision.moveApart = function (ob1, ob2) {
    // Should Move Asteroids Apart If They Overlap
  };

  Collision.sizeDiff = function (ob1, ob2) {
    var ob1Size = ob1.radius * ob1.radius;
    var ob2Size = ob2.radius * ob2.radius;
    if (ob1Size > ob2Size) {
      return ob1Size / ob2Size;
    }
    else {
      return ob2Size / ob1Size;
    }
    
  }

  Collision.isCollidedWith = function (ob1, ob2) {
    var distance = ob1.pos.distanceTo(ob2.pos);
    return (distance <= (ob1.radius + ob2.radius));
  };
  
  Collision.merge = function (ob1, ob2) {
    var lObj = ob1 > ob2 ? ob1 : ob2 ; 
    var sObj = ob1 > ob2 ? ob2 : ob1 ; 
    var lObjMass = lObj.radius * lObj.radius;
    var sObjMass = sObj.radius * sObj.radius;
    var newArea = lObjMass + sObjMass;
    var newRadius = Math.sqrt(newArea);
    
    var newMom = lObjMass * lObj.vel.getMagnitude() + sObjMass * sObj.vel.getMagnitude();
    var newVelMag = newMom / newArea;
    var newVel = new Vector({ angle: lObj.vel.getAngle(),
        magnitude: newVelMag });
    var newColor = 'hsla(' + Math.random() * 360 + ', 100%, 70%, 0.6)'
    
    lObj.vel = newVel;
    lObj.color = newColor;
    lObj.radius = newRadius;
    sObj.game.remove(sObj);
    
  };
  
  
})();