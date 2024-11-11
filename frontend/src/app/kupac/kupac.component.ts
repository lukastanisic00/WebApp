import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from '../model/artikal.model';
import { Korisnik } from '../model/korisnik.model';
import { Kupac } from '../model/kupac.model';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  constructor(private ruter:Router,private servis:KorisnikService) { }

  kupac:Kupac;
  preduzeca:Array<Korisnik>;
  artikliZaPrikaz:Artikal[];
  greska1:String;
  izabranoPreduzece:String;
  searchParam:string;
  pretrazeniArtikli:Artikal[];
  greska2:string;
  prikaz:Array<{
    naziv:string,
    sifra:string,
    minCena:number,
    proizvodjac:String
    objekti:String
  }>

  ngOnInit(): void {
    this.kupac = JSON.parse(localStorage.getItem('prijavljenKupac') );
    this.artikliZaPrikaz= new Array<Artikal>;
    this.prikaz=new Array<{
      naziv:string,
      sifra:string,
      minCena:number,
      proizvodjac:String
      objekti:String
    }>;
    this.dohvatiPreduzeca();
  }


  dohvatiPreduzeca(){
    this.servis.dohvatiPreduzeca().subscribe((p:Korisnik[])=>{
      if(p){
        this.preduzeca=p;
        
      }
      else 
      this.greska1="Нема артикала за приказивање";

    })}

  handleChange=(e)=>{
      this.izabranoPreduzece=e;
      console.log(e);
  }



  dohvatiArtikle(){
    console.log(this.izabranoPreduzece)
    this.servis.dohvatiArtikle(this.izabranoPreduzece).subscribe((a:Array<Artikal>)=>{
      if(a){
        this.artikliZaPrikaz=a;
        this.promeniPrikaz(this.artikliZaPrikaz);
        
        
      }
      else 
      this.greska1="Нема артикала за приказивање";


  }
    )
}

promeniPrikaz(a:Artikal[]){
  while(this.prikaz.length>0) this.prikaz.pop();
  a.forEach(elem=>{
    var min=Number.MAX_SAFE_INTEGER;
    var dostupno1='';
        elem.magacini_i_objekti.forEach(e=>{
          if(e.tekuce_stanje_lagera>0) {dostupno1=dostupno1+', ' +e.naziv_magacina_objekta;
          if(e.prodajna_cena_RSD<min) min=e.prodajna_cena_RSD;}
        })
        if (min ==Number.MAX_SAFE_INTEGER) min=-1;
        this.prikaz.push({naziv:elem.naziv_artikla,sifra:elem.sifra_artikla,minCena:min,proizvodjac:elem.proizvodjac,objekti:dostupno1});
      })

}

pretraziArtikle(){

  this.servis.pretraziArtikle(this.searchParam).subscribe((a:Artikal[])=>{
    if(a){
      this.pretrazeniArtikli=a;
      this.promeniPrikaz(this.pretrazeniArtikli);
    }
    else{
      this.greska2="Нема резултата."
    }
  })
}

ponistiPretragu(){
  this.promeniPrikaz(this.artikliZaPrikaz);
}
  
  

}
