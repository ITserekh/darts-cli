import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { ReversePipe } from './services/reverse.pipe';
// import { AddPlayerComponent } from './components/add-player/add-player.component';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ LogoComponent, ReversePipe ],
  exports:      [ LogoComponent, ReversePipe,
    CommonModule, FormsModule ]
})
export class SharedModule {}
