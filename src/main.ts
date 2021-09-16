// Je sais c'est pas bien, mais j'aime bien laisser un console.log au démarrage ...
console.log('-- Lancement du jeu');

// Import de la librairie
import Phaser from 'phaser'

// Import de la première scene.
// Les scènes peuvent être vu comme des espaces de jeu : un niveau, un plateau, une zone spécifique (comme le tableau de score).
// import HelloWorldScene from './scenes/hello-wolrd.scene';
import { HelloWorldScene, LevelOneScene, LoadingScene } from "./scenes";
import { UIScene } from './scenes/ui.scene';

// La configuration
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO, // Phaser peut fonctionner soit en WebGL soit avec Canvas. En mettant auto, on le laisse choisir en fonction du navigateur,
    width: 960, // La taille du jeu
    height: 600,
    physics: {
        default: 'arcade', // Phaser intègre un moteur physique par défaut. N'ayant pas eu l'occasion de tester d'autres, je laisse celui par défaut.
        arcade: {
            gravity: { y: 1200 }, // Ce moteur permet de gérer la gravité 
            debug: true
        }
    },
    // Remplacement de HelloWorld par les nouvelles 
    // scene: [HelloWorldScene],
    scene: [LoadingScene, LevelOneScene, UIScene]
}

// Export
export default new Phaser.Game(config)
