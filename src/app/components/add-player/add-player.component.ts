import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material';

import { PlayersService } from '../../services/players.service';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

@Component({
  selector: 'add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  playerName: string;
  eMail: string;
  avatar: object;
  isSaveUser = false;

  constructor(private playersService: PlayersService,
              private router: Router,
              /* private dialogRef: MatDialogRef<AddPlayerComponent>*/) {}

  // add new player
  add() {
    // this.dialogRef.close();
    this.playersService.addPlayer(this.playerName, this.eMail, this.avatar);
    this.router.navigate(['/setting']);
  }

  saveUser() {
    this.playersService.addPlayer(this.playerName, this.eMail, this.avatar);
    this.isSaveUser = true;
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
  /*
  добавить canDiactivate ля разрешения перехода
   */
}
