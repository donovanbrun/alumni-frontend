import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-line-chart-situation',
  templateUrl: './line-chart-situation.component.html',
  styleUrls: ['./line-chart-situation.component.scss'],
})
export class LineChartSituationComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() promotion!: number;
  public labels: string[] = [];
  public barChartOptions: ChartConfiguration['options'];
  public barChartPlugins = [DataLabelsPlugin];
  public barChartType!: ChartType;
  public barChartData!: ChartData<'bar'>;

  public dataStaying: number[] = [];
  public dataChanging: number[] = [];
  public dataNotWorking: number[] = [];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getSituation();
  }

  getSituation() {
    this.statisticsService.getSituation().subscribe((response) => {
      response.forEach((element) => {
        this.dataStaying.push(element.STAYING);
        this.dataChanging.push(element.CHANGING);
        this.dataNotWorking.push(element.NOTWORKING);
        this.labels.push(element.PROMOTION.toString());
      });

      this.barChartOptions = {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              font: {
                size: 20,
                family: 'Quicksand',
              },
            },
          },
          y: {
            stacked: true,
            min: 0,
            max: 40,
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: "Situations des alumnis selon l'année",
          },
          datalabels: {
            labels: {
              font: {
                color: 'white',
                font: {
                  size: 10,
                },
              },
            },
          },
        },
      };
      this.barChartType = 'bar';
      this.barChartData = {
        labels: this.labels,
        datasets: [
          {
            label: 'Alumnis restés',
            data: this.dataStaying,
            backgroundColor: ['#001e42'],
            hoverBackgroundColor: ['#001e42'],
          },
          {
            label: 'Alumnis partis',
            data: this.dataChanging,
            backgroundColor: ['#afcb37'],
            hoverBackgroundColor: ['#afcb37'],
          },
          {
            label: 'Autres',
            data: this.dataNotWorking,
            backgroundColor: ['#00bcd7'],
            hoverBackgroundColor: ['#00bcd7'],
          },
        ],
      };
    });
  }
}
