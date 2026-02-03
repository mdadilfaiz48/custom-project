import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCart } from './add-cart';

describe('AddCart', () => {
  let component: AddCart;
  let fixture: ComponentFixture<AddCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
