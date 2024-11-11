import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Racun } from '../model/racun';
import { Artikal } from '../model/artikal.model';
import { kategorija } from '../raspored-artikala/raspored-artikala.component';
import { ReadVarExpr } from '@angular/compiler';
import { Objekat } from '../raspored-stolova/raspored-stolova.component';
import { Stavka } from '../model/stavka';
import { Odeljenje } from '../model/odeljenje';


@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  prijavaNaSistem(kor_ime, lozinka){
    const data={
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/prijavaNaSistem`, data);
  }

  prijavaNaSistemKupca(kor_ime, lozinka){
    const data={
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/prijavaNaSistemKupca`, data);
  }


  promeniLozinku( kor_ime, lozinka, novaLozinka){
    const data={
      kor_ime: kor_ime,
      lozinka: lozinka,
      nova: novaLozinka
    }
    return this.http.post(`${this.uri}/promenaLozinke`, data);
  }

  dohvatiKorisnikaPoKorisnickomImenu(kor_ime){
    const data={
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/dohvatiKorisnikaPoKorisnickomImenu`, data);
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
    
    

    return this.http.post(`${this.uri}/zahtevi`, data)
  }

  izmeni(staro_kor_ime,kor_ime,lozinka,ime,prezime,broj,mejl,naziv,tip,adresa,matBroj,pib,grb){
    const data = {
      staro_kor_ime:staro_kor_ime,
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

    return this.http.post(`${this.uri}/izmena`, data)
  }

  dohvatiRacune(){
    return this.http.get(`${this.uri}/dohvatiRacune`);
  }

  dohvatiArtikle(pib){
    const data={
      pib:pib

    }
    return this.http.post(`${this.uri}/dohvatiArtikle`,data);
  }

  dopuni(kor_ime,tip,delatnosti,uSistemu,ziroRacuni,magacini,kase){
    const data = {
      kor_ime:kor_ime,
      tip:tip,
      delatnosti:delatnosti,
      uSistemu:uSistemu,
      ziroRacuni:ziroRacuni,
      magacini:magacini,
      kase:kase
    }
    return this.http.post(`${this.uri}/dopuna`, data)
  }

  dohvatiSifarnik(){
    return this.http.get(`${this.uri}/dohvatiSifarnik`);
  }

  pretrazi(searchParam){
    return this.http.get(`${this.uri}/pretraziPreduzeca?param=${searchParam}`)
  }

  dodajNarucioca(narucilacPIB,narucilac,naziv,pib,brDana,procenatRabata ) {
    const data = {
      narucilacPIB:narucilacPIB,
      narucilac:narucilac,
      naziv:naziv,
      pib:pib,
      brDana:brDana,
      procenatRabata:procenatRabata
  }
      
    return this.http.post(`${this.uri}/dodajNarudzbinu`, data)
  }

  ukloniArtikal(sifra ) {
    const data = {
      sifra:sifra
  }
      
    return this.http.post(`${this.uri}/ukloniArtikal`, data)
  }

  izmeniArtikal(sifra,artikal:Artikal ) {
    const data = {
      sifra: sifra,
      sifra_artikla: artikal.sifra_artikla,
      naziv_artikla: artikal.naziv_artikla,
      jedinica_mere: artikal.jedinica_mere,
      stopa_poreza: artikal.stopa_poreza,
      proizvodjac: artikal.proizvodjac,
      tip: artikal.tip,
      zemlja_porekla: artikal.zemlja_porekla,
      strani_naziv_artikla: artikal.strani_naziv_artikla,
      barkod: artikal.barkod,
      carinska_tarifa: artikal.carinska_tarifa,
      eko_taksa: artikal.eko_taksa,
      akcize: artikal.akcize,
      min_zeljene_zalihe: artikal.min_zeljene_zalihe,
      maks_zeljene_zalihe: artikal.maks_zeljene_zalihe,
      opis: artikal.opis,
      deklaracija: artikal.deklaracija,
      magacini_i_objekti: artikal.magacini_i_objekti,
      pib:artikal.pib
    
      

  }
      
    return this.http.post(`${this.uri}/izmeniArtikal`, data)
  }

  unesiArtikal(artikal:Artikal ) {
    const data = {
      sifra_artikla: artikal.sifra_artikla,
      naziv_artikla: artikal.naziv_artikla,
      jedinica_mere: artikal.jedinica_mere,
      stopa_poreza: artikal.stopa_poreza,
      proizvodjac: artikal.proizvodjac,
      tip: artikal.tip,
      zemlja_porekla: artikal.zemlja_porekla,
      strani_naziv_artikla: artikal.strani_naziv_artikla,
      barkod: artikal.barkod,
      carinska_tarifa: artikal.carinska_tarifa,
      eko_taksa: artikal.eko_taksa,
      akcize: artikal.akcize,
      min_zeljene_zalihe: artikal.min_zeljene_zalihe,
      maks_zeljene_zalihe: artikal.maks_zeljene_zalihe,
      opis: artikal.opis,
      deklaracija: artikal.deklaracija,
      magacini_i_objekti: artikal.magacini_i_objekti,
      pib:artikal.pib
      
  }
      
    return this.http.post(`${this.uri}/unesiArtikal`, data)
  }

  sacuvajKategorizaciju(kategorije:kategorija[]){
    const data = {
      kategorije:kategorije

    }

    return this.http.post(`${this.uri}/sacuvajKategorizaciju`, data)
  }

  dohvatiRaspored(naziv,id){
      const data = {
        id:id,
        naziv:naziv
        
  
      }
  
      return this.http.post(`${this.uri}/dohvatiRaspored`, data)
  
    }


  sacuvajRaspored(odeljenje:Odeljenje){
      const data = {
        id:odeljenje.id,
        naziv:odeljenje.naziv,
        stolovi:odeljenje.stolovi,
        pib:odeljenje.pib,
        nazivO:odeljenje.nazivO
  
      }
  
      return this.http.post(`${this.uri}/sacuvajRaspored`, data)
    }
  
    dohvatiKategorizaciju(id){
        const data = {
          id:id
    
        }
    
        return this.http.post(`${this.uri}/dohvatiKategorizaciju`, data)
    
      }

 
      unesiRacun(pib,ime,prezime,brLk,ukupanIznos,ukupanPorez,placanje,nazivObjekta,stavke:Stavka[],narucilac,nazivPreduzeca){
        const data = {
          pib:pib,
          ime:ime,
          prezime:prezime,
          brLk:brLk,
          ukupanIznos:ukupanIznos,
          ukupanPorez:ukupanPorez,
          placanje:placanje,
          nazivO:nazivObjekta,
          stavke:stavke,
          narucilac:narucilac,
          nazivP:nazivPreduzeca
    
        }
    
        return this.http.post(`${this.uri}/unesiRacun`, data)
    
      }
  
      dohvatiNarudzbine(id){
        const data = {
          id:id
    
        }
    
        return this.http.post(`${this.uri}/dohvatiNarucioce`, data)
    
      }

      dohvatiPreduzeca(){
        const data={
    
        }
        return this.http.post(`${this.uri}/dohvatiPreduzeca`, data);
      }

      pretraziArtikle(searchParam){
        return this.http.get(`${this.uri}/artikli/pretraga?param=${searchParam}`)
      }

      dohvatiRacuneKupca(id){
        const data={
          id:id
    
        }
        return this.http.post(`${this.uri}/dohvatiRacuneKupca`, data);
      

      }

      dohvatiDanasnjeRacune(d,m,y){
        const data={
          d:d,
          m:m,
          y:y
    
        }
        return this.http.post(`${this.uri}/dohvatiDanasnjeRacune`, data);
      

      }

      


      

  

  



}
