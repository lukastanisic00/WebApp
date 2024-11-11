import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Racun } from '../model/racun';
import { Stavka } from '../model/stavka';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.css']
})
export class IzvestajComponent implements OnInit {

  constructor(private ruter:Router,private servis:KorisnikService) { }

  stavkeNaRacunu:Stavka[];
  racuni:Racun[];
  godina:number;
  mesec:number;
  dan:number;
  message:string;
  iznos:number;
  porez:number;
  izabranRacun:Racun;

  ngOnInit(): void {
    this.iznos=0;
    this.porez=0;
    this.dan=new Date().getDate();
    this.mesec=new Date().getMonth();
    this.godina=new Date().getFullYear();
    this.servis.dohvatiDanasnjeRacune(this.dan,this.mesec,this.godina).subscribe((r:Racun[])=>{
      if(r){
      this.racuni=r;
      this.racuni.forEach(e=>{
        this.iznos=this.iznos+e.iznos;
        this.porez=this.porez+e.pdv;

      })


      }
      else{
        this.message="Нема рачуна за приказ";
      }
    })
  }


  handleChange=(e)=>{
    this.stavkeNaRacunu=e;
   }
    
    
  

}
