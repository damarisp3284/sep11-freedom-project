class BootScene extends Phaser.Scene {
    constructor(){
        super('BootScene');
    }

    preload() {
        this.load.image('upper', "https://dummyimage.com/80x80/44ff44/ffffff&text=1");
        this.load.image('number',"https://dummyimage.com/80x80/44ff44/ffffff&text=1")
        this.load.image('symbol', "https://dummyimage.com/80x80/4444ff/ffffff&text=%23")
        this.load.image('length', "https://dummyimage.com/80x80/ffaa00/ffffff&text+++")
    }

    create() {
        this.scene.start('MenuScene');
    }
}
