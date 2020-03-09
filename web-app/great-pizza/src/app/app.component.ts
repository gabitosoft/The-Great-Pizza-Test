import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { TranslateService, TranslateDefaultParser } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showFiller = false;
  isOpenSidenav = true;

  constructor(public translate: TranslateService, private storeService: StoreService) {
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.storeService.currentStatus.subscribe(status => this.isOpenSidenav = status);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
