import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ResponseGender } from 'src/app/models/response-gender-model';

@Component({
  selector: 'app-pie-chart-gender',
  templateUrl: './pie-chart-gender.component.html',
  styleUrls: ['./pie-chart-gender.component.scss'],
})
export class PieChartGenderComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() promotion!: number;
  pieChartLabels = ['Homme', 'Femme'];
  public barChartOptions: ChartConfiguration['options'];
  public barChartPlugins = [DataLabelsPlugin];
  public barChartType!: ChartType;
  public barChartData!: ChartData<'pie'>;
  promotionGender!: ResponseGender;
  pieChartData: number[] = [];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getNumberGenderPromotion(this.promotion);
  }

  getNumberGenderPromotion(promotion: number) {
    this.statisticsService
      .getNumberGenderPromotion(promotion)
      .subscribe((response) => {
        console.log(response)
        this.promotionGender = response;
        this.pieChartData.push(this.promotionGender.HOMME);
        this.pieChartData.push(this.promotionGender.FEMME);
        this.barChartOptions = {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Civilité des Alumnis',
            },
            legend: {
              position: 'bottom',
            },
            datalabels: {
              labels: {
                font: {
                  color: 'white',
                  font: {
                    size: 25,
                  },
                },
              },
            },
          },
        };
        this.barChartType = 'pie';

        this.barChartData = {
          labels: this.pieChartLabels,
          datasets: [
            {
              label: '',
              data: this.pieChartData,
              backgroundColor: ['#001e42', '#afcb37'],
              hoverBackgroundColor: ['#001e42', '#afcb37'],
            },
          ],
        };
      });
  }
}
