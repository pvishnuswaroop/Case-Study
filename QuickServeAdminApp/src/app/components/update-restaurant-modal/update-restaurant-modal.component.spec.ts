import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestaurantModalComponent } from './update-restaurant-modal.component';

describe('UpdateRestaurantModalComponent', () => {
  let component: UpdateRestaurantModalComponent;
  let fixture: ComponentFixture<UpdateRestaurantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRestaurantModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRestaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
