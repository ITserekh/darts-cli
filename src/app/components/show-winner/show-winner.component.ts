import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import { Player } from '../../services/player';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'show-winner',
  templateUrl: './show-winner.component.html',
  styleUrls: ['./show-winner.component.scss']
})
export class ShowWinnerComponent {
  winners: number[]; // indexes of players
  players: Player[];
  
  constructor(private playersService: PlayersService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.winners = data.winners;
    }

  ngOnInit() {
    this.players = this.playersService.getPlayers();
  }
}
