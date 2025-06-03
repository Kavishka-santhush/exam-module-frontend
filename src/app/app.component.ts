import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LayoutComponent} from './container/layout/layout.component';
import {SidebarComponent} from './container/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shortcourses-examinations-frontend';
}
