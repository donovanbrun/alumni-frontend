import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StudentService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Function that fetch all the students from the given promotion
   */
  public getAllStudentByPromotions(promotion: string) {
    return this.http.get("http://localhost:8000/studentByPromotion?promotion=" + promotion);
  }

  public getAllStudent() {
    return this.http.get("http://localhost:8000/students/");
  }

  public deleteStudent(id: number) {
    return this.http.delete("http://localhost:8000/students/" + id + "/");
  }

  public getAllStudentWithCompanies() {
    return this.http.get("http://localhost:8000/studentWithCompanies/");
  }

  public getAllStudentWithCompaniesByPromotions(promotion: string) {
    return this.http.get("http://localhost:8000/studentWithCompaniesByPromotion/" + promotion);
  }
}
