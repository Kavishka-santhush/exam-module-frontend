import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],  // 👈 Import modules needed
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn = false;
  showUserMenu = false;
  user: any;
  email: string = '';
  name: string = '';
  dropdownPosition = { top: 0, left: 0 };

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isSignedIn = this.tokenStorage.isUserAuthenticated();
    this.user = this.isSignedIn ? this.tokenStorage.getUser() : {};
    if(this.isSignedIn && this.user) {
      this.email = this.user.email || '';
      this.name = this.user.nameWithInitials || '';
    }

  }

  toggleUserMenu(event: MouseEvent): void {
    this.showUserMenu = !this.showUserMenu;

    if (this.showUserMenu) {
      // Adjust offset for positioning the dropdown slightly below and to the left
      this.dropdownPosition.top = event.clientY + 10;
      this.dropdownPosition.left = event.clientX - 350; // Adjust based on dropdown width
    }
  }



  signOut(): void {
    this.tokenStorage.signOut();
    this.isSignedIn = false;
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
