import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { Player} from '../../services/player';
import { PlayersService } from '../../services/players.service';
import { Throw } from '../../services/throw';
import { ShowWinnerComponent } from '../show-winner/show-winner.component';
import { Game } from '../../services/game';
import { ChooseGameService } from '../../services/choose-game.service';


@Component({
  selector: 'throws',
  templateUrl: './throws.component.html',
  styleUrls: ['./throws.component.scss']
})
export class ThrowsComponent {
  game: Game;
  players: Player[];
  throws: Throw[] = [];
  gameOver: boolean = false;

  constructor(private playersService: PlayersService,
    private chooseGameServise: ChooseGameService,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.game = this.chooseGameServise.getSelectedGame();
    this.players = this.playersService.getPlayers();
    
    this.game.initGame();

    this.addNewThrow();
  }

  addNewThrow() {
    const numberPlayers = this.players.length;
    this.throws = [];
    for (let number = 0; number < numberPlayers; number++) {
      this.throws.push(new Throw);
    }
  }

  addMove() {
    const winners: number[] = this.game.doMove(this.throws);
    // 
    if (winners.length > 0) {
      this.gameOver = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.width = '400px';
      dialogConfig.data = {
        winners: winners
      }
      this.dialog.open(ShowWinnerComponent, dialogConfig);
    }
    
    this.addNewThrow();
  }
  
  // check real numbers of darts target
  checkPoint(currentThrow: Throw, numberDart: any, points: any) {
    const previuosValue = currentThrow[numberDart][0];
    const tmpPoints = Number(points.value);
    if (tmpPoints <= 20 || this.isBullEye(tmpPoints)) {
      currentThrow[numberDart][0] = tmpPoints;
      this.selectMultiplier(currentThrow, numberDart, 1);
    } else {
      if (previuosValue === 0) {
        points.value = '';
      } else {
        points.value = previuosValue;
      }
    }
  }

  selectMultiplier(currentThrow: Throw, numberDart: any, multipler: number) {
    if (this.isBullEye(currentThrow[numberDart][0])) {
      currentThrow[numberDart][1] = 1;
    } else {
      currentThrow[numberDart][1] = multipler;
    }
  }

  isBullEye(points: number): boolean {
    return (points === 25 || points === 50)
  }
}
