import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from "../../services/promotion.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  public isSideNavOpened: boolean;

  public promotions: number[];

  public selectedPromotion: string;

  public isLoadingPromotions: boolean

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private promotionService: PromotionService
  ) {
    this.isSideNavOpened = false;
    this.isLoadingPromotions = false;
    this.promotions = [];
    this.selectedPromotion = "all";
    this.route.queryParams.subscribe(params => {
      if (params["promotion"] && (this.promotions.includes(Number.parseInt(params["promotion"])) || params["promotion"] === "all")) {
        this.selectedPromotion = params["promotion"];
      } else {
        this.selectedPromotion = "all";
      }
      this.isSideNavOpened = false;
    });
  }

  ngOnInit(): void {
    this.isLoadingPromotions = true;
    this.promotionService.getAllPromotions().subscribe((data: any) => {
      this.promotions = data.map((item: any) => item.promotion).sort((a: any, b: any) => b - a);
      this.isLoadingPromotions = false;
    });
  }

  public handleSideNavOpen(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
  }
}
