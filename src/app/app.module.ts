import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './components/login/login.module';
import { NavBarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MapComponent } from './components/statistics/map/map.component';
import { PieChartSituationComponent } from './components/statistics/pie-chart-situation/pie-chart-situation.component';
import { TableCompaniesComponent } from './components/statistics/table-companies/table-companies.component';
import { LineChartGenderComponent } from './components/statistics/line-chart-gender/line-chart-gender.component';
import { LineChartSituationComponent } from './components/statistics/line-chart-situation/line-chart-situation.component';
import { PieChartGenderComponent } from './components/statistics/pie-chart-gender/pie-chart-gender.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PromotionService } from './services/promotion.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { StudentService } from './services/student.service';
import { PromoCardComponent } from './components/promo-card/promo-card.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { SettingsPromotionComponent } from './components/settings-promotion/settings-promotion.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AjoutPromoComponent } from './components/settings/ajout-promo/ajout-promo.component';
import {ExportService} from "./services/export.service";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserCardComponent,
    NavBarComponent,
    StatisticsComponent,
    MapComponent,
    PieChartSituationComponent,
    TableCompaniesComponent,
    LineChartGenderComponent,
    LineChartSituationComponent,
    PieChartGenderComponent,
    PromoCardComponent,
    PopUpComponent,
    SettingsPromotionComponent,
    SettingsPageComponent,
    SideNavComponent,
    AjoutPromoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    NgChartsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    PromotionService,
    StudentService,
    ExportService
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
