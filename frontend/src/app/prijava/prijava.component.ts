import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik.model';
import { Racun } from '../model/racun';
import { Kupac } from '../model/kupac.model';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.servisKorisnik.dohvatiRacune().subscribe((racuni: Racun[])=>{
      this.racuni = racuni;
    });
  }

  kor_ime: string;
  lozinka: string;
  poruka: string;

  racuni: Racun[];

  prijavaNaSistem() {
    this.servisKorisnik.prijavaNaSistem(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik) => {
      if (!korisnik) {
        this.servisKorisnik.prijavaNaSistemKupca(this.kor_ime, this.lozinka).subscribe((kupac: Kupac) => {
          if (!kupac) {
            this.poruka = 'Pogrešno korisničko ime ili lozinka';
          }
          else {
            localStorage.setItem('prijavljenKupac', JSON.stringify(kupac));
            this.ruter.navigate(['kupac'])
          }
        })
      }
      else {
        localStorage.setItem('prijavljen', JSON.stringify(korisnik));
        if (korisnik.postavljen == false) this.ruter.navigate(['*'])
        else { this.ruter.navigate(['preduzece']); }

      }

    })
  }

}
