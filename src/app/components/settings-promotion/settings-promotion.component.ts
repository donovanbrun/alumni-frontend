import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StudentService} from "../../services/student.service";
import {PromotionService} from "../../services/promotion.service";
import {ExportService} from "../../services/export.service";

@Component({
  selector: 'app-settings-promotion',
  templateUrl: './settings-promotion.component.html',
  styleUrls: ['./settings-promotion.component.scss']
})
export class SettingsPromotionComponent implements OnInit {

  public selectedPromotion: string | undefined;
  public students: any;
  public displayedColumns = ["first_name", "last_name", "email", "delete"];

  @Output()
  onDeletePromotion: EventEmitter<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private studentService: StudentService,
    private promotionService: PromotionService,
    private exportService: ExportService
  ) {
    this.onDeletePromotion = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params["promotion"]) {
        this.selectedPromotion = params["promotion"];
        this.getStudents(params["promotion"])
      } else {
        this.selectedPromotion = undefined;
      }
    });
  }

  getStudents(promotion: string) {
    this.studentService.getAllStudentWithCompaniesByPromotions(promotion).subscribe(data => {
      this.students = data;
    });
  }

  handleDeletePromotion(): void {
    if(this.selectedPromotion) {
      this.promotionService.deletePromotion(this.selectedPromotion).subscribe(() => {
        this.router.navigate(["parametres"]);
        this.onDeletePromotion.emit();
      })
    }
  }

  handleDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      if(this.selectedPromotion)
        this.getStudents(this.selectedPromotion);
    })
  }

  handleExportPromotion() {
    this.exportService.exportToCsv(this.students, `${this.selectedPromotion}`, [
      "Prenom",
      "Nom de famille",
      "Promotion",
      "Email",
      "Genre",
      "Diplome",
      "Entreprise d'accueil",
      "Ville entreprise d'accueil",
      "Profession d'accueil",
      "Entreprise",
      "Ville entreprise",
      "Profession d'accueil",
      "Linkedin"
    ])
  }
}
