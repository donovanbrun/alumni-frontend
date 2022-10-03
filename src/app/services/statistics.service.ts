import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseGender, ResponseNumberStudent, ResponseSituation } from '../models/response-gender-model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private urlGenderPromotion = "http://127.0.0.1:8000/studentGenderPromotion";
  private urlGender = "http://127.0.0.1:8000/studentGender/";
  private urlNumberStudentPromotion = "http://127.0.0.1:8000/companyNumberPromotion";
  private urlNumberStudent = "http://127.0.0.1:8000/companyNumber/";
  private urlSituationPromotion = "http://127.0.0.1:8000/alumniSituationPromotion";
  private urlSituation = "http://127.0.0.1:8000/alumniSituation/";
  constructor(private readonly http: HttpClient) {}

  getNumberGenderPromotion(promotion: number): Observable<ResponseGender> {
    return this.http.get<ResponseGender>(`${this.urlGenderPromotion}/${promotion}`);
  }

  getNumberGender(): Observable<ResponseGender[]> {
    return this.http.get<ResponseGender[]>(this.urlGender);
  }

  getNumberStudentCompanyPromotion(promotion : number) : Observable<ResponseNumberStudent[]> {
    return this.http.get<ResponseNumberStudent[]>(`${this.urlNumberStudentPromotion}/${promotion}`);
  }

  getNumberStudentCompany() : Observable<ResponseNumberStudent[]> {
    return this.http.get<ResponseNumberStudent[]>(this.urlNumberStudent);
  }

  getSituationPromotion(promotion: number): Observable<ResponseSituation> {
    return this.http.get<ResponseSituation>(`${this.urlSituationPromotion}/${promotion}`);
  }

  getSituation(): Observable<ResponseSituation[]> {
    return this.http.get<ResponseSituation[]>(this.urlSituation);
  }

}
