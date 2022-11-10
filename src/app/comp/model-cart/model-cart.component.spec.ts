import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCartComponent } from './model-cart.component';

describe('ModelCartComponent', () => {
  let component: ModelCartComponent;
  let fixture: ComponentFixture<ModelCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
