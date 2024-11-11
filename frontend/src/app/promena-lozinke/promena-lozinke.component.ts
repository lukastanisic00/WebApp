import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private Servis:KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen'))
  }

  poruka:string;
  staraLozinka: string;
  novaLozinka: string;
  ponovnaLozinka: string;
  korisnik:Korisnik;

  promeniLozinku(){

    if(this.novaLozinka == this.ponovnaLozinka) 
    {
    this.Servis.promeniLozinku(this.korisnik.kor_ime,this.staraLozinka,this.novaLozinka).subscribe(korisnik=>{
      if(korisnik){
        localStorage.clear;
        this.router.navigate([''])
            
      }
      else{
        this.poruka = "Погрешна лозинка";
      }

    });
  
  }
  else {
    this.poruka = "Лозинке се не поклапају"
  }

  }


}
