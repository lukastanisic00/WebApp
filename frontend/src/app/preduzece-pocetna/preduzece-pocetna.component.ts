import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';
;

@Component({
  selector: 'app-preduzece-pocetna',
  templateUrl: './preduzece-pocetna.component.html',
  styleUrls: ['./preduzece-pocetna.component.css']
})
export class PreduzecePocetnaComponent implements OnInit {

  constructor(private router:Router) { }

  korisnik:Korisnik;

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen') )
    console.log(this.korisnik)
  
  }

  message:String;
  
  
  Info() {
    this.router.navigate(['preduzece/info'])
  }
  Narucioci() {
    this.router.navigate(['preduzece/narucioci'])
  }
  RobeIUsluge() {
    this.router.navigate(['preduzece/robe_i_usluge0'])
  }
  RasporedArtikala() {
    this.router.navigate(['preduzece/rasporedArtikala'])
  }
  RasporedStolova() {
    this.router.navigate(['preduzece/rasporedStolova'])
  }
  IzdavanjeRacuna() {
    if (this.korisnik.tip=='P')
    this.router.navigate(['preduzece/izdavanje_racuna'])
    else this.router.navigate(['preduzece/izdavanje_racunaU'])
  }
  Izvestaj(){
    this.router.navigate(['preduzece/izvestaj'])
  }

  IzlogujSe(){
    localStorage.clear;
    this.router.navigate([''])
  }


}
