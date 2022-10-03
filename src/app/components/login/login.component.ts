import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from "./login-dto";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  loginFormModel: LoginDto

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.isLoading = false;
    this.isError = false;
    this.errorMessage = "";
    this.loginFormModel =  {
      username: "",
      password: ""
    };
  }

  /**
   * Function to handle when the login form is submitted
   * @param loginForm Object with the value of the username and the password
   */
  onSubmit(loginForm: NgForm) {
    this.isLoading = true;
    this.isError = false;
    this.authService.login(this.loginFormModel).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(["/"], { queryParams: { promotion: "all" } });
      },
      error: (response) => {
        this.isLoading = false;
        loginForm.resetForm();
        this.snackBar.open("Il y a eu une erreur lors de la connexion veuillez reessayer", "", {"duration": 5000});
        if (response.detail === "No active account found with the given credentials") {
          this.isError = true;
          this.errorMessage = "Connexion impossible";
        }
      },
    });
  }
}
