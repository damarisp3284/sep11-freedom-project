class MenuScene extents Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.text(200,200 'Password Strength Puzzle',{
            fontSize: '40px',
           fill: '#ffffff'
        });

        this.add.text(260, 300, 'Click to start', {
            fontSize: '24px',
           fill: '#ffffff'
        });

        this.input.on('pointerdown', () {
            this.scene.start('GameScene')
        });
    }
}
