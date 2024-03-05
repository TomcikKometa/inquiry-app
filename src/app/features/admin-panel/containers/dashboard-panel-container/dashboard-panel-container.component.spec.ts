import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPanelContainerComponent } from './dashboard-panel-container.component';

describe('AdminPanelContainerComponent', () => {
  let component: DashboardPanelContainerComponent;
  let fixture: ComponentFixture<DashboardPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPanelContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
