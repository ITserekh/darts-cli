import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, ControlContainer, FormControl, FormGroupDirective} from '@angular/forms';

@Directive({
  selector: '[invalidMessage]'
})
export class InvalidMessageDirective implements OnInit {
  @Input() invalidMessage: string;
  @Input() errorType: string;
  control: AbstractControl;
  constructor(
    public fg: ControlContainer,
    private el: ElementRef,
    private render: Renderer2
  ) { }

  ngOnInit() {
    // @ts-ignore
    this.control = this.fg.form.controls[this.invalidMessage];
    this.control.valueChanges.subscribe(() => this.setVisible());
    this.render.setStyle(this.el.nativeElement, 'display', 'none');
  }

  private setVisible() {
    if (this.control.invalid && (this.control.dirty || this.control.touched) && this.match(this.errorType)) {
      this.render.removeStyle(this.el.nativeElement, 'display');
    } else {
      this.render.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  // искать совпадение с валидатором
  match(error: string) {
    if (this.control && this.control.errors) {
      if (Object.keys(this.control.errors).indexOf(error) > -1) {
        return true;
      }
    }
    return false;
  }
}
