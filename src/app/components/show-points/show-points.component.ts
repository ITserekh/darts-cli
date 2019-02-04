import { Component, Inject, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import { Throw } from '../../services/throw';
import { ThrowService } from '../../services/throw.service';
import { Player } from '../../services/player';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'show-points',
  templateUrl: './show-points.component.html',
  styleUrls: ['./show-points.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPointsComponent {
  moveNumber: number; // number of selected move
  players: Player[];
  throws: Throw[][];

  constructor(private playersService: PlayersService,
    private throwService: ThrowService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef:ChangeDetectorRef) {
      this.moveNumber = data.moveNumber;
    }

  ngOnInit() {
    this.players = this.playersService.getPlayers();
    this.throws = this.throwService.getThrows();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

}
