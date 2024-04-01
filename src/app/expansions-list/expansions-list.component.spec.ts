import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionsListComponent } from './expansions-list.component';

describe('ExpansionsListComponent', () => {
  let component: ExpansionsListComponent;
  let fixture: ComponentFixture<ExpansionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpansionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
