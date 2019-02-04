import {Player} from './player';
 
export class PlayersService{
 
    private players: Player[] = [];

    getPlayers(): Player[] {
      return this.players;
    }

    deletePlayer(player: Player) {
      // find item index of players array for delete
      let index: number = this.players.findIndex((item) => player === item);
      // delete a one item with index from players list
      this.players.splice(index, 1);
    }

    addPlayer(name: string, eMail: string) {
      this.players.push({name: name, eMail: eMail});
    }
}
