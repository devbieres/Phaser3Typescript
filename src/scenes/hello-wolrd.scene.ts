import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
    // Appeler par défaut au démarrage
    constructor() {
        // Passe une clé qui permettra de référencer la scène
        super('hello-world')
    }

    /***
     * La méthode est appelée après le constructeur et doit permettre le chargement
     * des assets ou autres composants nécessaires au jeu
     */
    preload() {
        // Permet de spécifier une URL de base pour le chargement des assets
        this.load.setBaseURL('http://labs.phaser.io')
        // Chargement d'un logo avec comme clé logo ...
        this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    }

    /**
     * Après le preload, la méthode create est appelée.
     * Elle utilise (par exemple), les assets pour créer des éléments comme des images
     */
    create() {
        // Ici, uniquement une image qu'on place dans le jeu
        const logo = this.add.image(400, 100, 'logo')
    }
}