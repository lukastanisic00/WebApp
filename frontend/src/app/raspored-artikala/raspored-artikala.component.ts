import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { Artikal } from '../model/artikal.model';
import { Korisnik } from '../model/korisnik.model';
import { RasporedDijalogComponent } from '../raspored-dijalog/raspored-dijalog.component';
import { KorisnikService } from '../services/korisnik.service';



export type potkategorija = {
  naziv:string,
  artikli:Array<Artikal>,

}
export type kategorija = {
  naziv:string,
  artikli:Array<Artikal>,
  potkategorije:Array<potkategorija>
  id:String
}


export interface DialogData {
  artikli:Artikal[];
  
}



@Component({
  selector: 'c',
  templateUrl: './raspored-artikala.component.html',
  styleUrls: ['./raspored-artikala.component.css']
})

export class RasporedArtikalaComponent implements OnInit {

  constructor(public dialog:MatDialog,private korisnikServis:KorisnikService) { }

  sviArtikli:Artikal[];
  poruka:String;



kategorije:Array<kategorija>;

kategorisaniArtikli:Array<Artikal>;
izabranArtikal:Artikal;
nazivK:string;
nazivP:string;
korisnik:Korisnik;
id:String;
 
  
  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen'))
    this.id=this.korisnik.pib;
    this.kategorije= new Array<kategorija>;
    this.kategorisaniArtikli=new Array<Artikal>;
    this.dohvatiArtikle();
    

  }
  openDialogK(kategorija:kategorija): any {
      const dialogRef =this.dialog.open(RasporedDijalogComponent, {
        data: {
          artikli:this.sviArtikli
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
        this.dodajUKategoriju(result,kategorija);
        

        }

    
      });
    }
    openDialogP(potkategorija,kategorija): any {
      const dialogRef =this.dialog.open(RasporedDijalogComponent, {
        data: {
          artikli:this.sviArtikli
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
        this.dodajUPotkategoriju(result,potkategorija,kategorija);

        }

    
      });
    }

  dodajKategoriju(){
    if(this.nazivK!="")
    this.kategorije.push({naziv:this.nazivK,artikli:new Array<Artikal>,potkategorije:new Array<potkategorija>,id:this.id})
    this.nazivK=""

   
  }
  dodajUKategoriju(artikal:Artikal,kategorija:kategorija){
    if(this.kategorisaniArtikli.indexOf(artikal)>-1) this.poruka="Артикал је већ категорисан";
    else{
    kategorija.artikli.push(artikal);
    this.kategorisaniArtikli.push(artikal);
    }

   
  }
  dodajPotkategoriju(kategorija:kategorija){
    if(this.nazivP!="")
    kategorija.potkategorije.push({naziv:this.nazivP,artikli:new Array<Artikal>})
    this.nazivP=""

   
  }
  dodajUPotkategoriju(artikal:Artikal,potkategorija:potkategorija,kategorija:kategorija){
    if(this.kategorisaniArtikli.indexOf(artikal)>-1){
    if(kategorija.artikli.indexOf(artikal)>-1){
    potkategorija.artikli.push(artikal);
    kategorija.artikli.splice(kategorija.artikli.indexOf(artikal));
  }
  else{
    this.poruka="Артикал је већ категорисан";
  }
}
    else{
      potkategorija.artikli.push(artikal);
      this.kategorisaniArtikli.push(artikal);
    }

   
  }


  dohvatiArtikle(){
      this.korisnikServis.dohvatiArtikle(this.korisnik.pib).subscribe((artikli: Artikal[])=>{
        if(!artikli){
          this.poruka="Грешка при приказивању артикала";
        
        }
        else{
          this.sviArtikli=artikli;
          this.dohvatiKategorizaciju()  }
        }
      )
  }


   sacuvaj(){
    this.korisnikServis.sacuvajKategorizaciju(this.kategorije).subscribe((respObj)=>{
      if(respObj){
        this.poruka="Категорисање сачувано";
      }
    });

   }

   dohvatiKategorizaciju(){
    this.korisnikServis.dohvatiKategorizaciju(this.id).subscribe((kategorije:kategorija[])=>{
      if(kategorije){
        this.kategorije=kategorije;
      }
      else{
        this.poruka="Неуспешно дохватање категоризације";
        this.kategorije.forEach(kat=>{
          this.kategorisaniArtikli.concat(kat.artikli)
          kat.potkategorije.forEach(p => {
            this.kategorisaniArtikli.concat(p.artikli);
            
          });
        })
      }
    })
   }


  }



  
  
  
  @Component({
    selector: 'c',
    templateUrl: 'dialog-data-example-dialog.html',
  })
  export class DialogDataExampleDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public ref: MatDialogRef<DialogDataExampleDialog>) {
      console.log(this.artikli)
    }

    artikli=this.data.artikli;

    
    izaberi(artikal:Artikal){
      this.ref.close(artikal)
      
      

    }
    
    odustani(){
      this.ref.close(null)
    }
    
    
    
  
  }



