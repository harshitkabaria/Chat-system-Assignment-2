import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';
  isLoggedin = false;
  loggedInUser:any;
  isSuperAdmin:boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
     this.loggedInUser = localStorage.getItem('user');  
   if (localStorage.getItem('user') != null) {
     this.isLoggedin = true;
     if(JSON.parse(this.loggedInUser).role == 4){
       
       this.isSuperAdmin = true;
     }
     else{
       this.isSuperAdmin =false;
     }
   }
   else{

     this.isLoggedin = false;
     this.router.navigateByUrl('/');
   
   }
}


  public logout(){   
    localStorage.removeItem('user');
      this.router.navigateByUrl('/');
    window.location.reload();
  
   }
}
