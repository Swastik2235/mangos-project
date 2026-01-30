import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-popup',
  templateUrl: './pdf-popup.component.html',
  styleUrls: ['./pdf-popup.component.scss']
})
export class PdfPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PdfPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  pdfUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.pdf);
  }

}
