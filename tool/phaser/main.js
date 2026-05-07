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

     this.inputbox = this.add.rectangle(400, 550, 700, 50, 0xffffff).setStrokeStyle(2, 0x000000).setOrigin(0.5);

    this.typedText = this.add.text(60, 550, '', {
        fontSize: '28px',
        color: '#5fc998'
    });

    this.maxChars = 25;
    this.keyInputs = []

    this.timeLeft = 45;
    this.points = 0;

    this.timerText = this.add.text(600,50, 'Time: 45',{
            fontSize:'32px',
            color: '#6c1ddb'
        });

        this.pointsText = this.add.text(600, 90, 'Points: 0',{
            fontSize: '32px',
            color: '#6c1ddb'
        });

        this.strengthText = this.add.text(580, 130, 'Strength: 0', {
            fontSize: '32px',
            color: '#6c1ddb'
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.tickTimer,
            callbackScope: this
        });


    this.input.keyboard.on('keydown', (event) => {
            if (event.key.length === 1) {
                if (this.keyInputs.length < this.maxChars) {
                this.keyInputs.push(event.key);
            }
        }


        if (event.key === "Backspace") {
            this.keyInputs.pop();
        }

        let password = this.keyInputs.join('');
        this.typedText.setText(password);
        this.updateLiveStrength(password);

    });

    this.input.keyboard.on('keydown-ENTER', () => {
            let password = this.keyInputs.join('');
            this.checkPasswordStrength(password);

            this.keyInputs = []
            this.typedText.setText('');
        });


     this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.tickTimer,
            callbackScope: this,
            loop: true
        });
    }

    tickTimer() {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);

        if (this.timeLeft <= 0) {
            this.timerEvent.remove();

            this.scene.start('GameOverScene', {
                score: this.points
            });
        }
    }

    updateLiveStrength(password) {
        let score = 0;

        if (password.length >= 8){
            score += 25;
        }

        let hasUpper = [...password].some(c => c >= 'A' && c <= 'Z');
        if (hasUpper) {
            score += 25;
        }

        let hasNumber = [...password].some(c => c >= '0' && c <= '9');
        if (hasNumber) {
            score += 25;
        }

        let hasSymbol = [...password].some(c =>
            !((c >= 'A' && c <= 'Z') ||
              (c >= 'a' && c <= 'z') ||
              (c >= '0' && c <= '9'))
        );
        if (hasSymbol) {
            score += 25;
        }

        this.strengthText.setText('Strength: ' + score);

         if(score <= 25){
            this.shakeInputBox();
        }

        if(score === 100) {
            this.flashGreen();
        }
    }


    checkPasswordStrength(password) {
        let score = 0;

        if (password.length >= 8) score += 25;
        if ([...password].some(c => c >= 'A' && c <= 'Z')) {
            score += 25;
        }

        if ([...password].some(c => c >= '0' && c <= '9')) {
            score += 25;
        }

        if ([...password].some(c =>
            !((c >= 'A' && c <= 'Z') ||
              (c >= 'a' && c <= 'z') ||
              (c >= '0' && c <= '9'))
        ))

        this.strengthText.setText('Strength: ' + score);

        this.addTime(score);
        this.addPoints(score);
    }

    shakeInputBox() {
        this.tweens.add({
            targets: this.inputbox,
            x: {from: 400 - 10, to: 400 + 10},
            duration: 50,
            yoyo: true,
            repeat: 4
        });
    }

     flashGreen() {
        this.tweens.add({
            targets: this.inputbox,
            fillColor: 0x00ff00,
            duration: 150,
            yoyo: true
        });
    }

    addTime(score) {
        if(score === 100) {
            this.timeLeft += 10;
        } else if(score >= 75) {
            this.timeLeft += 7;
        } else if (score >= 50) {
            this.timeLeft += 5;
        } else if (score >= 25) {
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

}

class GameOverScene extends Phaser.Scene{
        constructor() {
            super('GameOverScene');
        }

        init(data) {
            this.finalScore = data.score;
        }

        create() {
            this.add.text(400,200, 'GAME OVER', {
                fontSize: '64px',
                color: '#db1d39'
            }).setOrigin(0.5);

            this.add.text(400,300, 'Your Score: ' + this.finalScore, {
                fontSize: '40px',
                color: '#4fd687'
            }).setOrigin(0.5);

            const playAgain = this.add.text(400,450, 'PLAY AGAIN', {
                fontSize: '28px',
                color: '#2ed149',
                fontStyle: 'bold'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            playAgain.on('pointerover', () => {
                playAgain.setColor('#2ed149');
            });

            playAgain.on('pointerout', () => {
                playAgain.setColor('#2ed149')
            });

            playAgain.on('pointerdown', () => {
                this.scene.start('MainScene')
            });
        }
    }

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d92db',
    scene: [MainScene, GameOverScene]
};

var game = new Phaser.Game(config);
