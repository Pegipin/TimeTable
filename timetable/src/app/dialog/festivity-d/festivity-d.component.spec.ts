import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivityDComponent } from './festivity-d.component';

describe('FestivityDComponent', () => {
  let component: FestivityDComponent;
  let fixture: ComponentFixture<FestivityDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivityDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivityDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
