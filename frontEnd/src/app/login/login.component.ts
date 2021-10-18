import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // input vars
  loginUsername:string = "";
  loginPassword:string = "";
  //  password: string = "";
    role: string = '';
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
     // this.router.navigateByUrl('/dashboard');
  }
  else{
    this.router.navigateByUrl('/');
  }
  }
  public login(): void{
    if (this.loginUsername === "" || this.loginPassword === "") {
      this.toastr.error("You must enter an email and a username!");
      return;
    } else if (typeof(Storage) !== "undefined") {
      const req = this.http.post('http://localhost:3000/api/auth', {
          username: this.loginUsername,
          password: this.loginPassword,
        })
        .subscribe((data: any) => {
            if (data.success) {
              localStorage.setItem('user', JSON.stringify(data));
              
              this.router.navigateByUrl('/dashboard');
              window.location.reload();
              this.toastr.success(`Login Successful!!`, '');
              //window.location.reload();
            } else {
              this.toastr.error('Username or password incorrect!');
            }
          },
          () => {
            this.toastr.error('An error has occured trying to create user.')
            console.log("Error occured");
            return;
          });
    } else {
      console.log('Local Storage Undefined');
      this.toastr.error("Error: Local Storage Undefined!")
      return;
    }
  }

}
