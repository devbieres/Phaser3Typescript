import Phaser, { GameObjects } from 'phaser'
import { AssetsList, ScenesList } from '../consts'
import { Coin } from '../entities/coin';
import { Hero } from '../entities/hero';
import { Spider } from '../entities/spider';
import { CoinModel } from '../models/coin.model';
import { LevelModel } from '../models/level.model';
import { PlatformModel } from '../models/plateform.model';
import { SpiderModel } from '../models/spider.model';

export class LevelOneScene extends Phaser.Scene {

    private levelName = 'level01';

    // Variables
    // -- Les plateformes
    protected _plateforms: Phaser.GameObjects.Sprite[] = [];
    // -- Les pièces
    protected _coins: Phaser.GameObjects.Sprite[] = [];
    // -- Les ennemies
    protected _spider: Phaser.GameObjects.Sprite[] = [];

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
        // -- Hero avec Plateforme
        this.physics.add.collider(this._hero, this._plateforms);
        // -- Hero avec Pièce
        this.physics.add.overlap(this._hero, this._coins, (hero, coin) => coin.destroy());
    }

    /**
     * Fonction spécifique pour créer les niveaux
     */
    private _createLevel(data: LevelModel) {
        // Gestion des plateformes
        data.platforms.forEach(this._createPlatform, this);

        // Gestion du heros
        this._hero = new Hero(this, data.hero);

        // Gestion des pièces
        data.coins.forEach((coinModel: CoinModel) => {
            this._coins.push(
                new Coin(this, coinModel)
            );
        }, this);

        // Gestion des araignées
        data.spiders.forEach((spiderModel: SpiderModel) => {
            this._spider.push(
                new Spider(this, spiderModel)
            );
        }, this);

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