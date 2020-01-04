import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { SelectPlayer } from '../../inputs/SelectPlayer';
import { Game } from '../../Game';


export class CometForVenus implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: string = "Comet For Venus";
    public cardType: CardType = CardType.EVENT;
    public canPlay(): boolean {
        return true;
    }
    public play(player: Player, game: Game) {
        const venusTagPlayers = game.getPlayers().filter((otherPlayer) => otherPlayer.id !== player.id && otherPlayer.getTagCount(Tags.VENUS) > 0);

        if (game.getPlayers().length === 1 || venusTagPlayers.length === 0) {
            game.increaseVenusScaleLevel(player,1);
            return undefined;
        }

        if (venusTagPlayers.length === 1) {
            venusTagPlayers[0].megaCredits = Math.max(0, venusTagPlayers[0].megaCredits - 4);
            game.increaseVenusScaleLevel(player,1);
            return undefined;
        }
        
        return new SelectPlayer(
            venusTagPlayers,
            'Select player to remove up to 4 mega credits from',
            (selectedPlayer: Player) => {
              selectedPlayer.megaCredits = Math.max(0, selectedPlayer.megaCredits - 4);
              game.increaseVenusScaleLevel(player,1);
              return undefined;
            }
        );
    }
}