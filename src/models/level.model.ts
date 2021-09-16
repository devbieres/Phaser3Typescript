import { CoinModel } from './coin.model';
import { DecorationModel } from './decoration.model';
import { DoorModel } from './door.model';
import { HeroModel } from './hero.model';
import { KeyModel } from './key.model';
import { PlatformModel } from './plateform.model';
import { SpiderModel } from './spider.model';

export class LevelModel {

    public platforms: PlatformModel[];
    public decorations: DecorationModel[];
    public coins: CoinModel[];
    public hero: HeroModel;
    public spiders: SpiderModel[];
    public door: DoorModel;
    public key: KeyModel;

}