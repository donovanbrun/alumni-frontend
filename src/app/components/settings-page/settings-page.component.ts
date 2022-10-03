import { Component, OnInit } from '@angular/core';
import { PromotionService } from "../../services/promotion.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  public isSideNavOpened: boolean;

  public promotions: number[];

  public selectedPromotion: string;

  public isLoadingPromotions: boolean

  constructor(
    private promotionService: PromotionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isSideNavOpened = false;
    this.isLoadingPromotions = false;
    this.promotions = [];
    this.selectedPromotion = "";
    this.route.queryParams.subscribe(params => {
      if (params["promotion"] && this.promotions.includes(Number.parseInt(params["promotion"]))) {
        this.selectedPromotion = params["promotion"];
      } else {
        this.selectedPromotion = "";
      }
      this.isSideNavOpened = false;
    });
  }

  ngOnInit(): void {
    this.loadPromotions();
  }

  public handleSideNavOpen(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  public loadPromotions() {
    this.isLoadingPromotions = true;
    this.promotionService.getAllPromotions().subscribe((data: any) => {
      this.promotions = data.map((item: any) => item.promotion).sort((a: any, b: any) => b - a);
      if(this.promotions.length !== 0) {
        this.router.navigate(["parametres"], { queryParams: { promotion: this.promotions[0].toString() }});
      }
      this.isLoadingPromotions = false;
    });
  }
}
