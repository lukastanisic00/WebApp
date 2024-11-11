import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik.model';
import { Proizvod } from '../model/proizvod.model';
import { ProizvodService } from '../services/proizvod.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  constructor(private servisProizvod: ProizvodService, private router: Router, private servisKorisnik: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen'))
  
    this.servisProizvod.dohvatiSveProizvodeKojihImaNaStanju().subscribe((proizvodi: Proizvod[])=>{
      this.proizvodi = proizvodi;
    });
    
  }

  proizvodi: Proizvod[];
  poruka: string;
  korisnik: Korisnik;

  kupiProizvode(){
    this.proizvodi.forEach((proizvod)=>{
      if(proizvod.zaKupovinu){
        this.servisProizvod.kupiProizvod(proizvod.naziv, this.korisnik.kor_ime).subscribe((odg)=>{
          if(odg['poruka']==-1){
            this.poruka = 'Desila se greska';
          }
          else{
            this.servisKorisnik.dohvatiKorisnikaPoKorisnickomImenu(this.korisnik.kor_ime).subscribe((korisnik: Korisnik)=>{
              this.korisnik = korisnik;
            })
          }
        })
      }
    })
  }
  promenaLozinke(){
    this.router.navigate(['korisnik/promenaLozinke'])
  }

  kupljenProizvod: string;
  komentar: string;

  komentarisi(){
    this.servisProizvod.komentarisiProizvod(this.kupljenProizvod, this.komentar).subscribe((odg)=>{
      if(odg['poruka']==-1){
        this.poruka = 'Desila se greska';
      }
    })
  }

}
