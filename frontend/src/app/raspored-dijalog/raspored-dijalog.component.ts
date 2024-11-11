import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artikal } from '../model/artikal.model';
import { DialogData } from '../raspored-artikala/raspored-artikala.component';



@Component({
  selector: 'app-raspored-dijalog',
  templateUrl: './raspored-dijalog.component.html',
  styleUrls: ['./raspored-dijalog.component.css']
})

  

export class RasporedDijalogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public ref: MatDialogRef<RasporedDijalogComponent>) {
  }
  ngOnInit(): void {
    this.artikli=this.data.artikli;
    console.log(this.artikli)
  }

  artikli:Artikal[]

  
  izaberi(artikal:Artikal){
    this.ref.close(artikal)
    
    

  }
  
  odustani(){
    this.ref.close(null)
  }
  
  
  

}
