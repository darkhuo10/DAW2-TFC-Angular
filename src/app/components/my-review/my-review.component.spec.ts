import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReviewComponent } from './my-review.component';

describe('MyReviewComponent', () => {
  let component: MyReviewComponent;
  let fixture: ComponentFixture<MyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
