import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-promena-lozinke',
  templateUrl: './admin-promena-lozinke.component.html',
  styleUrls: ['./admin-promena-lozinke.component.css']
})
export class AdminPromenaLozinkeComponent implements OnInit {

  
  constructor(private Servis:AdminService, private router: Router) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('prijavljenAdmin'))
  }

  poruka:string;
  staraLozinka: string;
  novaLozinka: string;
  ponovnaLozinka: string;
  admin:Admin;

  promeniLozinku(){

    if(this.novaLozinka == this.ponovnaLozinka) 
    {
    this.Servis.promeniLozinku(this.admin.kor_ime,this.staraLozinka,this.novaLozinka).subscribe(korisnik=>{
      if(korisnik){
        localStorage.clear;
        this.router.navigate(['prijavaAdmin'])
            
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
