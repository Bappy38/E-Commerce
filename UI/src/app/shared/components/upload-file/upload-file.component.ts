import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public message: string;
  public progress: number;

  @Input() public buttonName: string;
  @Output() public onUploadFinished: any = new EventEmitter();

  userName: string;
  
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('loggedUser')
  }

  public uploadFile = (files) => {
    if(files.length === 0)
      return;
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append(this.userName, fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:5001/api/upload', formData, 
      {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if(event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
