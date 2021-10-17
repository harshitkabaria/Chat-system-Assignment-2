import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { FormGroup, Validators, FormControl,FormBuilder  } from '@angular/forms';
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

  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput: ElementRef | undefined;
  fileUploadForm!: FormGroup ;
  fileInputLabel: string | undefined;

//   selectedFile: ImageSnippet | undefined;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }
 
  onFileSelect(event:any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm!.get('uploadedImage')!.setValue(file);
  }

  // onFileSelect(event:any) {
  //   const file = event.target.files[0];
  //   this.fileInputLabel = file.name;
  //   this.fileUploadForm.get('uploadedImage').setValue(file);
  // }

  upload(){
      if (!this.fileUploadForm!.get('uploadedImage')!.value) {
        alert('Please fill valid details!');
        return false;
      }
  
      const formData = new FormData();

      if(this.fileUploadForm){
      formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage')!.value);
      formData.append('agentId', '007');
      }
  
  
      this.http
        .post<any>('http://localhost:3000/uploadProfileImage', formData).subscribe(response => {
          debugger;
          console.log(response);
          if (response.statusCode === 200) {
            // Reset the file input
            if(this.uploadFileInput){
              this.uploadFileInput.nativeElement.value = "";
            }
            this.fileInputLabel = undefined;
          }
        }, er => {
          console.log(er);
          alert(er.error.error);
        });
    return true;
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
