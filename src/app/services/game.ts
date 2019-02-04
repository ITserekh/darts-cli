import { Throw } from './throw';

export interface Game {
  initGame(): void;
  doMove(move :Throw[]): number[];
}
