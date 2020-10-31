import 'phaser'
import { Player, Elliot, Robin } from './player'
import { Cloud } from './cloud'

export class Demo extends Phaser.Scene {
    constructor () {
      super('demo')
    }

    preload () {
      this.load.audio('ghost', ['assets/sound-effects/ghost.mp3'])
      this.load.audio('music', ['assets/sound-effects/music.ogg', 'assets/sound-effects/music.mp3'])
      this.load.audio('crunch', ['assets/sound-effects/Blop-Mark_DiAngelo-79054334.mp3'])
      this.load.image('key-particle', 'assets/blingparticule.png')
      this.load.image('sky', 'assets/sky.png')
      this.load.image('bg', 'assets/fond2.png')
      this.load.image('ground', 'assets/platform.png')
      this.load.image('ground-clear', 'assets/platformtransparente.png')
      this.load.image('cloud1', 'assets/nuage1.png')
      this.load.image('cloud2', 'assets/nuage2.png')
      this.load.image('sweet2', 'assets/chocolat.png')
      this.load.spritesheet('key', 'assets/key40.png', { frameWidth: 40, frameHeight: 44 })
      this.load.spritesheet('fire', 'assets/flamme40.png', { frameWidth: 40, frameHeight: 36 })
      this.load.spritesheet('ghost', 'assets/fantome60avecscintillement.png', { frameWidth: 60, frameHeight: 94 })
      this.load.spritesheet('cauldron', 'assets/petitchaudron40.png', { frameWidth: 40, frameHeight: 56 })
      this.load.spritesheet('pumpkin', 'assets/citrouille100.png', { frameWidth: 100, frameHeight: 72 })
      this.load.spritesheet('chest', 'assets/coffresprite100.png', { frameWidth: 100, frameHeight: 100 })
      this.load.spritesheet('sweet1', 'assets/bonbon32.png', { frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet('robin', 'assets/persorobin.png', { frameWidth: 32, frameHeight: 48 })
      this.load.spritesheet('elliot', 'assets/persoelliot.png', { frameWidth: 32, frameHeight: 48 })
    }

    gameOver = false;
    keyCollected = false;

    crunch: Phaser.Sound.BaseSound;
    ghost: Phaser.Sound.BaseSound;
    particles: Phaser.GameObjects.Particles.ParticleEmitterManager
    chest: Phaser.Physics.Arcade.Sprite;
    key: Phaser.Physics.Arcade.Sprite;
    clouds: Phaser.Physics.Arcade.Group;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player1: Player;
    player2: Player;
    sweets: Phaser.Physics.Arcade.Group;

    create () {
      const music = this.sound.add('music')
      music.play({
        loop: true
      })
      this.ghost = this.sound.add('ghost')

      this.add.image(0, 0, 'sky').setOrigin(0, 0)

      this.clouds = this.physics.add.group([
        new Cloud({ scene: this, texture: 'cloud1', x: 200, y: 20, velocity: 5 }),
        new Cloud({ scene: this, texture: 'cloud2', x: -400, y: -80, velocity: 10 })
      ])
      this.clouds.runChildUpdate = true

      this.add.image(0, 0, 'bg').setOrigin(0, 0)

      this.platforms = this.physics.add.staticGroup()

      this.platforms.create(200, 589, 'ground-clear')
      this.platforms.create(600, 589, 'ground-clear')

      this.platforms.create(200, 449, 'ground')
      this.platforms.create(774, 449, 'ground')

      this.platforms.create(200, 323, 'ground')
      this.platforms.create(497, 323, 'ground')

      this.platforms.create(617, 184, 'ground')

      this.anims.create({
        key: 'key-anim',
        frames: this.anims.generateFrameNumbers('key', {}),
        frameRate: 8,
        repeat: -1
      })
      this.anims.create({
        key: 'pumpkin-anim',
        frames: this.anims.generateFrameNumbers('pumpkin', {}),
        frameRate: 8,
        repeat: -1
      })
      this.anims.create({
        key: 'chest-anim',
        frames: this.anims.generateFrameNumbers('chest', {}),
        frameRate: 8
      })
      this.anims.create({
        key: 'fire-anim',
        frames: this.anims.generateFrameNumbers('fire', { frames: [0, 1] }),
        frameRate: 8,
        repeat: -1
      })
      this.anims.create({
        key: 'ghost-anim',
        frames: this.anims.generateFrameNumbers('ghost', { frames: [0, 1] }),
        frameRate: 2,
        repeat: -1
      })
      this.anims.create({
        key: 'cauldron-anim',
        frames: this.anims.generateFrameNumbers('cauldron', { frames: [0, 1] }),
        frameRate: 2,
        repeat: -1
      })

      this.anims.create({
        key: 'sweets',
        frames: this.anims.generateFrameNumbers('sweet1', { frames: [0, 1] }),
        frameRate: 3,
        repeat: -1
      })

      this.anims.create({
        key: 'elliot-looks-right',
        frames: [{ key: 'elliot', frame: 5 }],
        frameRate: 20
      })
      this.anims.create({
        key: 'elliot-looks-left',
        frames: [{ key: 'elliot', frame: 2 }],
        frameRate: 20
      })

      this.anims.create({
        key: 'elliot-left',
        frames: this.anims.generateFrameNumbers('elliot', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'elliot-right',
        frames: this.anims.generateFrameNumbers('elliot', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'robin-looks-right',
        frames: [{ key: 'robin', frame: 5 }],
        frameRate: 20
      })

      this.anims.create({
        key: 'robin-looks-left',
        frames: [{ key: 'robin', frame: 2 }],
        frameRate: 20
      })

      this.anims.create({
        key: 'robin-left',
        frames: this.anims.generateFrameNumbers('robin', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'robin-right',
        frames: this.anims.generateFrameNumbers('robin', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      })

      this.add.sprite(487, 418, 'ghost').play('ghost-anim')
      this.add.sprite(312, 522, 'cauldron').play('cauldron-anim')
      this.add.sprite(312, 553, 'fire').play('fire-anim')
      this.chest = this.physics.add.sprite(720, -50, 'chest')
      const pumpkins = this.physics.add.group();
      (pumpkins.create(660, 525, 'pumpkin') as Phaser.Physics.Arcade.Sprite)
        .play('pumpkin-anim');
      (pumpkins.create(60, 525, 'pumpkin') as Phaser.Physics.Arcade.Sprite)
        .setFlipX(true)
        .play('pumpkin-anim')
      this.key = this.physics.add.sprite(155, -22, 'key')
      this.key.removeInteractive()
      this.key.play('key-anim');
      (this.key.body as any).setAllowGravity(false)
      this.particles = this.add.particles('key-particle')

      this.player1 = new Robin({
        scene: this,
        x: 100,
        y: 450
      })

      this.player2 = new Elliot({
        scene: this,
        x: 700,
        y: 450
      })

      this.physics.add.collider([this.player1, this.player2, this.chest], this.platforms)
      this.physics.add.collider(pumpkins, this.platforms)

      this.sweets = this.physics.add.group()
      for (let i = 0; i < 40; i++) {
        this.addCandy()
      }

      this.sweets.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4))
      })
      this.physics.add.collider(this.sweets, this.platforms)
      this.physics.add.overlap([this.player1, this.player2], this.sweets, this.collectStar, null, this)

      this.physics.add.collider(this.player1, this.player2, null, null, this)
    }

  private addCandy() {
    if (!this.sweets) {
      return
    }
    const x = 10 + Math.random() * 780
    const y = 10 + Math.random() * 548
    const texture = ['sweet1', 'sweet2'][Math.floor(Math.random() * 2)]
    if (texture === 'sweet1') {
      this.sweets.create(x, y, texture).play('sweets', false, Math.floor(2 * Math.random()))
    } else {
      this.sweets.create(x, y, texture)
    }
  }

    update () {
      this.player1.update()
      this.player2.update()
    }

    collectStar (player, star) {
      this.sound.play('crunch')
      star.disableBody(true, true)

      window.setTimeout(() => {
        this.addCandy()
      }, 30 * 1000);

      if (this.sweets.countActive(true) === 0) {
        this.sweets = null
        const emitter = this.particles.createEmitter({
          blendMode: 'ADD',
          angle: {
            min: 0,
            max: 360
          },
          speed: 20,
          alpha: {
            start: 1,
            end: 0
          }
        })
        emitter.startFollow(this.key)
        this.physics.moveTo(this.key, 155, 495, null, 10 * 1000)

        window.setTimeout(() => {
          this.key.setVelocity(0)
          this.key.setInteractive()
          this.key.setCollideWorldBounds(true)
          this.physics.add.collider([this.key], this.platforms)
          this.physics.add.overlap([this.player1, this.player2], this.key, this.collectKey, null, this)
          this.physics.add.overlap(this.chest, this.key, this.openChest, () => !this.gameOver, this)
        }, 10 * 1000)
      }
    }

    interval: number | undefined

    collectKey (player, key: Phaser.Physics.Arcade.Sprite) {
      if (this.particles) {
        this.particles.destroy()
        this.particles = null
      }
      if (!this.keyCollected) {
        this.physics.moveToObject(key, player, 120)
        this.keyCollected = true
      }
      window.clearInterval(this.interval)
      this.interval = window.setInterval(() => {
        const dist = Phaser.Math.Distance.Between(player.x, player.y, key.x, key.y)
        if (dist > 50) {
          this.physics.moveToObject(key, player, 120)
        } else {
          key.setVelocity(0)
        }
      }, 100)
    }

    openChest (chest: Phaser.Physics.Arcade.Sprite, key: Phaser.Physics.Arcade.Sprite) {
      this.gameOver = true
      chest.play('chest-anim', true)
      this.ghost.play()
      key.destroy()
      window.clearInterval(this.interval)
    }
}
