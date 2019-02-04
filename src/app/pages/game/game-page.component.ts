import { Component } from '@angular/core';
import { ThrowService } from '../../services/throw.service';

@Component({
  selector: 'setting-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  constructor(private throwsService: ThrowService) {
  }

  // clear old game under create new game
  clearGame() {
    this.throwsService.clearThrows();
  }
}
