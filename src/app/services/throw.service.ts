import { Throw } from './throw';

// import { PlayersService } from './players.service';

export class ThrowService {
  throws: Throw[][] = [];

  addThrow(trow: Throw[]) {
    this.throws.push(trow);
  }

  clearThrows() {
    this.throws = [];
  }

  getThrows() {
    return this.throws;
  }
}
