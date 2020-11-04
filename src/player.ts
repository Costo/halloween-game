import 'phaser'

interface Keys {
  left: Phaser.Input.Keyboard.Key;
  jump: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
 };

interface Animations {
  left: string;
  right: string;
  looksLeft: string;
  looksRight: string;
}

interface PlayerConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
}

export abstract class Player extends Phaser.Physics.Arcade.Sprite {
    private looksRight: boolean = true;
    private animations: Animations;
    protected keys: Keys;

    constructor (config: PlayerConfig & { texture: string, anims: Animations }) {
      super(config.scene, config.x, config.y, config.texture)

      this.animations = config.anims
    }

    update () {
      if (this.keys.left.isDown) {
        this.looksRight = false
        this.setVelocityX(-320)
        this.anims.play(this.animations.left, true)
      } else if (this.keys.right.isDown) {
        this.looksRight = true
        this.setVelocityX(320)
        this.anims.play(this.animations.right, true)
      } else {
        this.setVelocityX(0)
        this.anims.play(this.looksRight ? this.animations.looksRight : this.animations.looksLeft)
      }

      if (this.keys.jump.isDown && this.body.touching.down) {
        this.setVelocityY(-450)
      }
    }
}

export class Melodie extends Player {
  constructor (config: PlayerConfig) {
    super({
      texture: 'melodie',
      anims: {
        left: 'melodie-left',
        right: 'melodie-right',
        looksLeft: 'melodie-looks-left',
        looksRight: 'melodie-looks-right'
      },
      ...config
    })

    const cursors = this.scene.input.keyboard.createCursorKeys()
    this.keys = {
      left: cursors.left,
      jump: cursors.up,
      right: cursors.right
    }
  }
}

export class Elliot extends Player {
  constructor (config: PlayerConfig) {
    super({
      texture: 'elliot',
      anims: {
        left: 'elliot-left',
        right: 'elliot-right',
        looksLeft: 'elliot-looks-left',
        looksRight: 'elliot-looks-right'
      },
      ...config
    })

    this.keys = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      jump: Phaser.Input.Keyboard.KeyCodes.W,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as Keys
  }
}

export class Robin extends Player {
  constructor (config: PlayerConfig) {
    super({
      texture: 'robin',
      anims: {
        left: 'robin-left',
        right: 'robin-right',
        looksLeft: 'robin-looks-left',
        looksRight: 'robin-looks-right'
      },
      ...config
    })

    const cursors = this.scene.input.keyboard.createCursorKeys()
    this.keys = {
      left: cursors.left,
      jump: cursors.up,
      right: cursors.right
    }
  }
}
