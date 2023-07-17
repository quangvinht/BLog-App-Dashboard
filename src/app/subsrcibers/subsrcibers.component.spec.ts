import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsrcibersComponent } from './subsrcibers.component';

describe('SubsrcibersComponent', () => {
  let component: SubsrcibersComponent;
  let fixture: ComponentFixture<SubsrcibersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsrcibersComponent]
    });
    fixture = TestBed.createComponent(SubsrcibersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
