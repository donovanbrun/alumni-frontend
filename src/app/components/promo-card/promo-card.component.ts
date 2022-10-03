import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StudentService} from "../../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit {

  public temp: any;
  public students: any;
  public selectedPromotion: string | undefined;
  public form: FormGroup | undefined;
  public search: string = "";


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params["promotion"] && params["promotion"] != "all") {
        this.selectedPromotion = params["promotion"];
        this.studentService.getAllStudentWithCompaniesByPromotions(params["promotion"]).subscribe(data => {
          this.students = data;
        });
      } else if(params["promotion"] == "all") {
        this.studentService.getAllStudentWithCompanies().subscribe(data => {
          this.students = data;
        });
      }
      else {
        this.selectedPromotion = undefined;
      }
    });
  }

  submit(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
    this.route.queryParams.subscribe(params => {
      if(params["promotion"] && params["promotion"] != "all") {
        this.selectedPromotion = params["promotion"];
        this.studentService.getAllStudentWithCompaniesByPromotions(params["promotion"]).subscribe(data => {
          this.students = data;
          if (this.search != ""){
            this.students = this.students.filter((s: any) =>
                 s.student.first_name.trim().toLowerCase().includes(<string>this.search.trim().toLowerCase())
              || s.student.last_name.trim().toLowerCase().includes(<string>this.search.trim().toLowerCase())
              || s.host_company.name.trim().toLowerCase().includes(<string>this.search.trim().toLowerCase())
            );
          }
        });
      } else if(params["promotion"] == "all") {
        this.studentService.getAllStudentWithCompanies().subscribe(data => {
          this.students = data;
          if (this.search != ""){
            this.students = this.students.filter((s: any) =>
              s.student.first_name.trim().toLowerCase().includes(<string>this.search.trim().toLowerCase())
              || s.student.last_name.trim().toLowerCase().includes(<string>this.search.trim().toLowerCase())
              || s.host_company.name.trim().toLowerCase().includes(<string>this.search.trim().toLowerCase())
            );
          }
        });
      }
      else {
        this.selectedPromotion = undefined;
      }
    });
  }
}
