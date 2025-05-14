<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Batalha de Bots</title>
  <style>
    body {
      margin: 0;
      background: #222;
    }
    .crosshair {
      cursor: crosshair;
    }
  </style>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>
<script>
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#333',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let player, cursors;
let bots = [];
let crosshairActive = false;
let missiles = [];
let botMissiles = [];
const MAX_BOTS = 10;

function preload() {}

function create() {
  this.input.keyboard.addCapture(['F2', 'F3', 'DOWN', 'LEFT', 'RIGHT']);

  this.cameras.main.setBounds(0, 0, 4000, 4000);
  this.physics.world.setBounds(0, 0, 4000, 4000);

  player = criarPersonagem.call(this, 2000, 2000, 0x0000ff, true);
  this.cameras.main.startFollow(player.sprite);

  cursors = this.input.keyboard.createCursorKeys();

  for (let i = 0; i < MAX_BOTS; i++) {
    criarBot.call(this);
  }

  this.input.keyboard.on('keydown-F2', () => {
    crosshairActive = true;
    document.body.classList.add('crosshair');
  });

  this.input.on('pointerdown', (pointer) => {
    if (!crosshairActive || !player.alive) return;
    crosshairActive = false;
    document.body.classList.remove('crosshair');

    const worldPoint = pointer.positionToCamera(this.cameras.main);

    bots.forEach(bot => {
      if (!bot.alive) return;

      const botBounds = bot.sprite.getBounds();
      const cameraView = this.cameras.main.worldView;

      const isBotVisible = Phaser.Geom.Rectangle.Overlaps(cameraView, botBounds);

      if (Phaser.Geom.Rectangle.Contains(botBounds, worldPoint.x, worldPoint.y) && isBotVisible) {
        const m = this.add.circle(player.sprite.x, player.sprite.y, 5, 0x000000);
        this.physics.add.existing(m);
        m.body.setCircle(5);
        m.target = bot;
        missiles.push(m);
      }
    });
  });

  // Ataque automático dos bots
  this.time.addEvent({
    delay: 1500,
    loop: true,
    callback: () => {
      bots.forEach(bot => {
        if (!bot.alive) return;
        
        const alvo = escolherAlvoAleatorio(bot);
        if (!alvo) return;

        const cameraView = this.cameras.main.worldView;
        const alvoBounds = alvo.sprite.getBounds();

        // Verifica se o alvo (bot ou jogador) está visível na tela
        const isAlvoVisivel = Phaser.Geom.Rectangle.Overlaps(cameraView, alvoBounds);

        if (isAlvoVisivel) {
          const m = this.add.circle(bot.sprite.x, bot.sprite.y, 5, 0x000000);
          this.physics.add.existing(m);
          m.body.setCircle(5);
          m.target = alvo;
          botMissiles.push(m);
        }
      });
    }
  });

  // Movimentação dos bots
  this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: () => {
      bots.forEach(bot => {
        if (!bot.alive) return;
        const dir = Phaser.Math.Between(0, 3);
        const speed = 100;
        bot.sprite.body.setVelocity(0);
        if (dir === 0) bot.sprite.body.setVelocityX(speed);
        if (dir === 1) bot.sprite.body.setVelocityX(-speed);
        if (dir === 2) bot.sprite.body.setVelocityY(speed);
        if (dir === 3) bot.sprite.body.setVelocityY(-speed);
      });
    }
  });
}

function update() {
  if (player.alive) {
    const speed = 200;
    player.sprite.body.setVelocity(0);
    if (cursors.left.isDown) player.sprite.body.setVelocityX(-speed);
    if (cursors.right.isDown) player.sprite.body.setVelocityX(speed);
    if (cursors.up.isDown) player.sprite.body.setVelocityY(-speed);
    if (cursors.down.isDown) player.sprite.body.setVelocityY(speed);
    atualizarBarra(player);
  }

  bots.forEach(bot => {
    if (bot.alive) atualizarBarra(bot);
  });

  // Colisão mísseis do player com bots
  missiles.forEach((m, i) => {
    if (m.target && m.target.alive) {
      this.physics.moveTo(m, m.target.sprite.x, m.target.sprite.y, 500);

      if (this.physics.overlap(m, m.target.sprite)) {
        m.destroy();
        missiles.splice(i, 1);
        m.target.life -= 50;
        if (m.target.life <= 0) matarPersonagem.call(this, m.target);
      }
    }
  });

  // Colisão mísseis dos bots com o jogador
  botMissiles.forEach((m, i) => {
    if (m.target && m.target.alive) {
      this.physics.moveTo(m, m.target.sprite.x, m.target.sprite.y, 400);

      if (this.physics.overlap(m, m.target.sprite)) {
        m.destroy();
        botMissiles.splice(i, 1);
        m.target.life -= 20;
        if (m.target.life <= 0) matarPersonagem.call(this, m.target);
      }
    }
  });
}

// Funções auxiliares
function criarPersonagem(x, y, color, isPlayer = false) {
  const sprite = this.add.rectangle(x, y, 40, 40, color);
  this.physics.add.existing(sprite);
  sprite.body.setCollideWorldBounds(true);
  return {
    sprite,
    bar: this.add.graphics(),
    life: 100,
    alive: true,
    isPlayer
  };
}

function criarBot() {
  let x, y;
  let attempts = 0;
  do {
    x = Phaser.Math.Between(100, 3900);
    y = Phaser.Math.Between(100, 3900);
    attempts++;
  } while (Phaser.Math.Distance.Between(x, y, player.sprite.x, player.sprite.y) < 100 && attempts < 20);

  const corAleatoria = Phaser.Display.Color.RandomRGB().color;
  const bot = criarPersonagem.call(this, x, y, corAleatoria);
  bots.push(bot);
}

function atualizarBarra(personagem) {
  const { x, y } = personagem.sprite;
  personagem.bar.clear();
  personagem.bar.fillStyle(0x000000);
  personagem.bar.fillRect(x - 20, y - 30, 40, 5);
  personagem.bar.fillStyle(0x00ff00);
  personagem.bar.fillRect(x - 20, y - 30, (personagem.life / 100) * 40, 5);
}

function matarPersonagem(personagem) {
  personagem.alive = false;
  personagem.sprite.destroy();
  personagem.bar.destroy();

  setTimeout(() => {
    if (personagem.isPlayer) {
      player = criarPersonagem.call(this, 2000, 2000, 0x0000ff, true);
      this.cameras.main.startFollow(player.sprite);
    } else {
      criarBot.call(this);
    }
  }, 500);
}

function escolherAlvoAleatorio(bot) {
  const alvos = bots.filter(b => b !== bot && b.alive);
  if (player.alive) alvos.push(player);
  return Phaser.Utils.Array.GetRandom(alvos);
}


</script>
</body>
</html>
