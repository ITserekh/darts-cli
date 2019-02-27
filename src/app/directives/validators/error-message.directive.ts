import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective implements OnInit {

  @Input('appErrorMessage') controlName: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
}
