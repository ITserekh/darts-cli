import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material';

import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
  playerName: string;
  eMail: string;

  constructor(private playersService: PlayersService,
    public dialogRef: MatDialogRef<AddPlayerComponent>) {}

  // add new player
  add() {
    this.dialogRef.close();
    this.playersService.addPlayer(this.playerName, this.eMail);
  }
}
