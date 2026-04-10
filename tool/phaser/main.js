const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor:'#7632cf',
    scene: ["BootScene", "MenuScene", "GameScene"]
    // physics: {
    //     default: 'arcade'.
    //     arcade: { debug: false}
    };

new Phaser.Game(config)



