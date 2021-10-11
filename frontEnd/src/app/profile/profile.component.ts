import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginUsername: string = '';
	email: string = '';
	role: string = '';
	user:any;
	isthisSuperAdmin:any;
  users = [{}];

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
   this.user = localStorage.getItem('user')
   this.loginUsername = this.user.username;
   this.email = this.user.email;
   console.log(this.user)
  }
  public updateProfile(): void {
		// Function used to create user & post to backend API
    // event.preventDefault();
		if (sessionStorage.role != "user") {
			if (this.loginUsername === "" || this.email === "" || this.role === "") {
				alert("All fields must not be blank!");
			} else {
				const req = this.http.post('http://localhost:3000/api/userRegistration', {
						username: this.loginUsername,
						email: this.email,
						role: parseInt(this.role)
					})
					.subscribe((data: any) => {
							if (data.success) {	
															
                this.toastr.success(`User created successfully`, '');
								this.loginUsername = '';
								this.email = '';
								this.role = '';
								const req = this.http.post('http://localhost:3000/api/getAllUsers', {})
									.subscribe((data: any) => {
											if (data.userData) {
												console.log('data', data.userData);
												this.users = data.userData;
												console.log('thisusers', this.users);

											} else {
												alert('Error!');
												return;
											}
										},
										err => {
											//alert('An error has occured trying to create user.')
											console.log("Error occured");
											return;
										});
							} else {
								this.toastr.error('Usename already exits!');
								return;
							}
						},
						err => {
							alert('An error has occured trying to create user.')
							console.log("Error occured");
							return;
						});
			}
		}
	}
}
