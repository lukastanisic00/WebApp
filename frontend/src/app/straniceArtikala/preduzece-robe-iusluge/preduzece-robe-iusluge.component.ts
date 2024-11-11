import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/model/korisnik.model';
import { Objekti } from 'src/app/model/objekti.model';
import { Artikal } from '../../model/artikal.model';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-preduzece-robe-iusluge',
  templateUrl: './preduzece-robe-iusluge.component.html',
  styleUrls: ['./preduzece-robe-iusluge.component.css']
})
export class PreduzeceRobeIUslugeComponent implements OnInit {

  
  stranica=1;
  brojArtikala:number;
  sledeca=this.stranica+1;
  prethodna=0;
  artikli:Artikal[];
  poruka:String;
  artikliZaPrikaz:Artikal[];
  regForm:FormGroup;
  forma:boolean;
  izabraniArtikal:Artikal;
  artikalZaUnos:Artikal;
  korisnik:Korisnik;
  porukaS:String;
  porukaN:string;
  porukaT:string;
  porukaJ:string;
  porukaSp:string;




  constructor(private router: Router, private KorisnikServis:KorisnikService,private fb:FormBuilder) { }

  currentPage=1;

  inicijalizujFormu(artikal:Artikal){
    
    this.regForm = new FormGroup({
    sifra_artikla: new FormControl(artikal.sifra_artikla,[Validators.required]),
    naziv_artikla:  new FormControl(artikal.naziv_artikla,[Validators.required]),
    jedinica_mere:  new FormControl(artikal.jedinica_mere,[Validators.required]),
    stopa_poreza: new FormControl(artikal.stopa_poreza,[Validators.required]),
    tip: new FormControl(artikal.tip,[Validators.required]),
    zemlja_porekla: new FormControl(artikal.zemlja_porekla,[]),
    strani_naziv_artikla: new FormControl(artikal.strani_naziv_artikla,[]),
    proizvodjac: new FormControl(artikal.proizvodjac,[]),
    carinska_tarifa: new FormControl(artikal.carinska_tarifa,[]),
    eko_taksa: new FormControl(artikal.eko_taksa,[]),
    akcize: new FormControl(artikal.akcize,[]),
    maks_zeljene_zalihe: new FormControl(artikal.maks_zeljene_zalihe,[]),
    min_zeljene_zalihe: new FormControl(artikal.min_zeljene_zalihe,[]),
    opis: new FormControl(artikal.opis,[]),
    deklaracija: new FormControl(artikal.deklaracija,[]),
    slika:new FormControl(artikal.slika,[]),
    magacini: this.fb.array([])



  });
  if(this.korisnik.tip=='U') this.regForm.get("tip").setValue('-');
  if(this.korisnik.uSistemu==false) this.regForm.get("stopa_poreza").setValue('0');
  while(this.magacini().length !==0) this.magacini().removeAt(0);
    this.korisnik.magacini.forEach(element => {
    this.magacini().push(this.fb.group({  
      naziv_magacina_objekta: new FormControl (element.naziv,[Validators.required]), 
      nabavna_cena_RSD: new FormControl (0,[Validators.required]), 
      prodajna_cena_RSD: new FormControl (0,[Validators.required]), 
      tekuce_stanje_lagera: new FormControl (0,[Validators.required]), 
      min_zeljene_zalihe: new FormControl (0,[Validators.required]), 
      maks_zeljene_zalihe: new FormControl (0,[Validators.required]),  


    })  )
  


      
  });
  this.korisnik.kase.forEach(element => {
    this.magacini().push(this.fb.group({  
      naziv_magacina_objekta: new FormControl (element.lokacija,[Validators.required]), 
      nabavna_cena_RSD: new FormControl (0,[Validators.required]), 
      prodajna_cena_RSD: new FormControl (0,[Validators.required]), 
      tekuce_stanje_lagera: new FormControl (0,[Validators.required]), 
      min_zeljene_zalihe: new FormControl (0,[Validators.required]), 
      maks_zeljene_zalihe: new FormControl (0,[Validators.required]),  


    })  )
  


      
  });
  
  
 

  }

  dodajMagacin(){
    this.magacini().push(this.fb.group({  
      naziv_magacina_objekta: new FormControl (0,[Validators.required]), 
      nabavna_cena_RSD: new FormControl (0,[Validators.required]), 
      prodajna_cena_RSD: new FormControl (0,[Validators.required]), 
      tekuce_stanje_lagera: new FormControl (0,[Validators.required]), 
      min_zeljene_zalihe: new FormControl (0,[Validators.required]), 
      maks_zeljene_zalihe: new FormControl (0,[Validators.required])    
    }))
  }

  ukloniMagacin(){
    if(this.magacini().length>0){
    this.magacini().removeAt(this.magacini.length-1);}
  }



  izaberi(artikal:Artikal){
    this.izabraniArtikal=artikal

    this.inicijalizujFormu(this.izabraniArtikal);
    this.forma= true;
    this.poruka="";
  }

  odustani(){
    this.forma=false;
    this.izabraniArtikal= null;
    this.poruka="";
  }

  proveraSifre(sifra:String,staraSifra:String):Boolean{
    if(staraSifra!==sifra){
    for (let index = 0; index < this.artikli.length; index++) {
      if(this.artikli[index].sifra_artikla==sifra){
      return false;
      }
    }
    }
    return true;


  }

 

  unesi(){
   
    this.forma=false;
    this.artikalZaUnos = new Artikal()
    this.artikalZaUnos.sifra_artikla= this.regForm.get('sifra_artikla').value,
    this.artikalZaUnos.naziv_artikla=this.regForm.get('naziv_artikla').value,
    this.artikalZaUnos.jedinica_mere=this.regForm.get('jedinica_mere').value,
    this.artikalZaUnos.stopa_poreza=this.regForm.get('stopa_poreza').value,
    this.artikalZaUnos.tip=this.regForm.get('tip').value,
    this.artikalZaUnos.zemlja_porekla=this.regForm.get('zemlja_porekla').value,
    this.artikalZaUnos.strani_naziv_artikla=this.regForm.get('strani_naziv_artikla').value,
    this.artikalZaUnos.proizvodjac=this.regForm.get('proizvodjac').value,
    this.artikalZaUnos.carinska_tarifa=this.regForm.get('carinska_tarifa').value,
    this.artikalZaUnos.eko_taksa=this.regForm.get('eko_taksa').value,
    this.artikalZaUnos.akcize=this.regForm.get('akcize').value,
    this.artikalZaUnos.maks_zeljene_zalihe=this.regForm.get('maks_zeljene_zalihe').value,
    this.artikalZaUnos.min_zeljene_zalihe=this.regForm.get('min_zeljene_zalihe').value,
    this.artikalZaUnos.opis=this.regForm.get('opis').value,
    this.artikalZaUnos.deklaracija=this.regForm.get('deklaracija').value,
    this.artikalZaUnos.slika=this.regForm.get('slika').value,
    this.artikalZaUnos.magacini_i_objekti=this.regForm.get('magacini').value;
    this.artikalZaUnos.pib=this.korisnik.pib;
    if(this.regForm.valid){
    if(this.izabraniArtikal){
      if (this.proveraSifre(this.artikalZaUnos.sifra_artikla,this.izabraniArtikal.sifra_artikla)){
    this.KorisnikServis.izmeniArtikal(this.izabraniArtikal.sifra_artikla,this.artikalZaUnos).subscribe(respObj=>{
      if(respObj){
        this.artikli.splice(this.artikli.indexOf(this.izabraniArtikal),1,this.artikalZaUnos);
        this.artikliZaPrikaz= this.artikli.slice(10*(this.currentPage-1),10*(this.currentPage));
        this.izabraniArtikal=null;
        this.poruka="Артикал измењен";
      }
      
    });}
    else{
    this.poruka="Шифре артикала се поклапају";
    }
  }
    else{
      if (this.proveraSifre(this.artikalZaUnos.sifra_artikla,"")){
      this.KorisnikServis.unesiArtikal(this.artikalZaUnos).subscribe(respObj=>{
        if(respObj){
          this.artikli.push(this.artikalZaUnos);
          this.artikliZaPrikaz= this.artikli.slice(10*(this.currentPage-1),10*(this.currentPage));
          this.poruka="Артикал унет";
      

        }})
      }
      else{
        this.poruka="Шифре артикала се поклапају";
      }
    }
    
  }
  else{
    this.poruka="Некоректан унос"
    if(this.regForm.get('sifra_artikla').valid) this.porukaS="Sifra";
    if(this.regForm.get('jedinica_mere').valid) this.porukaJ="jedinica";
    if(this.regForm.get('naziv_artikla').valid) this.porukaN="Naziv";
    if(this.regForm.get('stopa_poreza').valid) this.porukaSp="Stopa";
    if(this.regForm.get('tip').valid) this.porukaT="tip";
    if(this.regForm.get('magacini').valid) this.poruka="tip1";
  }

  
  }

  

  unos(){
    this.inicijalizujFormu(new Artikal());
    this.forma= true;
    this.poruka="";
  }

  ukloni(artikal:Artikal){
    this.KorisnikServis.ukloniArtikal(artikal.sifra_artikla).subscribe(respObj => {
    this.artikli.splice(this.artikli.indexOf(artikal,0),1);  
    if(this.artikli.length>this.stranica*10) 
    {
    this.artikliZaPrikaz= this.artikli.slice(10*(this.currentPage-1),10*(this.currentPage));
    }
    else{
      this.artikliZaPrikaz=this.artikli;
    }
      })
    window.location.reload()  

  }

  magacini() : FormArray {  
    return this.regForm.get("magacini") as FormArray  
  }  


  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen'))
    this.forma= false;
    this.dohvatiArtikle() //samo za inicijalnu stranicu da bi se ogranicili pristupi bazi
  
  }

  sledecaStranica(){
    if((this.artikli.length-10*this.stranica)>0)
    this.router.navigate(["preduzece/robe_i_usluge"+(this.sledeca-1)]);

  }
  prethodnaStranica(){
    if(this.stranica-1>0)
    this.router.navigate(["preduzece/robe_i_usluge"+this.prethodna]);

  }

  dohvatiArtikle():boolean{
    this.KorisnikServis.dohvatiArtikle(this.korisnik.pib).subscribe((artikli: Artikal[])=>{
      if(!artikli){
        this.poruka="Грешка при приказивању артикала";
        return false
      }
      else{
        this.artikli=artikli;
        this.brojArtikala=artikli.length;
        this.poruka=artikli.length.toString();
        this.brojArtikala=this.artikli.length;
    if(this.artikli.length>this.stranica*10) 
    {
    this.artikliZaPrikaz= this.artikli.slice(10*(this.currentPage-1),10*(this.currentPage));
    }
    else{
      this.artikliZaPrikaz=this.artikli;
    }
    this.inicijalizujFormu(new Artikal());
    this.izabraniArtikal=null;
        return true;

        }
      
    })
    return false;
  }

}
