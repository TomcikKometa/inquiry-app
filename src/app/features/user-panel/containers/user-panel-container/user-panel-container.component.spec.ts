import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelContainerComponent } from './user-panel-container.component';

describe('AdminPanelContainerComponent', () => {
  let component: UserPanelContainerComponent;
  let fixture: ComponentFixture<UserPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
