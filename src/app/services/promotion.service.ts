import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PromotionService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Function that fetch all the promotions from the API
   */
  public getAllPromotions() {
    return this.http.get("http://localhost:8000/promotions/");
  }

  /**
   * Function that fetch the API to delete a promotion
   */
  public deletePromotion(promotion: string) {
    return this.http.delete("http://localhost:8000/promotions/" + promotion);
  }
}
