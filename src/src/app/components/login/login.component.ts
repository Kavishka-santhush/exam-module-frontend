import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service'
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  errorMessage = '';
  data = {
    username: '',
    password: ''
  };

  constructor(
    private adminAuthService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  async onFormSubmit(data: { username: string; password: string }) {
    try {
      const res = await this.adminAuthService.login(data).toPromise();
      if(res && res.token && res.user){
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res.user);
        this.isLoggedIn = true;
        this.router.navigate(['/']).then(value => window.location.reload());
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          showConfirmButton: true,
          text: 'Login Failed!',
        });
      }

    } catch (err:any) {
      this.errorMessage = err['error']?.message|| 'Login failed. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        showConfirmButton: true,
        text: this.errorMessage,
      });
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isUserAuthenticated();
  }

}
