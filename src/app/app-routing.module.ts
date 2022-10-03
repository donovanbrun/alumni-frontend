import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { SettingsPageComponent } from "./components/settings-page/settings-page.component";
import { SettingsPromotionComponent } from "./components/settings-promotion/settings-promotion.component";
import { AjoutPromoComponent } from "./components/settings/ajout-promo/ajout-promo.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomePageComponent, canActivate: [AuthGuardService]},
  { path: 'parametres', component: SettingsPageComponent, canActivate: [AuthGuardService]},
  { path: 'parametres/ajouter', component: AjoutPromoComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
