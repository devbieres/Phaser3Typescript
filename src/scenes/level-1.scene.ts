import Phaser from 'phaser'
import { AssetsList, ScenesList } from '../consts'
import { Hero } from '../entities/hero';
import { LevelModel } from '../models/level.model';
import { PlatformModel } from '../models/plateform.model';

export class LevelOneScene extends Phaser.Scene {

    private levelName = 'level01';

    // Variable contenant les plateformes
    protected _plateforms: Phaser.GameObjects.Sprite[] = [];

    // Variable contenant le hero.
    // Elle est marqué ! car elle sera normalement tout le temps instanciée.
    protected _hero!: Hero;

    constructor() {
        super(ScenesList.Level1Scene);
    }

    /***
     * A ce stade, les éléments ont déjà été chargés par la première scène.
     * Donc ici, normalement, rien à faire
     */
    preload() {
        // Chargement du niveau
        this.load.json(this.levelName, `./assets/data/${this.levelName}.json`);
    }

    /**
     */
    create() {

        // Pas besoin de le charger car déjà fait dans la scène de chargement
        const background = this.add.image(0, 0, AssetsList.IMG_BackGround)
        // Il faut changer l'orgine du 
        background.setOrigin(0, 0);

        // Creation du niveau
        this._createLevel(this.cache.json.get(this.levelName));

        // Définition des collisions
        this.physics.add.collider(this._hero, this._plateforms);

    }

    /**
     * Fonction spécifique pour créer les niveaux
     */
    private _createLevel(data: LevelModel) {
        // Gestion des plateformes
        data.platforms.forEach(this._createPlatform, this);

        // Gestion du heros
        this._hero = new Hero(this, data.hero);

    }

    private _createPlatform(platformModel: PlatformModel) {
        // Les platesformes devant être physics, elles sont ajoutées à cette dimension
        const sprite = this.physics.add.sprite(platformModel.x, platformModel.y, platformModel.image);
        // Par contre, pour éviter qu'elle tombe, il faut leur dire que la gravité n'a pas d'impact
        sprite.body.setAllowGravity(false);
        // Et pour éviter que si quelqu'un marche dessus, la plateforme glisse
        sprite.body.setImmovable(true);
        // Pour que le placement soit cohérent
        sprite.setOrigin(0, 0);
        // Ajout au tableau
        this._plateforms.push(sprite);
    }
}