import { Component, OnInit } from '@angular/core';
import { ConnectionClosedEvent } from 'mongodb';
import { Artikal } from '../model/artikal.model';
import { Korisnik } from '../model/korisnik.model';
import { Narudzbina } from '../model/narudzbina';
import { Objekti } from '../model/objekti.model';
import { Stavka } from '../model/stavka';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-izdavanje-racuna',
  templateUrl: './izdavanje-racuna.component.html',
  styleUrls: ['./izdavanje-racuna.component.css']
})
export class IzdavanjeRacunaComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService) { }


  sviArtikli:Artikal[];
  izabraniObjekat:String;
  korisnik:Korisnik;
  sviArtikliUponudi:Stavka[];
  poruka:String;
  izabraneStavke:Stavka[];
  kolicina:number;
  nacinPlacanja:number;
  ime:string;
  prezime:string;
  brLk:string;
  slip:number;
  Narucilac:String;
  ukupanIznos:number;
  confirm:string;
  povracaj:number;
  gotovina:number;
  sviNarucioci:Array<String>;
  ukupanPorez:number;
 




  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen') );
    this.sviArtikliUponudi= new Array<Stavka>;
    this.izabraneStavke= new Array<Stavka>;
    this.dohvatiArtikle();
    this.dohvatiNarudzbine();
  }


  potvrdiRacun(){
    this.ukupanIznos=0;
    this.ukupanPorez=0;
    this.izabraneStavke.forEach(elem=>{
      this.ukupanIznos=this.ukupanIznos+elem.cena;
      this.ukupanPorez=this.ukupanPorez+elem.porez;

    })
    var placanje='';
    if(this.nacinPlacanja==0) placanje="gotovina";
    if(this.nacinPlacanja==0) placanje="cek";
    if(this.nacinPlacanja==0) placanje="kartica";
    if(this.nacinPlacanja==0) placanje="virman";

    this.korisnikServis.unesiRacun(this.korisnik.pib,this.ime,this.prezime,this.brLk,this.ukupanIznos,
      this.ukupanPorez,placanje,this.izabraniObjekat,
      this.izabraneStavke,this.Narucilac,this.korisnik.naziv).subscribe((respObj)=>{
      if(respObj){
        this.confirm="Рачун успешно унет";
      }
      else{
        this.poruka="Дошло је до грешке"
      }
    });

   }
   unesiPodatke(){
    this.povracaj=-this.ukupanIznos+this.gotovina;
    this.slip=Math.random()*10000000;

   }
   handleChange=(e)=>{
    this.izabraniObjekat=e;
    console.log(e);
   }



   

  





  izaberiStavku(stavka:Stavka){
    if(stavka.kolicina<this.kolicina)
    {

    }
    else{
      stavka.kolicina=stavka.kolicina-this.kolicina;
      var izabranaStavka= new Stavka();
      izabranaStavka.sifra=stavka.sifra;
      izabranaStavka.cena=stavka.cena*this.kolicina;
      izabranaStavka.naziv=stavka.naziv;
      izabranaStavka.kolicina=this.kolicina;
      this.izabraneStavke.push(izabranaStavka);

    }

    }



  

  izaberiObjekat(){
    console.log(this.izabraniObjekat);
    this.sviArtikli.forEach(elem=>{
      var stavka= new Stavka();
      var mag=elem.magacini_i_objekti.find(x=>x.naziv_magacina_objekta==this.izabraniObjekat)
      if(mag){
      if(mag.tekuce_stanje_lagera>0){
        stavka.sifra=elem.sifra_artikla;
        stavka.cena=mag.prodajna_cena_RSD;
        stavka.porez=stavka.cena*elem.stopa_poreza
        stavka.kolicina=mag.tekuce_stanje_lagera;
        stavka.naziv=elem.naziv_artikla;
        this.sviArtikliUponudi.push(stavka);
      }
    }
    })

  }


  dohvatiArtikle(){
    this.korisnikServis.dohvatiArtikle(this.korisnik.pib).subscribe((artikli: Artikal[])=>{
      if(!artikli){
        this.poruka="Грешка при приказивању артикала";
      
      }
      else{
        this.sviArtikli=artikli;
          }
      }
    )
}

dohvatiNarudzbine(){
  this.korisnikServis.dohvatiNarudzbine(this.korisnik.pib).subscribe((narucioci: Array<String>)=>{
    if(!narucioci){
      this.poruka="Грешка при приказивању артикала";
    
    }
    else{
      this.sviNarucioci=narucioci;
        }
    }
  )
}


}
