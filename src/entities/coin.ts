import { Physics } from 'phaser';
import { AssetsList } from '../consts';
import { CoinModel } from '../models/coin.model';

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Coin extends Physics.Arcade.Sprite {

    static readonly COINANIM = 'rotate';

    constructor(scene: Phaser.Scene, coinModel: CoinModel) {

        // Il faut commencer par appeler le constructeur parent
        // --> Il faut bien passer la bonne texture
        super(scene, coinModel.x, coinModel.y, AssetsList.SPRITESHEET_COINS);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Gestion du corps (comme plateforme)
        // Sinon les pièces tombent ou peuvent bouger
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);

        // Création de l'animation de rotation des pièces
        this.scene.anims.create({
            key: Coin.COINANIM,
            frameRate: 6, // Vitesse de la rotation
            repeat: -1, // Tourne toujours
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_COINS, { frames: [0, 1, 2, 1] })
        });
        // Une fois crée, on la lance
        this.anims.play(Coin.COINANIM, true);

    }

}