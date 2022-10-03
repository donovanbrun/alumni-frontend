import { Component, OnInit } from '@angular/core';
import { AddPromoService } from 'src/app/services/ajout-promo/add-promo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {PromotionService} from "../../../services/promotion.service";

@Component({
  selector: 'app-ajout-promo',
  templateUrl: './ajout-promo.component.html',
  styleUrls: ['./ajout-promo.component.scss']
})
export class AjoutPromoComponent implements OnInit {

  public file : any;
  public isSideNavOpened: boolean;
  public promotions: number[];
  public isLoadingPromotions: boolean

  constructor(
    private promoService : AddPromoService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private promotionService: PromotionService
  ) {
    this.isSideNavOpened = false;
    this.promotions = [];
    this.isLoadingPromotions = false;
  }

  ngOnInit(): void {
    this.isLoadingPromotions = true;
    this.promotionService.getAllPromotions().subscribe((data: any) => {
      this.promotions = data.map((item: any) => item.promotion).sort((a: any, b: any) => b - a);
      this.isLoadingPromotions = false;
    });
  }

  addPromo() {
    if (this.file) {

      let formData = new FormData();
      formData.append('file', this.file);

      this.promoService.send(formData).subscribe(
        res => {
          this.showSnackBar("Promotion ajoutée avec succès");
          this.file = undefined;
          this.router.navigate(["parametres"])
        },
        err => {
          this.showSnackBar("Erreur lors de l'ajout de la promotion");
        }
      );
    }
    else {
      this.showSnackBar("Veuillez choisir un fichier");
    }
  }

  handleFileInput(event : any) {
    this.file = event.target.files[0];
  }

  private showSnackBar(message : string) {
    this.matSnackBar.open(message, "", {
      duration: 3000
    });
  }

  openDialog() {
    this.dialog.open(AjoutPromoDialog, {
      minWidth: 'fit-content'
    });
  }

  handleSideNavOpen(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
  }
}

@Component({
  selector: 'app-ajout-promo-dialog',
  templateUrl: './ajout-promo-dialog.html',
  styleUrls: ['./ajout-promo-dialog.scss'],
})
export class AjoutPromoDialog {
  constructor() {}
}
