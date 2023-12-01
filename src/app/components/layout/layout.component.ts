import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnChanges {
  isValid: boolean = false;
  constructor(private router: Router,private authService:AuthServiceService) { }
  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.isValid = true;
    }
    else{
      this.isValid = false;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log();
    
    if(localStorage.getItem('token')){
      this.isValid = true;
    }
    else{
      this.isValid = false;
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
