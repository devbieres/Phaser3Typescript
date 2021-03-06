import { Physics } from 'phaser';
import { AssetsList } from '../consts';
import { SpiderModel } from '../models/spider.model';

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Spider extends Physics.Arcade.Sprite {

    static readonly MOVEANIM = 'move';
    static readonly DIEANIM = 'die';
    static readonly SPEED = 100;

    protected getBody(): Phaser.Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
    }

    constructor(scene: Phaser.Scene, spiderModel: SpiderModel) {


        // Il faut commencer par appeler le constructeur parent
        // --> Il faut bien passer la bonne texture
        super(scene, spiderModel.x, spiderModel.y, AssetsList.SPRITESHEET_Spider);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Quelques ajustements 
        const body = this.getBody();
        body.setCollideWorldBounds(true); // au cas où pour qu'ils sortent du jeu,
        this.body.velocity.x = Spider.SPEED; // ils bougent tout le temps et tout seul

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
            repeat: 0,
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Spider, { frames: [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3] })
        });
        // Une fois crée, on la lance
        this.anims.play(Spider.MOVEANIM, true);

    }

    /**
     * Gestion de la mise à jour entre deux refresh
     * @param time 
     * @param delta 
     */
    preUpdate(time, delta) {
        // Nécessaire pour que l'animation fonctionne encore
        super.preUpdate(time, delta);

        // Récupération du body avec le bon type
        const body = this.getBody();

        if (this.body) {
            if (body.touching.right || body.blocked.right) {
                body.velocity.x = -1 * Spider.SPEED;
            }
            else if (body.touching.left || body.blocked.left) {
                body.velocity.x = Spider.SPEED;
            }
        }
        // }
    } // /preUpdate


    /**
     * Une araignée meurt
     */
    public die() {
        // On commence par rendre son corps inactif
        // Pour que le hero ne meurt pas à cause du cadavre
        this.body.enable = false;
        // Arrêt de l'animation en cours
        this.anims.stop();
        // Ecoute pour savoir quand on peut supprimer
        // Quand l'animation est terminée
        this.once('animationcomplete', () => this.destroy(), this);
        // Joue l'animation de mort
        this.anims.play(Spider.DIEANIM);
    }

}
