import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfozonaComponent } from './infozona.component';

describe('InfozonaComponent', () => {
  let component: InfozonaComponent;
  let fixture: ComponentFixture<InfozonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfozonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfozonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
