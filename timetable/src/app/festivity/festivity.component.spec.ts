import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivityComponent } from './festivity.component';

describe('FestivityComponent', () => {
  let component: FestivityComponent;
  let fixture: ComponentFixture<FestivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
