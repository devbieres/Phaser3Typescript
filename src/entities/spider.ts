import { Physics } from 'phaser';
import { AssetsList } from '../consts';
import { SpiderModel } from '../models/spider.model';

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Spider extends Physics.Arcade.Sprite {

    static readonly MOVEANIM = 'move';
    static readonly DIEANIM = 'die';
    static readonly SPEED = 100;

    constructor(scene: Phaser.Scene, spiderModel: SpiderModel) {

        // Il faut commencer par appeler le constructeur parent
        // --> Il faut bien passer la bonne texture
        super(scene, spiderModel.x, spiderModel.y, AssetsList.SPRITESHEET_Spider);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Quelques ajustements 
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true); // au cas où pour qu'ils sortent du jeu,
        body.velocity.x = Spider.SPEED; // ils bougent tout le temps et tout seul

        // Création des animations :
        // -- La première quand il bouge
        this.scene.anims.create({
            key: Spider.MOVEANIM,
            frameRate: 8, // Vitesse de la rotation
            repeat: -1, // Tourne toujours
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Spider, { frames: [0, 1, 2] })
        });
        // -- La deuxèime quand il meurt
        this.scene.anims.create({
            key: Spider.DIEANIM,
            frameRate: 8, // Vitesse de la rotation
            repeat: -2, // Tourne toujours
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Spider, { frames: [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3] })
        });
        // Une fois crée, on la lance
        this.anims.play(Spider.MOVEANIM, true);

    }

    preUpdate() {

    }
}