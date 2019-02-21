import {Directive, ElementRef, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';


@Directive({
  selector: '[appCostMask][formControlName]',
})
export class CostMaskDirective {

  previousChangeIsDelete = false;
  previousLength = 4;
  previousValue = '000'; // для отслеживания ввода на цифр

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  constructor(public ngControl: NgControl,
              private el: ElementRef) {
  }

  onInputChange(event, backspace) {

    let cursorPosition = this.el.nativeElement.selectionStart;

    const condition = event.replace(/\D/g, '');
    let str = event;

    // проверка на ввод символа
    if (this.previousValue.indexOf(condition) === -1) {
      // Проверка на ввод больше 13 символов
      if (condition.length <= 13) {
        // после запятой
        if (cursorPosition >= str.length - 2 && !this.previousChangeIsDelete) {
          if (!backspace) {
            // если последний символ то старый вырежеться
            if (cursorPosition === str.length) {
              str = str.slice(0, cursorPosition - 1);
            } else {
              str = str.slice(0, cursorPosition) + str.slice(cursorPosition + 1);
            }
          } else {
            str = str.slice(0, cursorPosition) + '0';
            this.previousChangeIsDelete = true;
          }
        } else if (this.previousChangeIsDelete) {
          this.previousChangeIsDelete = false;
        }
      } else {
        str = this.previousValue;
        cursorPosition = cursorPosition - 1;
      }
    } else {
      if (!backspace) {
        cursorPosition = cursorPosition - 1;
      }
    }

    // Разбиение на строки
    let newVal = str.replace(/\D/g, '');
    this.previousValue = newVal; // Для сравнения при следующем изменения, для не нужных символов
    if (newVal.length === 3) {
      newVal = newVal.replace(/^(\d{0,3})(\d{2})/, '$1,$2');
    } else if (newVal.length <= 5 ) {
      newVal = newVal.replace(/^(\d{0,3})(\d{2})/, '$1,$2');
    } else if (newVal.length <= 8 ) {
      newVal = newVal.replace(/^(\d{0,3})(\d{3})(\d{2})/, '$1 $2,$3');
    } else if (newVal.length <= 11 ) {
      newVal = newVal.replace(/^(\d{0,3})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3,$4');
    } else if (newVal.length <= 13 ) {
      newVal = newVal.replace(/^(\d{0,3})(\d{3})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3 $4,$5');
    } else {
      newVal = newVal.substring(0, 13);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{3})(\d{2})/, '$1 $2 $3 $4,$5');
    }

    // изменить курсор при добавлении/удалении пробела
    if (this.previousLength - newVal.length === -2) {
      cursorPosition = cursorPosition + 1;
    } else if (this.previousLength - newVal.length === 2) {
      cursorPosition = cursorPosition - 1;
    }

    console.log(newVal);
    // записываем новое значение
    this.ngControl.valueAccessor.writeValue(newVal);
    this.previousLength = newVal.length;
    console.log(this.ngControl.value);
    console.log(newVal);

    // Ставим курсор в нужное место
    this.el.nativeElement.selectionStart = cursorPosition;
    this.el.nativeElement.selectionEnd = cursorPosition;
  }
}
