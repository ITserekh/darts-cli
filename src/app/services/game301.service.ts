import { Throw } from './throw';
import { ThrowService } from './throw.service';
import { Player} from './player';
import { PlayersService } from './players.service';
import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable()
export class Game301Service implements Game {

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
      initThrows[number].points = 0;
    }
    this.throwsService.addThrow(initThrows);
  }

  // do move, return winners
  doMove(move: Throw[]): number[] {
    const lastMoveNumber = this.throws.length - 1;

    const points: number[] =  move.map(item => {
      return item[1][0] * item[1][1]
            + item[2][0] * item[2][1]
            + item[3][0] * item[3][1];
    });

    // kill
    for (let playerNumber = this.players.length; playerNumber > 0; playerNumber--) {
      if (points[playerNumber] === points[playerNumber-1]) {
        points[playerNumber] = 0;
      }
    }

    // summation of points
    move.forEach((item, playerNumber) => {
      const previousPoints = this.throws[lastMoveNumber][playerNumber].points;
      if (previousPoints + points[playerNumber] <= 301) {
        item.points = previousPoints + points[playerNumber];
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
    const winners: number[] = []; // array of winners indexes

    // complete array of winners
    points.forEach((item, playerNumber) => {
      // if player has 0 points check multiplier x2
      if (item === 301) {
        winners.push(playerNumber);
      }
    });

    return winners;
  }
 }
