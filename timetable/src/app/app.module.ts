import { AngularMaterialModule } from './modules/angular-material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OpeningTimeComponent } from './opening-time/opening-time.component';
import { SpecificDateComponent } from './specific-date/specific-date.component';
import { FestivityComponent } from './festivity/festivity.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Interceptor } from '../Http/interceptor';
import { DemoService } from '../Service/demo.service';
import { Context } from '../Service/DNN/context.service';
import { AppComponent } from './app.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIcon } from '@angular/material';
import { AddEditComponent } from './dialog/add-edit/add-edit.component';
 import { FestivityDComponent } from './dialog/festivity-d/festivity-d.component';
import { AddEditSpecificComponent } from './dialog/add-edit-specific/add-edit-specific.component';




@NgModule({
  entryComponents: [
    AddEditComponent,FestivityDComponent,AddEditSpecificComponent
  ],
  declarations: [
    AppComponent,
    OpeningTimeComponent,
    SpecificDateComponent,
    FestivityComponent,
    MainPageComponent,
    AddEditComponent,AddEditComponent, AddEditSpecificComponent, FestivityDComponent,  AddEditSpecificComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // important - this changed in Angular 4.3
    AngularMaterialModule,    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    Context,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    DemoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
