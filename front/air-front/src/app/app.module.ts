import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlainMapComponent } from './plain-map/plain-map.component';
import { CountriesDropMenuComponent } from './countries-drop-menu/countries-drop-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from 'src/material-module';
import { HttpClientModule } from '@angular/common/http';
import { CountriesService } from './countries-drop-menu/countries.service';


@NgModule({
  declarations: [
    AppComponent,
    PlainMapComponent,
    CountriesDropMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
