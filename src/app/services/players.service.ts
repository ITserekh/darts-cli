import {Player} from './player';

export class PlayersService {

    private players: Player[] = [];

    getPlayers(): Player[] {
      return this.players;
    }

    deletePlayer(player: Player) {
      // find item index of players array for delete
      const index: number = this.players.findIndex((item) => player === item);
      // delete a one item with index from players list
      this.players.splice(index, 1);
    }

    addPlayer(name: string, eMail: string, avatar: object) {
      this.players.push({name: name, eMail: eMail, time: new Date(), avatar: avatar});
    }
}
