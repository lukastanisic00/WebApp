import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { Izvestaj } from '../model/izvestaj';
import { Korisnik } from '../model/korisnik.model';
import { Proizvod } from '../model/proizvod.model';
import { PromenaLozinkeComponent } from '../promena-lozinke/promena-lozinke.component';
import { AdminService } from '../services/admin.service';
import { ProizvodService } from '../services/proizvod.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis: AdminService, private ruter: Router) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('prijavljenAdmin'));
    this.zahtevi= new Array<Korisnik>;
    this.ostalaPreduzeca= new Array<Korisnik>;
    this.dohvatiPreduzeca();
    

   


    
    }
  

  admin: Admin;
  preduzeca: Korisnik[]
  poruka1: string;
  poruka2:string;
  datumPocetni:Date;
  datumKrajnji:Date;
  izvestajForma:boolean;
  zahtevi:Korisnik[];
  ostalaPreduzeca:Korisnik[];
  izvestaji:Izvestaj[];
  izvestajiZaPrikaz:Izvestaj[];
  prikaz:boolean;



  dohvatiPreduzeca(){
    this.izvestaji= new Array<Izvestaj>;
    this.prikaz=false;
    this.izvestajiZaPrikaz=new Array<Izvestaj>;
    this.servis.dohvatiPreduzeca().subscribe((korisnici:Korisnik[])=>{
      if(korisnici){
      this.preduzeca= korisnici;
      this.preduzeca.forEach(elem=>{
        if((elem.postavljen==false)&&(elem.status=="neaktivan"))
        this.zahtevi.push(elem);
        else{
          this.ostalaPreduzeca.push(elem);
        }
      })
      }
      else{
        this.poruka1="Неуспешно дохватање предузећа";
      }

    })
  }

  aktiviraj(korisnik:Korisnik){
    this.servis.aktivirajPreduzece(korisnik.pib).subscribe((resp)=>{
      if(resp){
      this.poruka1="Корисник успешно активиран";
      window.location.reload() 
      }
      else{
        this.poruka1="Неуспешна активација";
      }

    })

  }

  deaktiviraj(korisnik:Korisnik){
    this.servis.deaktivirajPreduzece(korisnik.pib).subscribe((resp)=>{
      if(resp){
      this.poruka1="Корисник успешно деактивиран";
      window.location.reload() 
      }
      else{
        this.poruka1="Неуспешна деактивација";
      }

    })

  }

  promenaLozinke(){
    this.ruter.navigate(['admin/promenaLozinke'])
    
  }  

  dodajKupca(){
    this.ruter.navigate(['admin/registrujKupca'])

  }

  dodajPreduzece(){
    this.ruter.navigate(['admin/registrujPreduzece'])

  }


  izvestaj(pib){
    if ((this.datumPocetni)||(this.datumKrajnji)){
      this.poruka2='';
    this.servis.dohvatiIzvestaj(this.datumPocetni.getDate, this.datumPocetni.getMonth, this.datumPocetni.getFullYear, this.datumKrajnji.getDate,
      this.datumKrajnji.getMonth, this.datumKrajnji.getDate).subscribe((i: Izvestaj[]) => {
        if (i) {
          this.izvestaji = i;
          while (this.izvestajiZaPrikaz.length > 0) this.izvestajiZaPrikaz.pop();
          this.izvestaji.forEach(element => {
            if (element.pib == pib) this.izvestajiZaPrikaz.push(element);
          });
          this.prikaz = true;
        }
      })


    }
    else{
      this.poruka2="Унесите датуме.";
    }



  }

  sakrij(){
    this.prikaz=false;
  }






  sakrijIzvestaj(){
    this.prikaz=false;
  }

  izlogujSe(){
    localStorage.clear;
    this.ruter.navigate(['adminPrijava']);
  }


  dohvatiIzvestaj(){
    this.servis.dohvatiIzvestaj(this.datumPocetni.getDate,this.datumPocetni.getMonth,this.datumPocetni.getFullYear,this.datumKrajnji.getDate,
      this.datumKrajnji.getMonth,this.datumKrajnji.getDate).subscribe((i:Izvestaj[])=>{
        if(i){
          this.izvestaji=i;
        }
      })

  }

  

}
