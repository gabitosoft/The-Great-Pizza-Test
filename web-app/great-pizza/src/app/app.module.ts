import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material';
import { MaterialComponentsModule} from './material-components/material-components.module';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from './components/table/table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PizzaListComponent } from './pages/pizza/pizza-list/pizza-list.component';
import { PizzaNewComponent } from './pages/pizza/pizza-new/pizza-new.component';
import { ToppingListComponent } from './pages/topping/topping-list/topping-list.component';
import { ToppingNewComponent } from './pages/topping/topping-new/topping-new.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Routes = [
  { path: 'topping/new', component: ToppingNewComponent },
  { path: 'topping/list', component: ToppingListComponent },
  { path: 'pizza/new', component: PizzaNewComponent },
  { path: 'pizza/list', component: PizzaListComponent },
  { path: '', redirectTo: 'pizza/list', pathMatch: 'full' }
];

@NgModule({
  entryComponents: [ ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    FooterComponent,
    TableComponent,
    PizzaListComponent,
    PizzaNewComponent,
    ToppingListComponent,
    ToppingNewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MaterialComponentsModule,
    MatNativeDateModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaterialTimepickerModule.forRoot(),
    FlexLayoutModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
