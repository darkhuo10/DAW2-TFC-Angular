import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility', () => {
    const menuToggle = fixture.debugElement.query(By.css('.menu-toggle'));
    const dropdownMenu = fixture.debugElement.query(By.css('.dropdown-menu'));

    expect(dropdownMenu.classes['open']).toBeFalsy();

    menuToggle.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(dropdownMenu.classes['open']).toBeTruthy();

    menuToggle.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(dropdownMenu.classes['open']).toBeFalsy();
  });
});