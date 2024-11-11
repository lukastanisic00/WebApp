import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DodajStoComponent } from '../dodaj-sto/dodaj-sto.component';
import { Korisnik } from '../model/korisnik.model';
import { Odeljenje } from '../model/odeljenje';
import { Sto } from '../model/sto';

import { KorisnikService } from '../services/korisnik.service';


export type Objekat={
  naziv:String;
  odeljenja:Array<Odeljenje>;
  id:String;
}





@Component({
  selector: 'app-raspored-stolova',
  templateUrl: './raspored-stolova.component.html',
  styleUrls: ['./raspored-stolova.component.css']
})


export class RasporedStolovaComponent implements OnInit,AfterViewInit {

  constructor(public dialog:MatDialog,private korisnikServis:KorisnikService) { }

  @ViewChildren('canvas',{read: ElementRef}) canvasElementRefs : QueryList<ElementRef>




  private ctx: CanvasRenderingContext2D;

  objekti:Array<Objekat>;
  id:number;
  message:string;
  idp:string;
  nazivO:string;



  korisnik:Korisnik;


  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen') );
    this.idp = this.korisnik.pib;

    this.objekti= new Array<Objekat>;
    this.id=0;
    var i=0;
    this.korisnik.kase.forEach(elem=>{



      this.objekti.push({naziv:elem.lokacija,odeljenja:new Array<Odeljenje>,id:this.idp})
      this.dohvatiOdeljenja(this.objekti[i])
      i=i+1;



    })

    
  }

  ngAfterViewInit(){
    

    }


  dohvatiOdeljenja(obj:Objekat){
      console.log(obj);
      this.korisnikServis.dohvatiRaspored(obj.naziv,obj.id).subscribe((res:Odeljenje[])=>{
        console.log(1);
        if(res){
          res.forEach(elem=>{
            obj.odeljenja.push(elem);
   
            this.id=this.id+1;
          })
        }
        else{
          this.message="Неуспешно дохватање одељења";

    }
  })
}


    
    
  


    

  
  openDialog(odeljenje:Odeljenje,objekat:Objekat): void {
      const dialogRef =this.dialog.open(DodajStoComponent, {
        data: {
          
        },
      });
      dialogRef.afterClosed().subscribe((result:Sto)  => {
        if(result){
          odeljenje.stolovi.push(result);
      
          

        }

    
      });
    }

  dodajSto(odeljenje:Odeljenje,objekat:Objekat){
    this.openDialog(odeljenje,objekat);
  }

  dodajOdeljenje(objekat:Objekat){
    var o= new Odeljenje();
    o.nazivO=objekat.naziv;
    o.pib=objekat.id;
    o.id=this.id;
    o.naziv=this.nazivO;
    o.stolovi= new Array<Sto>;
    objekat.odeljenja.push(o);
    this.id=this.id+1;
    console.log(this.id);
  }

  dragEnd($event:CdkDragEnd,sto:Sto,odeljenje:Odeljenje){
    console.log($event.source.getFreeDragPosition())
    sto.pozicija.x=$event.source.getFreeDragPosition().x
    sto.pozicija.y=$event.source.getFreeDragPosition().y
    console.log(sto.pozicija.x,sto.pozicija.y)
    sto.v=true;
    odeljenje.stolovi.forEach(elem=>{
      if(elem!==sto){
      if((Math.abs(elem.pozicija.x-sto.pozicija.x)<30)&&(Math.abs(elem.pozicija.y-sto.pozicija.y)<30)) sto.v=false;
      
      }

    })


  }

  sacuvaj(odeljenje:Odeljenje){
    this.message=''
    for (let index = 0; index < odeljenje.stolovi.length; index++) {
      if(odeljenje.stolovi[index].v==false){
      this.message="Столови се поклапају";
      break;
      }
    }
    if(this.message==''){
      this.korisnikServis.sacuvajRaspored(odeljenje).subscribe((respObj)=>{
        if(respObj){
          this.message="Распоред одељења сачуван";
        }
      });
      
    }


  }



}
