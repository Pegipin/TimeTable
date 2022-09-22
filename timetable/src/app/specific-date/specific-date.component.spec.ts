import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDateComponent } from './specific-date.component';

describe('SpecificDateComponent', () => {
  let component: SpecificDateComponent;
  let fixture: ComponentFixture<SpecificDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
