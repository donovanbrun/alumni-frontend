import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticsService } from 'src/app/services/statistics.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pie-chart-situation',
  templateUrl: './pie-chart-situation.component.html',
  styleUrls: ['./pie-chart-situation.component.scss'],
})
export class PieChartSituationComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() promotion!: number;
  labels: string[] = [
    'Alumnis restés',
    'Alumnis partis',
    'Autres',
  ];
  public data : number[] = [];
  public barChartOptions: ChartConfiguration['options'];
  public barChartPlugins = [DataLabelsPlugin];
  public barChartType!: ChartType;
  public barChartData!: ChartData<'doughnut'>;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getSituationPromotion(this.promotion);
  }

  getSituationPromotion(promotion: number) {
    this.statisticsService
      .getSituationPromotion(promotion)
      .subscribe((response) => {
        this.data.push(response.STAYING);
        this.data.push(response.CHANGING);
        this.data.push(response.NOTWORKING);

        this.barChartOptions = {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Situation des Alumnis',
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

        this.barChartType = 'doughnut';
        this.barChartData = {
          labels: this.labels,
          datasets: [
            {
              label: '',
              data: this.data,
              backgroundColor: ['#001e42', '#afcb37', '#00bcd7'],
              hoverBackgroundColor: ['#001e42', '#afcb37', '#00bcd7'],
            },
          ],
        };
      });
  }
}
