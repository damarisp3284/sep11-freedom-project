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
       this.typedText = this.add.text(50, 30, '', {
            fontSize:'28px',
            color:'#5fc998'
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
                this.timerText.setText('Time: ' + this.timeLeft);

                if(this.timeLeft <= 0) {
                    this.scene.restart();
                }
            },
            loop: true
        });

        this.input.keyboard.on('keydown', (event) => {
            if (event.key.length === 1){
                this.keyInputs.push(event.key);
                this.typedText.setText(this.keyInputs.join(''));
            }

            if(event.key === 'Backspace') {
                this.keyInputs.pop();
                this.typedText(this.keyInputs.join (''));
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            let password = this.keyInputs.join('');
            this.checkPasswordStrength(password);

            this.keyInputs = []
            this.typedText.setText('');
        })

    }

    checkPasswordStrength(password) {
        let score = 0;

        if(password.length >= 8) {
            score += 25
        };

        let hasUpper = false;
        for(let c of password) {
            if(c >= 'A' && c <= 'Z') {
                hasUpper = true;
                break;
            }
        }
        if (hasUpper) {
            score += 25
        };

        let hasNumber = false;
        for(let c of password) {
            if(c >= '0' && c <= '9') {
                hasNumber = true;
                break;
            }
        }
        if(hasNumber) {
            score += 25
        };

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
            if(hasSymbol) {
                score += 25
            };

            this.strengthText.setText('Strength: ' + score);

            this.addTime(score);
            this.addPoints(score);

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

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainScene]
};

var game = new Phaser.Game(config);
