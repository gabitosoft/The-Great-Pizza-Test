import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  isDisplayedSidebar: boolean;
  isDisplayedRightPanel: boolean;
  elementRightPanel: string;

  constructor(private storeService: StoreService, public dialog: MatDialog) { }

  ngOnInit() {
    this.storeService.currentStatus.subscribe(status => this.isDisplayedSidebar = status);
    this.storeService.rightPanelStatus.subscribe(status => this.isDisplayedRightPanel = status);
    this.storeService.currentElementRightPanel.subscribe(element => this.elementRightPanel = element);
  }

  public toggleSidenav(): void {
    this.storeService.toggleSidebar(!this.isDisplayedSidebar);
  }

  public toggleRightPanel(element: string): void {
    if (this.isDisplayedRightPanel && element !== this.elementRightPanel) {
      this.storeService.toggleRightPanel(true, element);
    } else {
      this.storeService.toggleRightPanel(!this.isDisplayedRightPanel, element);
    }
  }
}
