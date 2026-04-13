class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene')
    };

    preload() {
        this.load.image("upper", "https://dummyimage.com/80x80/ff4444/ffffff&text=A");
        this.load.image("number", "https://dummyimage.com/80x80/44ff44/ffffff&text=1");
        this.load.image("symbol", "https://dummyimage.com/80x80/4444ff/ffffff&text=%23");
        this.load.image("length", "https://dummyimage.com/80x80/ffaa00/ffffff&text=L");
    }


    create() {
        this.strength = 0;

        this.barBg = this.add.rectangle(400,100,300,30,0x333333);
        this.barFill = this.add.rectangle(250, 100,0,30,0x333333);

        this.strengthText = this.add.text(80,80, 'Strength: 0',{
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0);

        const icons = [
            { key: 'upper', x: 100, y:200 },
            { key: 'number', x: 250, y: 200 },
            { key: 'symbol', x: 400, y: 200 },
            { key: 'length', x: 550, y: 200 }
        ];

        icons.forEach(icon => {
            const img = this.add.image(icon.x, icon.y, icon.key)
            .setInteractive({ draggable: true });

            img.on('pointerover', () => {
                this.tweens.add ({
                    targets: img,
                    scale: 1.2,
                    duration: 150
                });
            });

            img.on('pointerout', () => {
                this.tweens.add({
                    targets: img,
                    scale: 1,
                    duration: 150
                });
            });

            img.on('drag', (pointer, dragX, dragY) => {
                img.x = dragX;
                img.y = dragY;
            });

            img.on('dragend', () => {
                const dist = Phaser.Math.Distance.Between(img.x, img.y, 400,100);

                if (dist < 120) {
                    this.increaseStrength();
                    this.animateToBar(img);
                } else {
                    this.tweens.add({
                        targets: img,
                        x: icon.x,
                        y: icon.y,
                        duration: 300,
                        ease: 'Back.easeOut'
                    });
                }
            });
        });

    }


increaseStrength() {
    this.strength += 25;
    if (this.strength > 100) {
        this.strength = 100;
    }

    this.strengthText.setText('Strength: ' + this.strength);

    this.tweens.add({
        targets: this.barFill,
        width: 3 * this.strength,
        duration: 300,
        ease: 'Power2'
    });
}

animateToBar(img) {
    this.tweens.add ({
        targets: img,
        x: 400,
        y: 100,
        scale: 0.5,
        alpha: 0,
        duration: 300,
        onComplete: () => img.destroy()
    });
}
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainScene]
};

var game = new Phaser.Game(config);
