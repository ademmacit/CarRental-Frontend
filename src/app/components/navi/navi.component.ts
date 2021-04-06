import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}
  currentUserName: string | null = '';

  ngOnInit(): void {}

  CheckJwtToken(): boolean {
    if (this.localStorageService.Get('token')) {
      this.currentUserName = this.localStorageService.Get('userName');
      return true;
    } else {
      return false;
    }
  }

  Logout() {
    this.localStorageService.Clear();
  }
}
