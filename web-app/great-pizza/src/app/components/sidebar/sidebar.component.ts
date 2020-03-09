import { Component, OnInit } from '@angular/core';
import { SidemenuService } from '../../services/sidemenu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private sideMenuService: SidemenuService) { }

  items = [];
  submenus = [];
  displayMode = 'flat';

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.sideMenuService.getItems()
    .subscribe((data: Array<any>) => {
      this.items = data;
      this.items.map(item => { item.isCollapsed = true; });
    });
  }

  collapse(item: any) {
    item.isCollapsed = !item.isCollapsed;
  }
}
