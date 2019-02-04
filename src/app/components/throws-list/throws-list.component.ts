import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Player } from '../../services/player';
import { Throw } from '../../services/throw';
import { ThrowService } from '../../services/throw.service';
import { PlayersService } from '../../services/players.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ShowPointsComponent } from '../../components/show-points/show-points.component';

@Component({
  selector: 'throws-list',
  templateUrl: './throws-list.component.html',
  styleUrls: ['./throws-list.component.scss']
})
export class ThrowsListComponent {

  players: Player[];
  throws: Throw[][];

  constructor (private throwsService: ThrowService,
    private playersService: PlayersService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.players = this.playersService.getPlayers();
    this.throws = this.throwsService.getThrows();
  }

  // show dars points on selected move
  showPoints(moveNumber: number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '1000px';
    dialogConfig.data = {
      moveNumber: moveNumber
    }

    this.dialog.open(ShowPointsComponent, dialogConfig);
  }
}
