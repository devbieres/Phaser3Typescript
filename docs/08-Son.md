# Un peu de son
## Pour marquer les actions
Afin de faire un retour à l'utilisateur, il peut-être sympa de lui jouer quelques notes alors qu'il effectue des actions comme sauter ...

## Chargement des sons

Classique :
```typescript
export class LoadingScene extends Phaser.Scene {
    // [...]
    preload() {
        // [...]
        // Les différents sons :
        this.load.audio(AssetsList.SND_Coin, 'audio/coin.wav');
        this.load.audio(AssetsList.SND_Jump, 'audio/jump.wav');
        this.load.audio(AssetsList.SND_Stomp, 'audio/stomp.wav');
    }
}
```
Il faut juste ne pas oublier d'aller compléter l'enum contenant les assets.

## Ecoute des évènements

C'est l'UIScene qui va être responsable de faire le retour à l'utilisateur :
```typescript
export class UIScene extends Scene {
    // [...]
    create() {
        // [...]
         // Ecoute des évènements
        // -- Collecte de pièces
        this.game.events.on(EventList.GET_COIN, this.manageGetCoin, this);
        // -- Saut
        this.game.events.on(EventList.HERO_JUMP, () => this.sound.play(AssetsList.SND_Jump));
        // -- Kill a spider
        this.game.events.on(EventList.KILL_SPIDER, () => this.sound.play(AssetsList.SND_Stomp));


    }

    /**
     * Gère quand notre héros capture une pièce
     */
    private manageGetCoin() {
        // Mise à jour du score
        this.scoreContainer.value += 1;
        this.sound.play(AssetsList.SND_Coin);
    }

}
```

Deux méthodes sont modifiées :
* Directement dans le create pour ajouter de nouveaux écouteur,
* Dans manageGetCoin pour ajouter la ligne qui joue le son : ``` this.sound.play(AssetsList.SND_Coin);```.

Cela ne change pas grand chose mais cela donne du retour à l'utilisateur.

## Ajout d'évènements au bon moment

Il en manque deux car celui des pièces est déjà présents :
* Au niveau du héros, quand il saute : ```this.scene.game.events.emit(EventList.HERO_JUMP);```,
* Au niveau du level quand une araignée est tuée : ```this.scene.game.events.emit(EventList.KILL_SPIDER);```.

Dans les faits, il est déconseillé d'utiliser directemet l'instance game mais créer son propre gestionnaire et surtout éviter de mettre une dépendance comme celle mise en place. Mais ici, c'est pas Zelda :).

