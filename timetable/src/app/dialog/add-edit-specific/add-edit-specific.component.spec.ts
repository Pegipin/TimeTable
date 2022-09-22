import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSpecificComponent } from './add-edit-specific.component';

describe('AddEditSpecificComponent', () => {
  let component: AddEditSpecificComponent;
  let fixture: ComponentFixture<AddEditSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
