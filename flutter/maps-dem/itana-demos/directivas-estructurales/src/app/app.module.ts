import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccesoUsuarioDirective } from 'src/directives/acceso-usuario.directive';
import { TablaComponent } from './components/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent, AccesoUsuarioDirective, TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

