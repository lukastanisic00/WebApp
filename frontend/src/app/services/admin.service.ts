import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  prijavaNaSistem(kor_ime, lozinka){
    const data={
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/AdminPrijavaNaSistem`, data);
  }

  promeniLozinku( kor_ime, lozinka, novaLozinka){
    const data={
      kor_ime: kor_ime,
      lozinka: lozinka,
      nova: novaLozinka
    }
    return this.http.post(`${this.uri}/AdminPromenaLozinke`, data);
  }

  dohvatiPreduzeca(){
    const data={

    }
    return this.http.post(`${this.uri}/dohvatiPreduzeca`, data);
  }

  aktivirajPreduzece(id){
    const data={
      id:id


    }
    return this.http.post(`${this.uri}/aktivirajPreduzece`, data);
  }

  deaktivirajPreduzece(id:String){
    const data={
      id:id


    }
    return this.http.post(`${this.uri}/deaktivirajPreduzece`, data);
  }

  pregledajIzvestaj(id:String){
    const data={
      id:id


    }
    return this.http.post(`${this.uri}/pregledajIzvestaj`, data);
  }

  registruj(kor_ime,lozinka,ime,prezime,broj,mejl,naziv,tip,adresa,matBroj,pib,grb){
   
 

  

    const data = {
      kor_ime:kor_ime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      broj:broj,
      mejl:mejl,
      naziv:naziv,
      tip:tip,
      adresa:adresa,
      pib:pib,
      matBroj:matBroj,
      grb:grb
    }
    
    

    return this.http.post(`${this.uri}/adminRegistracija`, data)
  }

  registrujKupca(kor_ime,lozinka,ime,prezime,broj,lk){
   
 

  

    const data = {
      kor_ime:kor_ime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      broj:broj,
      lk:lk
    }
    
    

    return this.http.post(`${this.uri}/adminRegistracijaKupca`, data)
  }

  dohvatiIzvestaj(dp,mp,yp,dk,mk,yk){
    const data={
      dp:dp,
      mp:mp,
      yp:yp,
      dk:dk,
      mk:mk,
      yk:yk

    }
    return this.http.post(`${this.uri}/dohvatiIzvestaj`, data);
  

  }

}
