import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'mongodb';
import { Korisnik } from '../model/korisnik.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-prijava',
  templateUrl: './admin-prijava.component.html',
  styleUrls: ['./admin-prijava.component.css']
})
export class AdminPrijavaComponent implements OnInit {
  constructor(private servisKorisnik: AdminService, private ruter: Router) { }

  ngOnInit(): void {
  }

  kor_ime: string;
  lozinka: string;
  poruka: string;

  prijavaNaSistem(){
    this.servisKorisnik.prijavaNaSistem(this.kor_ime, this.lozinka).subscribe((admin: Admin)=>{
      if(!admin){
        this.poruka = 'Pogrešno korisničko ime ili lozinka';
      }
      else{
        localStorage.setItem('prijavljenAdmin', JSON.stringify(admin));
          this.ruter.navigate(['admin']);
        
        }
      
    })
  }

}
