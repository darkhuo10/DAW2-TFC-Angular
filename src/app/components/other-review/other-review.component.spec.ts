import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: OtherReviewComponent;
  let fixture: ComponentFixture<OtherReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
