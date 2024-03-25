import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DoCheck,
  Input,
  QueryList,
  inject
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'inq-tab-group',
  standalone: true,
  imports: [TabComponent],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css'
})
export class TabGroupComponent implements AfterContentInit {
  private _selectedIndex: number = 0;
  isViewed = false;
  @Input() public set selectedIndex(index: number) {
    this._selectedIndex = index;
    if (this.tabs) {
      this.changeTab(index);
    }
  }
  @ContentChildren(TabComponent) public tabs!: QueryList<TabComponent>;


  public ngAfterContentInit(): void {
    this.isViewed  = false;
    this.setTab(this._selectedIndex);
  }

  private changeTab(newIndex: number): void {
    this.tabs.forEach((tabComponent: TabComponent) => {
      tabComponent.isActive = false;
    });
    this.setTab(newIndex);
  }

  private setTab(newIndex: number): void {
    const tabComponent: TabComponent | undefined = this.tabs.get(newIndex);
    if (tabComponent) {
      tabComponent.isActive = true;
    }
  }
}
