import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent {

  @Output()
  onDisplaySideNav: EventEmitter<any>;

  @Input()
  public selectedPromotion!: string;

  @Input()
  public isSettingsMode!: boolean

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.onDisplaySideNav = new EventEmitter();
  }

  /**
   * Function to handle when the user click on menu button
   * and emit an event to inform parent component in order to
   * display the sidebar
   */
  handleDisplaySideNav() {
    this.onDisplaySideNav.emit();
  }

  /**
   * Function to handle when the user click on settings button
   * and update the url to display the Administration view
   */
  handleSettings() {
    this.router.navigate(["parametres"]);
  }

  /**
   * Function to handle when the user click on home button
   * and update the url to display the Home view
   */
  handleHome() {
    this.router.navigate([""], { queryParams: { promotion: "all" } });
  }

  /**
   * Function to handle when the user click on the logout button
   */
  handleLogout() {
    this.authService.logout();
  }
}
