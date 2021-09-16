export enum ScenesList {
    LoadingScene = 'loading-scene',
    Level1Scene = 'level-1',
    Level2Scena = 'level-2',
    HelloWorldScene = 'hello-world',
    UIScene = 'ui'
}

export enum AssetsList {
    IMG_BackGround = 'img-background',
    IMG_Coin = 'coin-icon',
    IMG_Ground = 'ground',
    IMG_Hero = 'hero',
    IMG_FontNumber = 'font:numbers',
    IMG_Platform8x1 = 'grass:8x1',
    IMG_Platform6x1 = 'grass:6x1',
    IMG_Platform4x1 = 'grass:4x1',
    IMG_Platform2x1 = 'grass:2x1',
    IMG_Platform1x1 = 'grass:1x1',
    IMG_Walls = 'invisible-wall',
    SPRITESHEET_Coins = 'coin',
    SPRITESHEET_Hero = 'hero:sprides',
    SPRITESHEET_Spider = 'spider',
    SND_Coin = 'snd-coin',
    SND_Jump = 'snd-jump',
    SND_Stomp = 'snd_stomp'
}

export enum EventList {
    GET_COIN = 'GET_COIN',
    KILL_SPIDER = 'KILL_SPIDER',
    HERO_JUMP = 'HERO_JUMP'
}