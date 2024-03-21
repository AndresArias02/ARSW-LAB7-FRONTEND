import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetBlueprintsComponent } from './get-blueprints/get-blueprints.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateBlueprintComponent } from './create-blueprint/create-blueprint.component';

@NgModule({
  declarations: [
    AppComponent,
    GetBlueprintsComponent,
    CreateBlueprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
