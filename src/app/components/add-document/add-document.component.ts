import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  controlForms: FormGroup;

  countryList = [
    { code: 112, name: 'Belarus' },
    { code: 643, name: 'Russia' },
    { code: 500, name: 'USA' }
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.controlForms = this.fb.group({
      number: [null],
      sum: [null],
      createDate: [new Date().toISOString().substring(0, 10)],
      unp: [],
      country: []
    });
    this.controlForms.controls.country.valueChanges.subscribe(country => this.toogleUnpLength(country));
  }

  toogleUnpLength(countryCode: string) {
    this.controlForms.controls.unp.clearValidators();
    const unpControl = this.controlForms.controls.unp;
    switch (countryCode) {
      case '112': unpControl.setValidators(Validators.maxLength(9));
                  console.log('112');
                  break;
      default: unpControl.setValidators(Validators.maxLength(13));
    }
    console.log(unpControl);
  }

  saveDocument() {
    console.log(this.controlForms.getRawValue());
    console.log(this.controlForms.controls.unp);
  }
}
