import {Directive, ElementRef, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';


@Directive({
  selector: '[appCostMask][formControlName]',
})
export class CostMaskDirective {
  previousLength = 4;
  previousValue = '000'; // для отслеживания ввода на цифр
  resultCursorPosition: number;
  previousString = '0,00';

  previousIsDelition = false;

  doDelition = false;

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    console.log('ngModelChange');
    this.onInputChange(event, false, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    console.log('keyup.backspace');
    this.onInputChange(event.target.value, true, false);
  }

  @HostListener('keydown.delete', ['$event'])
  keydownDelete(event) {
    console.log('keyup.delete');
    this.onInputChange(event.target.value, false, true);
  }

  constructor(public ngControl: NgControl,
              private el: ElementRef) {
  }

  onInputChange(event, backspaceKey, deleteKey) {
    console.log(event);
    const cursorPosition = this.el.nativeElement.selectionStart; // получить позицию курсора в строке
    const condition = event.replace(/\D/g, '');
    let str = event;

    // Если происходит нажатие клавиши backspase или delete
    if (backspaceKey || deleteKey) {
      if (backspaceKey && cursorPosition) {
        str = this.deleleWithBackspaceKey(cursorPosition, str);
      } else if (deleteKey && cursorPosition !== str.length) {
        str = this.deleteWithDeleteKey(cursorPosition, str);
      }
      this.previousString = str;
      this.previousIsDelition = true;
      // Если не удаление и вызов ngChangeModel происходит не после удаления
    } else if (!this.previousIsDelition) {
      // this.previousValue.indexOf(condition) === -1 --> проверка вводилась ли буква
      // Проверка на ввод букв и не превышение длины суммы
      if (this.previousValue.indexOf(condition) === -1 && condition.length <= 13) {
        // проверить где было изменение
        // Изменение после запятой
        if (cursorPosition >= str.length - 2) {
          str = this.changesAfterComma(cursorPosition, str);
          // Изменение перед запятой
        } else {
          str = this.changesBeforeComma(cursorPosition, str);
        }
        // если изменять цифры после запятой с длиной строки 13 символов
      } else if (condition.length > 13 && cursorPosition >= str.length - 2) {
        str = this.changesAfterComma(cursorPosition, str);
        // значение не изменилось, т.е. был введен символ или цифра не влезающая в строку
      } else {
        str = this.previousValue;
        this.resultCursorPosition = cursorPosition - 1;
      }
      // Если перед текущим вызовом ngChangeModel было удаление
    } else if (this.previousIsDelition) {
      str = this.previousString;
      this.previousIsDelition = false;
    }

    // когда удаляется выделением нескольких символов и остается меньше трех цифр
    if (str.length < 4) {
      str = '0,00';
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

    console.log('delete length: ', this.previousLength - newVal.length);
    console.log('deleteKey', deleteKey);
    // изменить курсор при добавлении/удалении пробела
    if (this.previousLength - newVal.length === -2) {
      console.log('firstCondition');
      this.resultCursorPosition = cursorPosition + 1;
    } else if (this.previousLength - newVal.length === 2 && !deleteKey) {
      console.log('secondCondition');
      this.resultCursorPosition = cursorPosition - 2;
    } else if (this.previousLength - newVal.length === 2 && deleteKey) {
      console.log('delete position');
      this.resultCursorPosition = cursorPosition - 1;
    }


    this.previousString = newVal;

    // записываем новое значение
    this.ngControl.valueAccessor.writeValue(newVal);
    this.previousLength = newVal.length;

    // Ставим курсор в нужное место
    this.el.nativeElement.selectionStart = this.resultCursorPosition;
    this.el.nativeElement.selectionEnd = this.resultCursorPosition;
  }

  deleleWithBackspaceKey(cursorPosition: number, str: string): string {
    if (cursorPosition >= str.length - 1) {

      if (cursorPosition === str.length) {
        str = str.slice(0, cursorPosition - 1) + '0';
        this.resultCursorPosition = cursorPosition - 1;
      } else {
        str = str.slice(0, cursorPosition - 1) + '0' + str.slice(cursorPosition);
        this.resultCursorPosition = cursorPosition - 1;
      }

    } else if (str.length === 3) {

      if (str.indexOf(',') > -1) {
        str = '0' + str.slice(0);
        this.resultCursorPosition = cursorPosition;
      } else {
        str = str.slice(0, 1) + ',' +  str.slice(1);
        this.resultCursorPosition = cursorPosition;
      }

    } else {
      if (str.charAt(cursorPosition - 1) === ' ') {
        str = str.slice(0, cursorPosition - 2) + str.slice(cursorPosition);
        // this.resultCursorPosition = cursorPosition - 1;
      } else {
        str = str.slice(0, cursorPosition - 1) + str.slice(cursorPosition);
        // this.resultCursorPosition = cursorPosition - 1;
      }

      this.resultCursorPosition = cursorPosition - 1;
    }
    return str;
  }

  deleteWithDeleteKey(cursorPosition: number, str: string): string {
    console.log('deleteWithDeleteKey');
    console.log('cursor:', cursorPosition);
    console.log('str: ', str);
    if (cursorPosition >= str.length - 2) { // удаление справа от запятой
      if (cursorPosition === str.length - 1) {
        str = str.slice(0, cursorPosition) + '0';
        this.resultCursorPosition = cursorPosition + 1;
      } else {
        str = str.slice(0, cursorPosition) + '0' + str.slice(cursorPosition + 1);
        this.resultCursorPosition = cursorPosition + 1;
      }
    } else if (str.length === 3) {
      if (str.indexOf(',') > -1) {
        str = '0' + str.slice(0);
        this.resultCursorPosition = cursorPosition;
      } else {
        str = str.slice(0, 1) + ',' +  str.slice(1);
        this.resultCursorPosition = cursorPosition;
      }// удаление попадает на запятую
    } else { // удаленние слева от запятой
      if (str.charAt(cursorPosition) === ' ') {
        str = str.slice(0, cursorPosition) + str.slice(cursorPosition + 2);
        this.resultCursorPosition = cursorPosition;
      } else {
        str = str.slice(0, cursorPosition) + str.slice(cursorPosition + 1);
        this.resultCursorPosition = cursorPosition;
      }
    }


    return str;
  }

  changesBeforeComma(cursorPosition: number, str: string): string {
    if (str.length === 5 && cursorPosition === 2 && +str[0] === 0) {
      str = str.slice(1);
      this.resultCursorPosition = cursorPosition - 1;
    } else {
      this.resultCursorPosition = cursorPosition;
    }
    return str;
  }

  changesAfterComma(cursorPosition: number, str: string): string {
    if (cursorPosition === str.length) {
      str = str.slice(0, cursorPosition - 1);
    } else {
      str = str.slice(0, cursorPosition) + str.slice(cursorPosition + 1);
    }
    this.resultCursorPosition = cursorPosition;
    return str;
  }
}
