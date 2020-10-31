interface CloudConfig {
  scene: Phaser.Scene;
  texture: 'cloud1'|'cloud2';
  x: number;
  y: number;
  velocity: number;
}
export class Cloud extends Phaser.Physics.Arcade.Sprite {
  constructor (private config: CloudConfig) {
    super(config.scene, config.x, config.y, config.texture)
    this.setOrigin(0, 0)
    config.scene.add.existing(this)
    config.scene.physics.add.existing(this)

    this.setVelocityX(config.velocity);
    (this.body as any).setAllowGravity(false)
  }

  update () {
    if (!this.scene.cameras.main.worldView.width) {
      // width is initially 0
      return
    }
    if (this.x > this.scene.cameras.main.worldView.width) {
      this.setX(-this.width)
    }
  }
}
