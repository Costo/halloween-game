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
    this.load.spritesheet('play-btn', 'assets/playbutton.png', { frameWidth: 120, frameHeight: 60 })
  }

  create () {
    this.anims.create({
      key: 'pumpkin-anim',
      frames: this.anims.generateFrameNumbers('pumpkin', {}),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: 'play-pressed',
      frames: this.anims.generateFrameNumbers('play-btn', { frames: [1] }),
      frameRate: 10,
    })

    const btn = this.add.sprite(400, 250, 'play-btn')
      .setInteractive()
      .on('pointerdown', () => {
        btn.play('play-pressed')
        this.add.text(400, 350, 'Chargement...', { fontSize: '16px', fill: '#fff' })
          .setOrigin(0.5)
        this.game.scene.start('demo')
      })

    const pumpkins = this.physics.add.group()
    const pumpkin1 = pumpkins.create(660, 525, 'pumpkin') as (Phaser.Physics.Arcade.Sprite & SpriteSetAllowGravity)
    pumpkin1.play('pumpkin-anim')
    pumpkin1.body.setAllowGravity(false)

    const pumpkin2 = pumpkins.create(60, 525, 'pumpkin') as (Phaser.Physics.Arcade.Sprite & SpriteSetAllowGravity)
    pumpkin2.setFlipX(true).play('pumpkin-anim')
    pumpkin2.body.setAllowGravity(false)

    this.add.text(400, 100, 'L\'Halloween de Mélodie', { fontSize: '32px', fill: '#fff' })
      .setOrigin(0.5)

  }

  update () {

  }
}
