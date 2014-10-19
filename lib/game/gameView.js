 (function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game;

  var GameView = Asteroids.GameView = function (options) {
    this.game = options.game;
    this.context = options.context;
    this.gameLoop = ''; 
    this.bindKeyHandlers();
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.gameLoop = setInterval(function () {
      gameView.game.draw(gameView.context);
      gameView.game.step();
    }, 13);
  };
  
  GameView.prototype.pause = function () {
    clearInterval(this.gameLoop);
    this.gameLoop = undefined;
  };
  
  GameView.prototype.toggle = function () {
    console.log(this.gameLoop)
    if (this.gameLoop) {
      this.pause();
    } else {
      this.start();
    }
  }
  
  

  GameView.prototype.bindKeyHandlers = function () {
    var gameView = this;
    var powerUp = this.game.ship.power.bind(this.game.ship, 1.5);
    var powerDown = this.game.ship.power.bind(this.game.ship, .6);
    var turnLeft = this.game.ship.turn.bind(this.game.ship, -1);
    var turnRight = this.game.ship.turn.bind(this.game.ship, 1);
    var fire = this.game.ship.fireBullet.bind(this.game.ship);
    key('left', function () { turnLeft(); } );
    key('right',  function () { turnRight(); } );
    key('up',  function () { powerUp(); });    
    key('down',  function () { powerDown(); });
    key('space', function () { fire(); });
    key('pause',  function () { gameView.toggle(); });    
  };
})();