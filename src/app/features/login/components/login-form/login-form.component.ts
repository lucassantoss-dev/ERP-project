import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert.service';
import { LoginService } from 'src/app/core/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    if (this.form.valid) {
      const formvalue = Object.assign({}, this.form.getRawValue());
      this.loginService.login(formvalue).subscribe({
        next: () => {
          console.log('realizou login!')
          this.alertService.success('success', 'Login efetuado com sucesso!');
        }, error: (error: Error) => {
          console.error('Ocorreu um erro ao realizar login', error);
          this.alertService.error('Vish, deu erro!', 'Não foi possivel efetuar o login, verifique usuário e senha e tente novamente!')
        }
      })
    }
  }
}
