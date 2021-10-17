import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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

  imgFile: string | undefined;

  uploadForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   imgSrc: new FormControl('', [Validators.required])
 });
//   selectedFile: ImageSnippet | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
  }
  get uf(){
    return this.uploadForm.controls;
  }
  onImageChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });
   
      };
    }
  }

  upload(){
    console.log(this.uploadForm.value);
    debugger;
    this.http.post('', this.uploadForm.value)
      .subscribe(response => {
        alert('Image has been uploaded.');
      })
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
