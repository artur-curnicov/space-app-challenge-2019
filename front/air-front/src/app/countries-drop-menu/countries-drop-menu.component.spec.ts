import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesDropMenuComponent } from './countries-drop-menu.component';

describe('CountriesDropMenuComponent', () => {
  let component: CountriesDropMenuComponent;
  let fixture: ComponentFixture<CountriesDropMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesDropMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesDropMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
