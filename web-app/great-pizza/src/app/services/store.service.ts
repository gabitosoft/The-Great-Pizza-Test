import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private isDisplayedSidebar = new BehaviorSubject(true);
  private isDisplayedRightPanel = new BehaviorSubject(false);
  private elementRightPanel = new BehaviorSubject('');

  currentStatus = this.isDisplayedSidebar.asObservable();
  rightPanelStatus = this.isDisplayedRightPanel.asObservable();
  currentElementRightPanel = this.elementRightPanel.asObservable();

  constructor() { }

  public toggleSidebar(status: boolean):void {
    this.isDisplayedSidebar.next(status);
  }

  public toggleRightPanel(status: boolean, element: string): void {
    this.isDisplayedRightPanel.next(status);
    this.elementRightPanel.next(element);
  }
}
