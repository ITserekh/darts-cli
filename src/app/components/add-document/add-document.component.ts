import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { ValidatorsInterface } from '../../services/interfaces/validators-interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  validatorsMessages: ValidatorsInterface;

  controlForms: FormGroup;

  countryList = [];

  countyCode = {
    122: {
      name: 'Belarus',
      lengthUnp: 9
    },
    643: {
      name: 'Russia',
      lengthUnp: 13
    },
    500: {
      name: 'USA',
      lengthUnp: 13
    }
  };

  constructor(private fb: FormBuilder,
              private dateTimeAdapter: DateTimeAdapter<any>,
              private translate: TranslateService) {
    dateTimeAdapter.setLocale('ru-RU');
  }

  ngOnInit() {
    // this.initCountryList();
    for (const key in this.countyCode) {
      this.countryList.push ({code: key, name: this.countyCode[key].name});
    }
    this.initForm();
    this.getMessages();
    this.translate.onLangChange.subscribe( () => {
      this.getMessages();
    });
  }

  initForm() {
    this.controlForms = this.fb.group({
      number: [, [
        Validators.required
      ]],
      cost: ['0,00', [
        Validators.required
      ]],
      createDate: [new Date(), [
        Validators.required
      ]],
      unp: [, [
        Validators.required,
        Validators.maxLength(this.countyCode[this.countryList[0].code].lengthUnp)
      ]],
      country: [this.countryList[0].code, [
        Validators.required
      ]]
    });
    this.controlForms.updateValueAndValidity();
    this.controlForms.controls.country.valueChanges.subscribe(country => this.toogleUnpLength(country));
  }

  toogleUnpLength(countryCode: string) {
    const unpControl = this.controlForms.controls.unp;
    unpControl.clearValidators();
    unpControl.setValidators( [Validators.required, Validators.maxLength(this.countyCode[countryCode].lengthUnp)]);
    unpControl.updateValueAndValidity();
  }

  saveDocument() {
    const controls = this.controlForms.controls;

    if (this.controlForms.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched();
        if (controls[controlName].invalid) {
          controls[controlName].updateValueAndValidity();
        }
      });
      console.log('Invalid form');
    } else {
      const result = this.controlForms.value;
      result.cost = result.cost.replace(/\s+/g, '');
      console.log(result);
    }
  }
  getMessages() {
    this.translate.get('document-validators-messages').subscribe(validators => {
      this.validatorsMessages = validators;
    });
  }
}
