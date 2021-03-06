import Phaser from 'phaser'
import { AssetsList, ScenesList } from '../consts'

// Comme la première scene, la classe doit hériter de Phase.Scene
export class LoadingScene extends Phaser.Scene {

    constructor() {
        // Comme le projet est en type, l'idée est d'éviter les constantes en dure.
        // Utilisation d'une classe conts qui expose différents enums utilisés au fil du jeu.
        super(ScenesList.LoadingScene);
    }

    /***
     * La méthode est appelée après le constructeur et doit permettre le chargement
     * des assets ou autres composants nécessaires au jeu
     */
    preload() {
        // A partir de maintenant les assets sont chargés depuis le répertoire local
        this.load.setBaseURL('./assets/')
        // Chargement du fond d'écran. Utilisation d'une constante.
        this.load.image(AssetsList.IMG_BackGround, 'images/background.png');

        // Chargement du niveau
        this.load.json('level:00', `data/level00.json`);
        this.load.json('level:01', `data/level01.json`);

        // Chargement des différents images en lien avec les plateformes
        // /!\ Il faut que les codes images correspondent bien au code présent
        // dans le fichier de niveau
        this.load.image(AssetsList.IMG_Ground, 'images/ground.png');
        this.load.image(AssetsList.IMG_Platform8x1, 'images/grass_8x1.png');
        this.load.image(AssetsList.IMG_Platform6x1, 'images/grass_6x1.png');
        this.load.image(AssetsList.IMG_Platform4x1, 'images/grass_4x1.png');
        this.load.image(AssetsList.IMG_Platform2x1, 'images/grass_2x1.png');
        this.load.image(AssetsList.IMG_Platform1x1, 'images/grass_1x1.png');
        // Vu que les codes sont dans les images, l'utilisation d'enum n'était peut-être
        // pas nécessaire.

        // Clé & Porte
        this.load.spritesheet(AssetsList.SPRITESHEET_Door, 'images/door.png', { frameWidth: 42, frameHeight: 66 });
        this.load.image(AssetsList.IMG_Key, 'images/key.png');
        this.load.spritesheet(AssetsList.SPRITESHEET_KeyIcon, 'images/key_icon.png', { frameWidth: 34, frameHeight: 30 });

        // Gestion du heros
        // this.load.image(AssetsList.IMG_Hero, 'images/hero_stopped.png');
        this.load.spritesheet(AssetsList.SPRITESHEET_Hero, 'images/hero.png', { frameWidth: 36, frameHeight: 42 });

        // Gestion des pièces
        // Il faut indiquer la taille d'une image dans l'image pour qu'il puisse faire le découpage nécessaire
        this.load.spritesheet(AssetsList.SPRITESHEET_Coins, 'images/coin_animated.png', { frameWidth: 22, frameHeight: 22 });
        // La pièce pour le score
        this.load.image(AssetsList.IMG_Coin, 'images/coin_icon.png');

        // Le tableau des scores
        this.load.image(AssetsList.IMG_FontNumber, 'images/numbers.png');

        // Gestion des araignées
        this.load.spritesheet(AssetsList.SPRITESHEET_Spider, 'images/spider.png', { frameWidth: 42, frameHeight: 32 });

        // Les murs invisibles
        this.load.image(AssetsList.IMG_Walls, 'images/invisible_wall.png');

        // Les différents sons :
        this.load.audio(AssetsList.SND_Coin, 'audio/coin.wav');
        this.load.audio(AssetsList.SND_Jump, 'audio/jump.wav');
        this.load.audio(AssetsList.SND_Stomp, 'audio/stomp.wav');
        this.load.audio(AssetsList.SND_Door, 'audio/door.wav');
        this.load.audio(AssetsList.SND_Key, 'audio/key.wav');

    }

    /**
     * Après le preload, la méthode create est appelée.
     * Elle utilise (par exemple), les assets pour créer des éléments comme des images
     */
    create() {
        // Comme il s'agit uniquement de la page de chargement,
        // Ouverture du premier tableau : La scene 1
        this.scene.start(ScenesList.LevelScene);
        this.scene.run(ScenesList.UIScene);
    }
}