import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { ReversePipe } from './services/reverse.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ LogoComponent, ReversePipe ],
  exports:      [ LogoComponent, ReversePipe,
    CommonModule, FormsModule ]
})
export class SharedModule {}
