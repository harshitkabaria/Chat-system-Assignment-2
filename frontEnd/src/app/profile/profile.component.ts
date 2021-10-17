import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


// class ImageSnippet {
// 	constructor(public src: string, public file: File) {}
//   }
export class ProfileComponent implements OnInit {


//   selectedFile: ImageSnippet | undefined;
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
   
  }
  
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

    //   this.selectedFile = new ImageSnippet(event.target.result, file);

    //   this.imageService.uploadImage(this.selectedFile.file).subscribe(
    //     (res) => {
        
    //     },
    //     (err) => {
        
    //     })
    });

    reader.readAsDataURL(file);
  }
}
