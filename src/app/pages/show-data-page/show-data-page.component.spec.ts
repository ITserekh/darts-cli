import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataPageComponent } from './show-data-page.component';

describe('ShowDataPageComponent', () => {
  let component: ShowDataPageComponent;
  let fixture: ComponentFixture<ShowDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
