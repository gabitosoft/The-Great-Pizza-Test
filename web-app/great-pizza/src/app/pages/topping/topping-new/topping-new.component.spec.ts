import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingNewComponent } from './topping-new.component';

describe('ToppingNewComponent', () => {
  let component: ToppingNewComponent;
  let fixture: ComponentFixture<ToppingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToppingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
