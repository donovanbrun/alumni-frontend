import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-line-chart-gender',
  templateUrl: './line-chart-gender.component.html',
  styleUrls: ['./line-chart-gender.component.scss'],
})
export class LineChartGenderComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  labels : string[] = [];
  genderMenData: number[] = [];
  genderGirlsData: number[] = [];

  public barChartOptions: ChartConfiguration['options'];
  public barChartPlugins = [DataLabelsPlugin];
  public barChartType!: ChartType;
  public barChartData!: ChartData<'bar'>;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getNumberGender();
  }

  getNumberGender() {
    this.statisticsService.getNumberGender().subscribe((response) => {
      response.forEach((element) => {
        this.genderMenData.push(element.HOMME);
        this.genderGirlsData.push(element.FEMME);
        this.labels.push(element.PROMOTION.toString())
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
            text: "Proportions homme/femme selon l'année",
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
            label: 'Homme',
            data: this.genderMenData,
            backgroundColor: ['#001e42'],
            hoverBackgroundColor: ['#001e42'],
          },
          {
            label: 'Femme',
            data: this.genderGirlsData,
            backgroundColor: ['#afcb37'],
            hoverBackgroundColor: ['#afcb37'],
          },
        ],
      };
    });
  }
}
