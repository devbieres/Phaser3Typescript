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

        // Chargement des différents images en lien avec les plateformes
        // /!\ Il faut que les codes images correspondent bien au code présent
        // dans le fichier de niveau
        this.load.image(AssetsList.IMG_ground, 'images/ground.png');
        this.load.image(AssetsList.IMG_Platform8x1, 'images/grass_8x1.png');
        this.load.image(AssetsList.IMG_Platform6x1, 'images/grass_6x1.png');
        this.load.image(AssetsList.IMG_Platform4x1, 'images/grass_4x1.png');
        this.load.image(AssetsList.IMG_Platform2x1, 'images/grass_2x1.png');
        this.load.image(AssetsList.IMG_Platform1x1, 'images/grass_1x1.png');
        // Vu que les codes sont dans les images, l'utilisation d'enum n'était peut-être
        // pas nécessaire.

        // Gestion du heros
        this.load.image(AssetsList.IMG_Hero, 'images/hero_stopped.png');

    }

    /**
     * Après le preload, la méthode create est appelée.
     * Elle utilise (par exemple), les assets pour créer des éléments comme des images
     */
    create() {
        // Comme il s'agit uniquement de la page de chargement,
        // Ouverture du premier tableau : La scene 1
        this.scene.start(ScenesList.Level1Scene);
    }
}