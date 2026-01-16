let player;
let cursors;
let platforms;
let stars;

let score = 0;
let scoreText;

let health = 3;
let healthText;


const config = {
    type: Phaser.AUTO,
    width : 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: { preload, create, update }
};


new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png');
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.spritesheet('dude',
        'https://labs.phaser.io/assets/sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create () {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

     this.physics.add.collider(stars, platforms);
     this.physics.add.overlap(player, stars, collectStar, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#fff'
    });

     healthText = this.add.text(16, 50, 'Health: 3', {
        fontSize: '32px',
        fill: '#fff'
    });

    enemies = this.physics.add.group();

       spawnEnemy.call(this, 400, 450);
       spawnEnemy.call(this, 700, 200);

     this.physics.add.collider(enemies, platforms);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
}


function update() {
    if (cursors.left.isDown)
        { player.setVelocityX(-160);
          player.anims.play('left', true);
     } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    } if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    enemies.children.iterate(enemy => { if (enemy.body.blocked.right) {
        enemy.setVelocityX(-50);
    } else if (enemy.body.blocked.left) {
        enemy.setVelocityX(50); }
    });
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
 }


function spawnEnemy(x, y) {
    const enemy = enemies.create(x, y, 'dude');
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocityX(50);
}


function hitEnemy(player, enemy) {
  health -= 1;
  healthText.setText('Health: ' + health);

  player.setVelocityY(-200);

  player.setTint(0xff0000);
  setTimeout(() => player.clearTint(), 200);

  if (health <= 0) {
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.physics.pause();

    setTimeout(() => {
      this.scene.restart();
      health = 3;
    }, 1000);
  }
}



