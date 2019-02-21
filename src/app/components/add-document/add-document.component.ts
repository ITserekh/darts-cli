import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    for (const key in this.countyCode) {
      this.countryList.push ({code: key, name: this.countyCode[key].name});
    }
  }

  initForm() {
    this.controlForms = this.fb.group({
      number: [, [
        Validators.required
      ]],
      cost: ['0,00', [
        Validators.required
      ]],
      createDate: [new Date().toISOString().substring(0, 10), [
        Validators.required
      ]],
      unp: [, [
        Validators.required
      ]],
      country: [, [
        Validators.required
      ]]
    });
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
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      console.log('Invalid form');
    } else {
      const result = this.controlForms.value;
      result.cost = result.cost.replace(/\s+/g, '');
      console.log(result);
    }
  }
}
