import { Component } from '@angular/core';
import { ChooseGameService } from '../../services/choose-game.service';

@Component({
  selector: 'choose-game',
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.scss'],
})
export class ChooseGameComponent {
  selectedGame: string;
  games: string[];

  constructor(private chooseGameService: ChooseGameService) {}

  ngOnInit() {
    this.games = this.chooseGameService.getGameList();
  }

  choose(game: string) {
    this.selectedGame = game;
    this.chooseGameService.setGame(this.selectedGame);
  }
}
