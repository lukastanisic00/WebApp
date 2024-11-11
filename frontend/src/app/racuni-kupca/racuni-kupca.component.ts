import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Artikal } from '../model/artikal.model';
import { Kupac } from '../model/kupac.model';
import { Racun } from '../model/racun';
import { DialogData } from '../raspored-artikala/raspored-artikala.component';
import { RasporedDijalogComponent } from '../raspored-dijalog/raspored-dijalog.component';
import { KorisnikService } from '../services/korisnik.service';

export interface RacunDijalogData {
  racun:Racun;
  
}

@Component({
  selector: 'app-racuni-kupca',
  templateUrl: './racuni-kupca.component.html',
  styleUrls: ['./racuni-kupca.component.css']
})
export class RacuniKupcaComponent implements OnInit {

  constructor(private ruter:Router,private servis:KorisnikService,public dialog:MatDialog) { }

  kupac:Kupac;
  racuni:Array<Racun>;
  poruka:string;

  ngOnInit(): void {
    this.kupac = JSON.parse(localStorage.getItem('prijavljenKupac') );
    this.dohvatiRacune();
  }

  dohvatiRacune(){
    this.servis.dohvatiRacuneKupca(this.kupac.brLk).subscribe((res:Racun[])=>{
      if (res){
        this.racuni=res;

      }
      else{
        this.poruka="Нема рачуна за приказ";
      }
    })
  }

  detalji(izabranRacun:Racun): any {
    const dialogRef =this.dialog.open(RacuniDijalog, {
      data: {
        racun:izabranRacun
      },
    });
    
  
    

}
}
@Component({
  selector: 'c',
  templateUrl: 'racuni-kupca-dijalog.html',
})
export class RacuniDijalog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RacunDijalogData,public ref: MatDialogRef<RacuniDijalog>) {
    
  }

  racun=this.data.racun;


  
  zatvori(){
    this.ref.close(null)
  }
  
  
  

}
