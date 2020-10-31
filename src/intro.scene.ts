import 'phaser'

type BodySetAllowGravity = {
  setAllowGravity(value: boolean)
}
type SpriteSetAllowGravity = {
  body: BodySetAllowGravity
}

export class Intro extends Phaser.Scene {
  constructor () {
    super('intro')
  }

  preload () {
    this.load.spritesheet('pumpkin', 'assets/citrouille100.png', { frameWidth: 100, frameHeight: 72 })
  }

  create () {
    this.anims.create({
      key: 'pumpkin-anim',
      frames: this.anims.generateFrameNumbers('pumpkin', {}),
      frameRate: 8,
      repeat: -1
    })

    const pumpkins = this.physics.add.group()
    const pumpkin1 = pumpkins.create(660, 525, 'pumpkin') as (Phaser.Physics.Arcade.Sprite & SpriteSetAllowGravity)
    pumpkin1.play('pumpkin-anim')
    pumpkin1.body.setAllowGravity(false)

    const pumpkin2 = pumpkins.create(60, 525, 'pumpkin') as (Phaser.Physics.Arcade.Sprite & SpriteSetAllowGravity)
    pumpkin2.setFlipX(true).play('pumpkin-anim')
    pumpkin2.body.setAllowGravity(false)

    this.add.text(400, 100, 'L\'Halloween d\'Elliot et Robin', { fontSize: '32px', fill: '#fff' })
      .setOrigin(0.5)
    this.add.text(400, 200, 'Loading...', { fontSize: '16px', fill: '#fff' })

    window.setTimeout(() => {
      this.game.scene.start('demo')
    }, 3000)
  }

  update () {

  }
}
