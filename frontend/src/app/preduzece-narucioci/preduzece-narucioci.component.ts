import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-preduzece-narucioci',
  templateUrl: './preduzece-narucioci.component.html',
  styleUrls: ['./preduzece-narucioci.component.css']
})
export class PreduzeceNaruciociComponent implements OnInit {

  constructor(private UserService: KorisnikService,private router: Router,private fb:FormBuilder) { }

  public regForm:FormGroup;
  

  ngOnInit(): void {
    this.korisnik= new Korisnik();
    this.initializeForm();
    this.brojDana =-1;
    this.procenatRabata = -1;
    this.korisnik1 = JSON.parse(localStorage.getItem('prijavljen'), )
    
    
  }

  initializeForm(){
    this.regForm = new FormGroup({
    kor_ime: new FormControl('',[Validators.required]),
    lozinka:  new FormControl('',[Validators.required,Validators.pattern('^[0-9]{6}-[0-9]$')]),
    lozinkaP:  new FormControl(this.lozinkaP,[Validators.required]),
    ime: new FormControl('',[Validators.required]),
    prezime: new FormControl('',[Validators.required]),
    broj: new FormControl(this.korisnik.tel,[Validators.required,]),
    mejl: new FormControl(this.korisnik.mejl,[Validators.required, Validators.email]),
    naziv: new FormControl(this.korisnik.naziv,[Validators.required]),
    tip: new FormControl(this.korisnik.tip,[Validators.required]),
    adresa: new FormControl(this.korisnik.sediste,[Validators.required]),
    pib: new FormControl(this.korisnik.pib,[Validators.required,Validators.pattern('^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$')]),
    matBroj: new FormControl(this.korisnik.matBroj,[Validators.required]),
    grb: new FormControl(this.korisnik.grb,[Validators.required])
  });


  

  }

  public korisnik1: Korisnik;
  public korisnik: Korisnik;
  
  
  lozinkaP: string;

 
    status: string;

  message: string;
 

  control = new FormControl('',Validators.required)

  izaberi(){
    if (this.procenatRabata<0 || this.brojDana<0 || !this.narucilac) this.message1="Попуните поља!" 
    else{
      this.message1="";
      this.UserService.dodajNarucioca(this.narucilac.pib,this.narucilac.naziv,this.korisnik1.naziv,this.korisnik1.pib,this.brojDana,this.procenatRabata).subscribe(respObj => {
        
          

      });
      this.message="Наручилац додат."
      this.narucilac= null;
    }
    

  }




  register(){
    if (this.procenatRabata<0 || this.brojDana<0) this.message1="Попуните поља!" 
    else{
    if (this.regForm.valid) {
      if (this.regForm.get("lozinka").value == this.regForm.get("lozinkaP").value) {
        this.message1="";
       this.UserService.registruj(/*this.korisnik.kor_ime, this.korisnik.lozinka, this.korisnik.ime,
          this.korisnik.prezime, this.korisnik.broj, this.korisnik.mejl, this.korisnik.naziv, this.korisnik.tip,
          this.korisnik.adresa, this.korisnik.matBroj, this.korisnik.pib, this.korisnik.grb*/
          this.regForm.get("kor_ime").value,this.regForm.get("lozinka").value,this.regForm.get("ime").value,
          this.regForm.get("prezime").value,this.regForm.get("broj").value,this.regForm.get("mejl").value,this.regForm.get("naziv").value,this.regForm.get("tip").value,
          this.regForm.get("adresa").value,this.regForm.get("matBroj").value,this.regForm.get("pib").value,this.regForm.get("grb").value       
          ).subscribe(respObj => {
            if (respObj['message'] == 'done') {
              this.UserService.dodajNarucioca(this.regForm.get("pib").value,this.regForm.get("naziv").value,this.korisnik1.naziv,this.korisnik1.pib,this.brojDana,this.procenatRabata).subscribe(respObj => {
                if (respObj['message'] == 'done') {
                  this.message="Наручилац додат."
                }
              });
              this.message="Наручилац додат."
            }
            if (respObj['message'] == 'usernameError') {
              this.message = "Корисничко име је у употреби.";
            }
            if (respObj['message'] == 'emailError') {
              this.message = "Е-мејл је у употреби.";
            }
    



          });
      }
      this.message = "Лозинке се не поклапају."
    }
    this.message = "Форма је непотпуна.";
  }

  }

  nepravilnaForma(){
    this.message= "Форма је непотпуна."
  }

  searchParam: string;
preduzeca: Korisnik[] = []
pibNarucioca: String;
nazivNarucioca: String;
brojDana: number;
narucilac:Korisnik;
procenatRabata: number;
message1:String;


pretrazi(){
  this.UserService.pretrazi(this.searchParam).subscribe((pred:Korisnik[])=>{
    this.preduzeca = pred;
  })
}
}
