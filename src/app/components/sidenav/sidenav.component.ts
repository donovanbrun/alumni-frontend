import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SideNavComponent {

  @Input()
  promotions!: number[];

  @Input()
  isSettingsMode!: boolean

  constructor(
    private router: Router
  ) {}

  /**
   * Function that handle when the user wants to add a promotion
   * and update the URL
   */
  public handleOnAddPromotion() {
    this.router.navigate(['parametres/ajouter']);
  }

  /**
   * Function that handle when the user select a promotion on the sidebar
   * menu
   * @param promotion the selected promotion
   */
  public handleOnChangePromotion(promotion: string) {
    if(this.isSettingsMode)
      this.router.navigate(['parametres/'], { queryParams: { promotion: promotion }});
    else
      this.router.navigate(['/'], { queryParams: { promotion: promotion }});
  }

}
