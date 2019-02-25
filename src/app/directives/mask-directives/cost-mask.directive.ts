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

  // для текущего ngModelChange, проверить было ли предыдущим действие удаления
  previousIsDelition = false;

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
    const cursorPosition = this.el.nativeElement.selectionStart; // получить позицию курсора в строке
    const condition = event.replace(/\D/g, '');
    let str = event;

    console.log(cursorPosition);

    // Если происходит нажатие клавиши backspase или delete
    if (backspaceKey || deleteKey) {
      if (backspaceKey && cursorPosition) {
        str = this.deleleWithBackspaceKey(cursorPosition, str);
      } else if (deleteKey && cursorPosition !== str.length) {
        str = this.deleteWithDeleteKey(cursorPosition, str);
      }
      this.previousIsDelition = true;
      this.previousString = str;
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
      this.previousIsDelition = false;
      this.resultCursorPosition = 1;
    }

    // если нажимать BACKSPACE при установки курсора на позиции ноль, курсор смещается в конец
    if (cursorPosition === 0 && backspaceKey) {
      this.previousIsDelition = false;
    }

    // Разбиение на строки
    this.previousValue = str.replace(/\D/g, ''); // Для сравнения при следующем изменения, для лишних символов
    const num = str.replace(/\D/g, '') / 100;

    const newVal = num.toLocaleString('ru-RU', {minimumFractionDigits: 2});

    // изменить курсор при добавлении/удалении пробела
    if (this.previousLength - newVal.length === -2) {
      this.resultCursorPosition = cursorPosition + 1;
      // использование  клавиши BACKSPACE с удалением пробела в строке
    } else if (this.previousLength - newVal.length === 2 && !deleteKey) {
      // Курсор в начале, что бы не перебрасывало его в конец
      if (cursorPosition === 1) {
        this.resultCursorPosition = 0;
        // Курсор в середине
      } else {
        this.resultCursorPosition = cursorPosition - 2;
      }
      // использование клавиши DELETE с удалением пробела
    } else if (this.previousLength - newVal.length === 2 && deleteKey) {
      // если курсор в начале, там его и оставить (без этого перекидывает в конец)
      if (cursorPosition === 0) {
        this.resultCursorPosition = cursorPosition;
        // курсор в середине
      } else {
        this.resultCursorPosition = cursorPosition - 1;
      }
    } else if (this.previousLength - newVal.length === 1 && deleteKey && newVal.charCodeAt(cursorPosition - 1) === 160) {
      this.resultCursorPosition = cursorPosition + 1;
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
      // курсор стоит справа от запятой, удаляется первый символ слева от запятой
    } else if (cursorPosition === str.length - 2) {
      str = str.slice(0, cursorPosition - 2) + str.slice(str.length - 3);
      this.resultCursorPosition = cursorPosition - 2;
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
      } else {
        str = str.slice(0, cursorPosition - 1) + str.slice(cursorPosition);
      }
      this.resultCursorPosition = cursorPosition - 1;
    }
    return str;
  }

  deleteWithDeleteKey(cursorPosition: number, str: string): string {
    if (cursorPosition >= str.length - 2) { // удаление справа от запятой
      if (cursorPosition === str.length - 1) {
        str = str.slice(0, cursorPosition) + '0';
        this.resultCursorPosition = cursorPosition + 1;
      } else {
        str = str.slice(0, cursorPosition) + '0' + str.slice(cursorPosition + 1);
        this.resultCursorPosition = cursorPosition + 1;
      }
    } else if (cursorPosition === str.length - 3) {
      str = str.slice(0, cursorPosition + 1) + '0' + str.slice(str.length - 1);
      this.resultCursorPosition = str.length - 1;
    } else if (str.length === 3) { // удаление попадает на запятую
      if (str.indexOf(',') > -1) {
        str = '0' + str.slice(0);
        this.resultCursorPosition = cursorPosition;
      } else {
        str = str.slice(0, 1) + ',' +  str.slice(1);
        this.resultCursorPosition = cursorPosition;
      }
    } else { // удаленние слева от запятой
      // если первый удаляемый знак стоит пробел
      if (str.charCodeAt(cursorPosition) === 160) {
        str = str.slice(0, cursorPosition) + str.slice(cursorPosition + 2);
        this.resultCursorPosition = cursorPosition  - 1;
      } else {
        str = str.slice(0, cursorPosition) + str.slice(cursorPosition + 1);
        this.resultCursorPosition = cursorPosition;
      }
    }
    return str;
  }

  changesBeforeComma(cursorPosition: number, str: string): string {
    // удаляет добавленный в переди 0
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
