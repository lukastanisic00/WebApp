import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Artikal } from '../model/artikal.model';
import { Korisnik } from '../model/korisnik.model';
import { Odeljenje } from '../model/odeljenje';
import { Stavka } from '../model/stavka';
import { Sto } from '../model/sto';
import { Objekat } from '../raspored-stolova/raspored-stolova.component';
import { KorisnikService } from '../services/korisnik.service';


type RacunForma={
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

  message:String;
 
}






@Component({
  selector: 'app-izdavanje-racuna-u',
  templateUrl: './izdavanje-racuna-u.component.html',
  styleUrls: ['./izdavanje-racuna-u.component.css']
})
export class IzdavanjeRacunaUComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService) { }


  sviArtikli:Artikal[];
  izabraniObjekat:String;
  korisnik:Korisnik;
  sviArtikliUponudi:Stavka[];
  poruka:String;


 
 
 


 
  
  
  
  
  sviNarucioci:Array<String>;
 
  odeljenja:Odeljenje[];
  message:String;

  racuni:Array<RacunForma>;
 




  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen') );
    this.sviArtikliUponudi= new Array<Stavka>;
    this.odeljenja= new Array<Odeljenje>;
  

    this.dohvatiArtikle();
    this.dohvatiNarudzbine();
  }


  potvrdiRacun(sto:Sto,odeljenje:Odeljenje){
    var index=this.indeks(odeljenje,sto)
    this.racuni[index].ukupanIznos=0;
    this.racuni[index].ukupanPorez=0;
    this.racuni[index].izabraneStavke.forEach(elem=>{
      this.racuni[index].ukupanIznos=this.racuni[index].ukupanIznos+elem.cena;
      this.racuni[index].ukupanPorez=this.racuni[index].ukupanPorez+elem.porez;

    })
    var placanje='';
    if(this.racuni[index].nacinPlacanja==0) placanje="gotovina";
    if(this.racuni[index].nacinPlacanja==0) placanje="cek";
    if(this.racuni[index].nacinPlacanja==0) placanje="kartica";
    if(this.racuni[index].nacinPlacanja==0) placanje="virman";

    this.korisnikServis.unesiRacun(this.korisnik.pib,this.racuni[index].ime,this.racuni[index].prezime,this.racuni[index].brLk,this.racuni[index].ukupanIznos,
      this.racuni[index].ukupanPorez,placanje,this.izabraniObjekat,
      this.racuni[index].izabraneStavke,this.racuni[index].Narucilac,this.korisnik.naziv).subscribe((respObj)=>{
      if(respObj){
        this.racuni[index].confirm="Рачун успешно унет";
        sto.status="O";
        this.sacuvaj(odeljenje);
      }
      else{
        this.racuni[index].poruka="Дошло је до грешке"
      }
    });

   }
   unesiPodatke(s:Sto,o:Odeljenje){
    var index=this.indeks(o,s);
    this.racuni[index].povracaj=-this.racuni[index].ukupanIznos+this.racuni[index].gotovina;
    this.racuni[index].slip=Math.random()*10000000;

   }
   handleChange=(e)=>{
    this.izabraniObjekat=e;
    this.dohvatiOdeljenja();
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

  dohvatiOdeljenja(){
    this.korisnikServis.dohvatiRaspored(this.izabraniObjekat,this.korisnik.pib).subscribe((res:Odeljenje[])=>{
      console.log(1);
      if(res){
        res.forEach(elem=>{
          this.odeljenja.push(elem);
 
          
        })
        var n =0;
    this.odeljenja.forEach(elem=>{
      n=n+elem.stolovi.length;

    })
    while(this.racuni.length>0) this.racuni.pop();
    for (let index = 0; index < n; index++) {
      this.racuni.push({poruka:'',
        izabraneStavke:new Array<Stavka>,
        kolicina:0,
        nacinPlacanja:0,
        ime:'',
        prezime:'',
        brLk:'',
        slip:0,
        Narucilac:'',
        ukupanIznos:0,
        confirm:'',
        povracaj:0,
        gotovina:0,
        sviNarucioci:new Array<String>,
        ukupanPorez:0,
      
        message:''

      })
      
    }
      

  
      }
      else{
        this.message="Неуспешно дохватање одељења";

  }
})
}


indeks(o:Odeljenje,s:Sto):number{
var n=0;
for (let index = 0; index < this.odeljenja.indexOf(o); index++) {
  n=n+this.odeljenja[index].stolovi.length;
  
  
}
n=n+o.stolovi.indexOf(s);
return n;



}

   



   

  





  izaberiStavku(stavka:Stavka,sto:Sto,odeljenje:Odeljenje){
    var index=this.indeks(odeljenje,sto);
    if(stavka.kolicina<this.racuni[index].kolicina)
    {

    }
    else{
      stavka.kolicina=stavka.kolicina-this.racuni[index].kolicina;
      var izabranaStavka= new Stavka();
      izabranaStavka.sifra=stavka.sifra;
      izabranaStavka.cena=stavka.cena*this.racuni[index].kolicina;
      izabranaStavka.naziv=stavka.naziv;
      izabranaStavka.kolicina=this.racuni[index].kolicina;
      this.racuni[index].izabraneStavke.push(izabranaStavka);
      sto.status='X';
      this.sacuvaj(odeljenje);

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
