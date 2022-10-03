import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {

  promotion = 2019;
  public selectedPromotion!: number;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params["promotion"] && params["promotion"] != "all") {
        this.selectedPromotion = params["promotion"];
      } else if(params["promotion"] == "all") {
        this.selectedPromotion = 0;
      }
      else {
        this.selectedPromotion = 0;
      }
    });
  }

  isGeneral() : boolean{
    return this.selectedPromotion === 0;
  }

}
