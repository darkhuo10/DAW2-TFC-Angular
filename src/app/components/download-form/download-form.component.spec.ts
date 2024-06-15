import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadFormComponent } from './download-form.component';

describe('DownloadFormComponent', () => {
  let component: DownloadFormComponent;
  let fixture: ComponentFixture<DownloadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
