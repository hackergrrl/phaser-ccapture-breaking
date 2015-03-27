var playState = {

  preload: function() {
    game.load.image('bunny', 'bunny.png');
  },

  create: function() {
    game.stage.backgroundColor = 0x050505;

    game.bunny = game.add.sprite(256, 256, 'bunny');
    game.bunny.anchor.set(0.5, 0.5);
    game.bunny.scale.set(3, 3);

    var capturer = new CCapture( { framerate: 15, format: 'gif', workersPath: './' } );
    game.recording = false;
    game.capturer = capturer;

    game.keyIsDown = false;

    game.lastUpdate = (new Date()).getTime();
  },

  update: function() {
    var now = (new Date()).getTime();
    var dt = (now - game.lastUpdate) / 1000;
    game.lastUpdate = now;

    game.bunny.rotation += 1.5 * dt;

    if (!game.keyIsDown && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.keyIsDown = true;
      if (game.recording) {
        game.capturer.stop();
        game.capturer.save(function( url ) { window.location = url; console.log(url); });
        game.recording = false;
      } else {
        game.capturer.start();
        game.recording = true;
      }
    }
    if (game.keyIsDown && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.keyIsDown = false;
    }
  },

  render: function() {
    if (game.recording) {
      game.capturer.capture(game.canvas);
    }
  }
};

game = new Phaser.Game(800, 600);
game.state.add('play', playState);
game.state.start('play');

