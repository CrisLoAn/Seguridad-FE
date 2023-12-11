import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/AuthService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private authService: AuthService, private toast: ToastrService) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.toast.success('Logged out successfully');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
