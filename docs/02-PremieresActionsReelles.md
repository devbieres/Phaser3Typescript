# Premières actions réelles
## Mise en place des assets

Pour aller chercher les assets nécessaires au jeu, direction la page initiale : [ici](https://mozdevs.github.io/html5-games-workshop/en/guides/platformer/initialise-phaser/). Il faut télécharger le zip puis récupérer les répertoires _audio_, _data_ & _images_ présents et les copier dans le répertoire _~/src/assets_. 

Si tu vas bien, lors du prochain builds, les différents assets seront présents dans le répertoire de sortie _~/dist/assets_.

## Création d'une classe de chargement

Dans le différents articles lu, les projets contiennent une scene spécialement dédiée au chargement des assets. Cette est appelée dès le démarrage puis charge la première scène de jeu.

Il faut créer une nouvelle classe : _~/src/scenes/loading.scene.ts_.
```typescript
import Phaser from 'phaser'
import { AssetsList, ScenesList } from '../consts'

// Comme la première scene, la classe doit hériter de Phase.Scene
export default class LoadingScene extends Phaser.Scene {

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
```

La création de cette scène intègre également la création de deux enums listant des constantes. Le code est centralisé dans _~/src/consts.ts_ :
```
export enum ScenesList {
    LoadingScene = 'loading-scene',
    Level1Scene = 'level-1',
    Level2Scena = 'level-2',
    HelloWorldScene = 'hello-world'
}

export enum AssetsList {
    IMG_BackGround = 'img-background'
}

```

## Premier niveau

La scène de chargement fini en demandant le démarrage du premier niveau. Il faut donc que cette scène existe. C'est reparti, création d'une scène _~/src/scenes/level-1.scene.ts_ :
```typescript
import Phaser from 'phaser'
import { AssetsList, ScenesList } from '../consts'

export class LevelOneScene extends Phaser.Scene {

    constructor() {
        super(ScenesList.Level1Scene);
    }

    /***
     * A ce stade, les éléments ont déjà été chargés par la première scène.
     * Donc ici, normalement, rien à faire
     */
    preload() {

    }

    /**
     */
    create() {

        // Création du background.
        // Pas besoin de le charger car déjà fait dans la scène de chargement
        const background = this.add.image(0, 0, AssetsList.IMG_BackGround)

    }
}
```

## Mise à jour du main.ts

Les scénes sont crées mais ne sont pas actives. Pour cela, il faut modifier le fichier _main.ts_ :
```typescript
[...]
// Remplacement de HelloWorld par les nouvelles 
    // scene: [HelloWorldScene],
    scene: [LoadingScene, LevelOneScene]
[...]
```

et après rechargement :

![Deuxieme](./02.png)

Un souci. L'image n'est pas vraiment bien placée. Et c'est normal. Par défaut, Phaser place les objets en fonction de leur centre. Ici, on veut la placer en fonction de son coin haut / gauche. Pour corriger, cela il faut modifier l'orgine :
```typescript
[...]
const background = this.add.image(0, 0, AssetsList.IMG_BackGround)
// Il faut changer l'orgine du 
background.setOrigin(0, 0);
[...]
```

mais il y a toujours comme un souci :

![Troisiement](./03.png).

EN fait, l'image ne fait pas la taille du jeu ... changement de la taille du jeu :) dans _main.ts_ :
```typescript
// La configuration
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO, 
    width: 960, // Changement !
    height: 600, // CHangement
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    // Remplacement de HelloWorld par les nouvelles 
    // scene: [HelloWorldScene],
    scene: [LoadingScene, LevelOneScene]
}
```

et là c'est mieux :

![4](./04.png).