import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseNumberStudent } from 'src/app/models/response-gender-model';
import { StatisticsService } from 'src/app/services/statistics.service';

export interface Company {
  name: string;
  number: number;
}

@Component({
  selector: 'app-table-companies',
  templateUrl: './table-companies.component.html',
  styleUrls: ['./table-companies.component.scss'],
})
export class TableCompaniesComponent implements OnInit {

  displayedColumns: string[] = ['entreprise', 'etudiant'];
  dataSource! : MatTableDataSource<ResponseNumberStudent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() promotion! : number;

  constructor(private statisticsService: StatisticsService){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    if (this.promotion != 0){
      this.getNumberStudentCompanyPromotion(this.promotion);
    }else{
      this.getNumberStudentCompany();
    }
    
  }

  getNumberStudentCompanyPromotion(promotion: number) {
    this.statisticsService
      .getNumberStudentCompanyPromotion(promotion)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      });
  }

  getNumberStudentCompany() {
    this.statisticsService
      .getNumberStudentCompany()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      });
  }
}
