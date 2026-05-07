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

     shuffle(array) {
            for(let i = array.length -1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                [array[i], array[j]] =[array[j], array[i]]
            }
        }

    create() {
        this.strength = 0;

        this.barBg = this.add.rectangle(400,100,300,30,0x333333);
        this.barFill = this.add.rectangle(250, 100,0,30,0x333333);

        this.strengthText = this.add.text(100,80, 'Strength: 0',{
            fontSize: '32px',
            fill: '#ffffff'
        });

        let icons = [
            { key: 'upper', x: 100, y:200 },
            { key: 'number', x: 250, y: 200 },
            { key: 'symbol', x: 400, y: 200 },
            { key: 'length', x: 550, y: 200 }
        ];

        this.shuffle(icons);

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

        this.passwordInput = document.getElementById('passwordInput');
        this.input.keyboard.on('keydown-ENTER', () => {
            this.checkPasswordStrength(this.passwordInput.value);
        });

        this.timeLeft = 30;
        this.points = 0;

        this.timerText = this.add.text(600,50, 'Time: 45',{
            fontSize:'32px',
            color: '#7632cf'
        });

        this.pointsText = this.add.text(600, 100, 'Points: 0',{
            fontSize: '32px',
            color: '#7632cf'
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
                this.timeText.setText('Time: ' + this.timeLeft);

                if(this.timeLeft <= 0) {
                    this.scene.restart();
                }
            },
            loop: true
        });

        addTime(scrore) {
            if(score === 100) {
                this.timeLeft += 10;
            } else if (score >= 75) {
                this.timeLeft += 7;
            } else if (score >= 50) {
                this.timeLeft += 5;
            } else if(score >= 25) {
                this.timeLeft += 3;
            } else {
                this.timeLeft += 1;
            }
            this.timerText.setText('Time: ' + this.timeLeft);
        }

        addPoints(score) {
            this.points += score;
            this.pointsText.setText('Points: ' + this.points);
        }

        this.keyInputs = []
        let password = this.keyInputs.join('');

        this.input.keyboard.on('keydown', (event) => {
            if (event.key.length === 1){
                this.keyInputs.push(event.key);
                console.log(this.keyInputs)
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            let password = this.keyInputs.join('');
            this.checkPasswordStrength(password);
            this.keyInputs = [];
        });

        let hasUpper = false;
        for(let i = 0; i < password.length; i++) {
            if(password[i] >= 'A' && password[i] <= 'Z') {
                hasUpper = true;
                break;
            }
        }

        let hasNumber = false;
        for(let i = 0; i < password.length; i++) {
            if(password[i] >= '0' && password[i] <= '9') {
                hasNumber = true;
                break;
            }
        }

        let hasSymbol = false;
        for(let i = 0; i < password.length; i++) {
            let c = password[i];
            if(!((c >= 'A' && c <= 'Z') ||
                (c >= 'a' && c <= 'z') ||
                (c >= '0' && c <= '9'))) {
                    hasSymbol = true;
                    break;
                }
            }
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

    if(this.strength === 100) {
        this.time.delayedCall(800, () => {
            this.scene.restart();
        });
    }
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
