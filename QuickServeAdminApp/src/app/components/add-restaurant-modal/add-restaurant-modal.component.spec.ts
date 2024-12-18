import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantModalComponent } from './add-restaurant-modal.component';

describe('AddRestaurantModalComponent', () => {
  let component: AddRestaurantModalComponent;
  let fixture: ComponentFixture<AddRestaurantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRestaurantModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
