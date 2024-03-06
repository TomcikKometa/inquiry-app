import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsterPanelContainerComponent } from './pollster-panel-container.component';

describe('AdminPanelContainerComponent', () => {
  let component: PollsterPanelContainerComponent;
  let fixture: ComponentFixture<PollsterPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollsterPanelContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollsterPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
