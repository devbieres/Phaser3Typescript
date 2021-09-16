import Phaser, { GameObjects } from 'phaser'
import { AssetsList, EventList, ScenesList } from '../consts'
import { Coin } from '../entities/coin';
import { EnemyWall, EnemyWallSide } from '../entities/enemyWall';
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
    // -- Les murs invisibles
    protected _enemyWalls: Phaser.GameObjects.Sprite[] = [];

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
        this.physics.add.overlap(this._hero, this._coins, (hero, coin) => {
            // Destruction de la pièce
            coin.destroy()
            // Events indiquant que la pièce a été captée
            this.game.events.emit(EventList.GET_COIN);
        });
        // -- Araignes avec plateforme & murs
        this.physics.add.collider(this._spider, this._plateforms);
        this.physics.add.collider(this._spider, this._enemyWalls);
        // -- Hero avec araignés
        this.physics.add.overlap(this._hero, this._spider, this._handleHeroAndSpider, null, this);
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
        data.spiders.forEach((spiderModel: SpiderModel, index: number) => {
            this._spider.push(
                new Spider(this, spiderModel)
            );
        }, this);

    }

    private _createPlatform(platformModel: PlatformModel) {
        // ---- Création de la plateforme
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

        // --- Création des murs invisibles
        // de chaque côté de la plateforme
        this._enemyWalls.push(
            new EnemyWall(this, sprite.x, sprite.y, EnemyWallSide.left),
            new EnemyWall(this, sprite.x + sprite.width, sprite.y, EnemyWallSide.right)
        );
    }

    /**
     * Gestion d'un contact entre notre hero et une araigné
     * Tout va dépendre qui touche qui et comment
     * @param hero Le hero
     * @param spider L'araigné
     */
    private _handleHeroAndSpider(heroGO: GameObjects.GameObject, spiderGO: GameObjects.GameObject) {
        // Cast
        const hero = heroGO as Hero;
        const spider = spiderGO as Spider;

        // Est-ce que le heros est en train de tomber ?
        if (hero.isFalling()) {
            // Oui alors, on considère qu'il peut tuer l'araigné
            hero.bounce();
            spider.die();
        } else {
            // Oups ... Pour le moment, on relance le jeu
            this.scene.restart();
        }


    } // _handleHeroAndSpider


}