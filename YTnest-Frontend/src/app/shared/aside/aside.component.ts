import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/AuthService.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

userData: any;

constructor(private authService: AuthService) {}

ngOnInit() {
  this.userData = this.authService.getUserData();
}

}
