import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artikal } from '../model/artikal.model';
import { Sto } from '../model/sto';
import { DialogData } from '../raspored-artikala/raspored-artikala.component';
import { RasporedDijalogComponent } from '../raspored-dijalog/raspored-dijalog.component';


@Component({
  selector: 'app-dodaj-sto',
  templateUrl: './dodaj-sto.component.html',
  styleUrls: ['./dodaj-sto.component.css']
})
export class DodajStoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public ref: MatDialogRef<RasporedDijalogComponent>) {
  }
  ngOnInit(): void {
    this.sto = new Sto();
    this.sto.naziv='';
    this.sto.pozicija={x:0,y:0}
    this.sto.a=0;
    this.sto.b=0;
    this.sto.oblik='';
    this.sto.v=true;
    this.sto.status='O';


    this.message = "";

  }

  sto:Sto;
  message:String;

  
  izaberi(){
    if(this.sto.oblik=='O') this.sto.b=this.sto.a;
    if((this.sto.a<1)||(this.sto.b<1 && this.sto.oblik=='P')||(this.sto.oblik=='')||(this.sto.naziv=='')){
      this.message="Исправно унесите податке";

    }
    else{
    this.ref.close(this.sto)
    }
    

  }
  
  odustani(){
    this.ref.close(null)
  }
  
  
  

}
