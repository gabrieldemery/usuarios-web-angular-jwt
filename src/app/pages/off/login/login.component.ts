import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  errorMessages = {
    username: [
      { type: 'required', message: 'Usuário é obrigatório.' },
    ],
    password: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Informe uma senha com mais de cinco caracteres.' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])]
    });
  }

  submit() {
    const user = this.setUser();

    this.authenticationService.login(user)
      .pipe(first())
      .subscribe(
        () => {
          this.errorMessage = '';
          this.router.navigate(['/']);
        },
        e => {
          this.errorMessage = 'Erro ao se conectar, tente novamente mais tarde!';
        });
  }

  private setUser() {
    return {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
  }

}
