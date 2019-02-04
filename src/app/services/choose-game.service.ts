import { Game501Service } from './game501.service';
import { Game301Service } from './game301.service';
import { Game } from './game';
import { Injectable } from '@angular/core';

@Injectable()
export class ChooseGameService {
  private gamesList: string[] = ['501', '301'];
  private selectedGame: Game;

  constructor(private game501Service: Game501Service,
    private game301Service: Game301Service) {}

  getGameList(): string[] {
    return this.gamesList;
  }

  setGame(gameName: string): void {
    switch (gameName) {
      case '501': this.selectedGame = this.game501Service;
                  break;
      case '301': this.selectedGame = this.game301Service;
                  break;
      default: console.log('Game is not selected');
    }
    
  }

  getSelectedGame(): Game {
    return this.selectedGame;
  }
}
