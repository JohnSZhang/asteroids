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
    var player = this.game.playerShip;
    var gameView = this;
    var powerUp = player.power.bind(player, 1.5);
    var powerDown = player.power.bind(player, .6);
    var turnLeft = player.turn.bind(player, -1);
    var turnRight = player.turn.bind(player, 1);
    var fire = player.fireBullet.bind(player);
    
    key('left', function () { turnLeft(); } );
    key('right',  function () { turnRight(); } );
    key('up',  function () { powerUp(); });    
    key('down',  function () { powerDown(); });
    key('space', function () { fire(); });
    key('pause',  function () { gameView.toggle(); });    
  };
})();