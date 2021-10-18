import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  loginUsername: string = '';
	email: string = '';
	role: string = '';
	user:any;
	password:any;
	imagePath:any;
	isthisSuperAdmin:any;

	//deletedUser: string;
	users = [{}];
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  public addUser(): void {
		// Function used to create user & post to backend API
// 		event.preventDefault();
		if (sessionStorage.role != "user") {
			if (this.loginUsername === "" || this.email === "" || this.role === "") {
				alert("All fields must not be blank!");
			} else {
				const req = this.http.post('http://localhost:3000/api/userRegistration', {
						username: this.loginUsername,
						email: this.email,
						password:this.password,
						userImage:this.imagePath,
						role: parseInt(this.role)
					})
					.subscribe((data: any) => {
							if (!data.ok) {	
								console.log("user creater data",data)							
                                this.toastr.success(`User created successfully`, '');
								this.loginUsername = '';
								this.email = '';
								this.role = '';
								this.password = '';
								this.imagePath = '';
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
