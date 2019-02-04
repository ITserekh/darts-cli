import { Throw } from './throw';
import { ThrowService } from './throw.service';
import { Player} from './player';
import { PlayersService } from './players.service';
import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable()
export class Game501Service implements Game {

  players: Player[];
  throws: Throw[][] = [];

  constructor(private throwsService: ThrowService,
    private playersService: PlayersService) {
  }

  initGame(){
    this.players = this.playersService.getPlayers();
    this.throws = this.throwsService.getThrows();

    // create initial throws
    const initThrows: Throw[] = [];
    const numberPlayers = this.playersService.getPlayers().length;
    for (let number = 0; number < numberPlayers; number++) {
      initThrows.push(new Throw);
      // start points
      initThrows[number].points = 501;
    }
    this.throwsService.addThrow(initThrows);
  }

  // do move, return winners
  doMove(move: Throw[]): number[] {
    const lastMoveNumber = this.throws.length - 1;

    // summation of points
    move.forEach(( item, playerNumber) => {
      const previousPoints = this.throws[lastMoveNumber][playerNumber].points;
      const points: number
        = item[1][0] * item[1][1]
        + item[2][0] * item[2][1]
        + item[3][0] * item[3][1];

      // if excess of points leave old
      if (previousPoints - points >= 0
        && previousPoints - points !== 1) {
        item.points = previousPoints - points;
      } else {
        item.points = previousPoints;
      }
    })

    // add move
    this.throwsService.addThrow(move);

    return this.isWinner();
  }

  // сheck is a winner on a current move
  isWinner(): number[] {
    const lastMoveNumber = this.throws.length - 1;
    const lastThrows: Throw[] = this.throws[lastMoveNumber];
    const points = lastThrows.map(item => item.points);
    let winners: number[] = []; // array of winners indexes 

    points.forEach((item, playerNumber) => {
      // if player has 0 points check multiplier x2
      if (!item) {

        let condition: number = 0; // check last dart with x2
        let dartNumber: number = 3;

        do {
          if (lastThrows[playerNumber][dartNumber][0] !== 0) { // don't check if points of dart is 0 
            if (lastThrows[playerNumber][dartNumber][1] === 2) { // multiplier of dart is x2
              condition = 1; 
            } else {
              condition = -1;
            }
          }
          dartNumber--;
          if (dartNumber === 0) break;
        } while (condition === 0);

        // if last multiplier of dart is x2 add a player to winners
        // else set previous points
        if (condition === 1) {
          winners.push(playerNumber);
        } else {
          lastThrows[playerNumber].points = this.throws[lastMoveNumber-1][playerNumber].points;
        }
      }
    });
    if (winners.length > 0) return winners;

    // find winners on 20 or 30 moves
    if (lastMoveNumber - 1 === 20
      || lastMoveNumber - 1 === 30) {
        // find a minimal point
        let minPoint: number = points.reduce((previous, current) => current < previous ? current : previous, 501);

        // find winners
        points.forEach((playerPoint, playerNumber) => {
          if (playerPoint === minPoint) {
            winners.push(playerNumber);
        }
      });
      if (lastMoveNumber - 1 === 20 && winners.length > 1) {
        winners = [];
      }
    }
    return winners;
  }
}
