import {Component, OnInit, inject} from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  private router = inject(Router);
  currentPath = this.router.url;

  showHeader: boolean = true;
  showSidebar: boolean = false;
  showMenuButton: boolean = true;

  ngOnInit(): void {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
        console.log(this.currentPath);
        console.log(['/a'].includes('/a'));
        if(['/login'].includes(this.currentPath)){
          console.log('true');
          this.showHeader = false;
          //this.showSidebar = false
          this.showMenuButton = false;
        }else{
          console.log('false');
          this.showHeader = true;
          //this.showSidebar = true;
          this.showMenuButton = true;
        }
      });



  }

}
