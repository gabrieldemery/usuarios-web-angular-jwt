import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage = '';

  errorMessages = {
    name: [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Informe um e-mail válido.' }
    ],
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
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
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

    this.authenticationService.register(user)
      .pipe(first())
      .subscribe(
        () => {
          this.errorMessage = '';
          this.router.navigate(['/login']);
        },
        e => {
          this.errorMessage = 'Erro ao se conectar, tente novamente mais tarde!';
        });
  }

  private setUser() {
    return {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    };
  }

}
