import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './faq/faq.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';//Pendiente xd
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { WindowService } from './services/window/window.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MessageService } from './services/message/message.service';

import { ChartsModule } from 'ng2-charts';
import { PedidosComponent } from './pedidos/pedidos.component'; //para la grafica

import { QrCodeModule } from 'ng-qrcode';
import { CodigoqrService } from './services/codigoQR/codigoqr.service';
import { PesosPipe } from './pipes/pesos.pipe';
import { FistNamePipe } from './pipes/fist-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    FaqComponent,
    ContactComponent,
    AboutComponent,
    AdminviewComponent,
    MenuComponent,
    EstadisticasComponent,
    PedidosComponent,
    PesosPipe,
    FistNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    AngularFireAuthGuardModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    QrCodeModule
  ],
  providers: [WindowService, MessageService, CodigoqrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
