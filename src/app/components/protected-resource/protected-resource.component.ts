import {Component, OnInit} from '@angular/core';
import { HelloApiService } from '../../services/hello-api.service';

@Component({
  selector: 'app-protected-resource',
  imports: [],
  templateUrl: './protected-resource.component.html',
  styleUrl: './protected-resource.component.css'
})
export class ProtectedResourceComponent implements OnInit {

  sessionId: string = '';

  constructor(private helloApiService: HelloApiService) {

  }

  ngOnInit(): void {
    this.helloApiService.getSessionId().subscribe((sessionId) => {
      console.log(sessionId);
      this.sessionId = sessionId;
    })
  }

}
