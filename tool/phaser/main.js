<<<<<<< HEAD
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets here
}

function create() {
    this.add.text(100, 100, 'Hello Phaser!', { font: '32px Arial', fill: '#ffffff' });
}
=======
>>>>>>> parent of 84cf420 (Sat, Nov 8, 2025, 5:20 PM -05:00)
