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
  avatar: object;

  constructor(private playersService: PlayersService,
              private dialogRef: MatDialogRef<AddPlayerComponent>) {}

  // add new player
  add() {
    this.dialogRef.close();
    this.playersService.addPlayer(this.playerName, this.eMail, this.avatar);
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (eventLoad) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.avatar = eventLoad.target.result;
      };
    }
  }
}
