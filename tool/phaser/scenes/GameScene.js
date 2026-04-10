class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.add.text(200,200, 'load', {
            fontSize: '40px',
           fill: '#ffffff'
        });

        this.add.text(200,260, 'if you see this then it works', {
            fontSize: '24px',
           fill: '#ffffff'
        })
    }
}
//     create() {
//         this.password = 'corgi123';
//         this.strength = 0;

//         this.add.text(50,40, 'Needs more work!', {
//             fontSize: '28px',
//             fill: 0;
//         });

//         this.passwordText = this.add.text(300,150, this.password, {
//             fontSize: '48px'
//             fill: 0;
//         });

//         this.createStrengthBar();
//         this.createUpgrades();
//         this.createDropZone();
//     }

//     createStrengthBar() {
//         this.add.text(50,220, 'Strength:', { fontSize: '22px', fill: 0;})

//         this.strengthBarBg = this.add.rectangle(180,230,300,25,0)
//         this.strengthBar = this.add.rectangle(180,230,0,25,0)
//     };

//     createDropZone() {
//         this.dropZone = this.add.zone(400, 150,300,100).setRectangleDropZone(300,100)

//         this.dropZone.setData('type', 'password');
//     }

//     createUpgrades() {
//         const upgrades = [
//             { key : 'upper', type: 'upper', x: 150 },
//             { key: 'number', type: 'number', x: 300 },
//             { key: 'symbol', type:'symbol', x: 450 },
//             { key: 'length', type: 'length', x: 600}
//         ];

//         upgrade.forEach ({
//             let icon = this.add.image(u.x, 450, .key).setInteractive();
//             icon.upgradeType = u.type;

//             this.input.setDraggable(icon)
//         });

//         this.input.on('drag', (pointer,obj, x, y){
//             this.applyUpgrade(obj.upgradeType);
//             obj.destroy()
//         });
//     }

//     applyUpgrade(type) {
//         if(type = 'upper') {
//             this.strength += 25
//         };

//         if(type = 'number') {
//             this.strength +=25
//         };

//         if(type = 'symbol') {
//             this.strength += 25
//         };

//         if(type = 'length') {
//             this.strength += 25
//         };

//         this.strengthBar.width = this.strength * 3;

//         if (this.strength > 100) {
//             this.add.text(250, 300 , "Password is good!", {
//                 fontSize: '36px',
//                 fill: 0;
//             })
//         }

//     }
// }


