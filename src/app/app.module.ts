import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { JwtInterceptor } from './Helpers/jwt.interceptor';
import { ErrorInterceptor } from './Helpers/error.interceptor';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module'
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { TitleHeaderComponent } from './components/title-header/title-header.component';
import { CensoComponent } from './pages/censo/censo.component';
import { ZonaComponent } from './pages/zona/zona.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EmpleadoComponent,
    TitleHeaderComponent,
    CensoComponent,
    ZonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    DemoNgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent, EmpleadoComponent]
})
export class AppModule { }
