import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import {Router} from '@angular/router';

import { Player} from '../../services/player';
import { PlayersService } from '../../services/players.service';
import { AddPlayerComponent } from '../add-player/add-player.component';

@Component({
  selector: 'select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss'],
})
export class SelectPlayersComponent implements OnInit{
  term: string = ''; // for storage a search query of player
  players: Player[]; // players array to rendering list

  constructor(private playersService: PlayersService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    // get list of players under init this component
    this.players = this.playersService.getPlayers();

    this.isPlayer();
  }

  delete(player: Player): void {
    this.playersService.deletePlayer(player);
    this.isPlayer();
  }

  // call when input a seraach query
  showItem(player: Player) {
    // check player name contains search query
    const nameCondition = player.name.toLowerCase().indexOf(this.term.toLowerCase()) > -1;
    // check player email contains search query
    const eMailCondition = !player.eMail ||  player.eMail.toLowerCase().indexOf(this.term.toLowerCase()) > -1;
    // return true if somewhere is a match
    return (nameCondition || eMailCondition);
  }

  newPlayer() {
    // config for modal dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';
    // open dialog to add new player
    this.dialog.open(AddPlayerComponent, dialogConfig);
  }

  // if there is no player create a new one
  isPlayer() {
    if (!this.players.length) {
      this.router.navigate(['/login']);
    }
  }
}
