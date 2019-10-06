import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

// Interfaces
import { User } from 'src/app/interfaces/user';

// Services
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @Output() onClose = new EventEmitter();

  @Input() user: User;

  editForm: FormGroup;
  errorMessage = '';

  errorMessages = {
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Informe um e-mail válido.' }
    ]
  };

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });

    this.loadUser();
  }

  private loadUser() {
    this.editForm.get('email').setValue(this.user.email);
  }

  close(save = false) {
    this.onClose.emit(save);
    this.bsModalRef.hide();
  }

  submit() {
    const user = this.setUser();

    this.usersService.update(user)
    .subscribe(res => {
      if (res) {
        this.errorMessage = '';
        this.close(true);
      } else {
        this.errorMessage = res;
      }
    });
  }

  private setUser() {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.editForm.get('email').value,
      username: this.user.username
    };
  }

}
