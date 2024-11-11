import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  dohvatiSveProizvodeKojihImaNaStanju(){
    return this.http.get(`${this.uri}/dohvatiSveProizvodeKojihImaNaStanju`);
  }

  kupiProizvod(nazivProizvoda, kor_ime){
    const data={
      nazivProizvoda: nazivProizvoda,
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/kupiProizvod`, data);
  }

  komentarisiProizvod(nazivProizvoda, komentar){
    const data={
      nazivProizvoda: nazivProizvoda,
      komentar: komentar
    }
    return this.http.post(`${this.uri}/komentarisiProizvod`, data);
  }

  dohvatiSveProizvode(){
    return this.http.get(`${this.uri}/dohvatiSveProizvode`);
  }

  dodajProizvod(nazivProizvoda){
    const data={
      nazivProizvoda: nazivProizvoda
    }
    return this.http.post(`${this.uri}/dodajProizvod`, data);
  }

  ukloniProizvod(nazivProizvoda){
    const data={
      nazivProizvoda: nazivProizvoda
    }
    return this.http.post(`${this.uri}/ukloniProizvod`, data);
  }
}
