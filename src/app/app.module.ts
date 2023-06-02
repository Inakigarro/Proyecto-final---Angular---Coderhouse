import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from './components/components.module';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule, isDevMode } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouterService } from './router/router.service';
import { headerReducer } from './header/+state/header.reducer';
import { HeaderEffects } from './header/+state/header.effects';

const MaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MaterialModules,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    StoreModule.forRoot({ routerReducer, header: headerReducer }, {}),
    EffectsModule.forRoot([HeaderEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer',
    }),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (p: PlatformLocation) => p.getBaseHrefFromDOM(),
      deps: [PlatformLocation],
    },
    {
      provide: RouterService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
