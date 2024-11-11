import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Korisnik } from '../model/korisnik.model';
import { AdminService } from '../services/admin.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-admin-registracija-p',
  templateUrl: './admin-registracija-p.component.html',
  styleUrls: ['./admin-registracija-p.component.css']
})
export class AdminRegistracijaPComponent implements OnInit {

  constructor(private AdminService: AdminService,private router: Router,private fb:FormBuilder) { }

  public regForm:FormGroup;
  grbZaSlanje:File;
  grbUrl:String;
  

  ngOnInit(): void {
    this.korisnik= new Korisnik();
    this.potvrdi=false;
    this.initializeForm();

    
    
  }

  initializeForm(){
    this.regForm = new FormGroup({
    kor_ime: new FormControl('',[Validators.required]),
    lozinka:  new FormControl('',[Validators.required]),
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

  public korisnik: Korisnik;
  
  
  lozinkaP: string;
  potvrdi:boolean;

 
    status: string;

  message: string;

  control = new FormControl('',Validators.required)

  register(){
    
    if (this.regForm.valid) {
       let provera=/^(?=(.*[A-Z])+)(?=(.*\d)+)(?=(.*[_@$!%*?&])+)[a-zA-Z][A-Za-z\d_@$!%*?&]{7,11}$/;
      if(provera.test(this.regForm.get("lozinka").value)==true){
      if (this.regForm.get("lozinka").value == this.regForm.get("lozinkaP").value) {
       this.AdminService.registruj(/*this.korisnik.kor_ime, this.korisnik.lozinka, this.korisnik.ime,
          this.korisnik.prezime, this.korisnik.broj, this.korisnik.mejl, this.korisnik.naziv, this.korisnik.tip,
          this.korisnik.adresa, this.korisnik.matBroj, this.korisnik.pib, this.korisnik.grb*/
          this.regForm.get("kor_ime").value,this.regForm.get("lozinka").value,this.regForm.get("ime").value,
          this.regForm.get("prezime").value,this.regForm.get("broj").value,this.regForm.get("mejl").value,this.regForm.get("naziv").value,this.regForm.get("tip").value,
          this.regForm.get("adresa").value,this.regForm.get("matBroj").value,this.regForm.get("pib").value,this.grbUrl     
          ).subscribe(respObj => {
            if (respObj['message'] == 'done') {
              
             console.log(this.grbZaSlanje);
              this.router.navigate(['admin'])
            }
            if (respObj['message'] == 'usernameError') {
              this.message = "Корисничко име је у употреби.";
            }
            if (respObj['message'] == 'emailError') {
              this.message = "Е-мејл је у употреби.";
            }
            if (respObj['message'] == 'pibError') {
              this.message = "Погрешан ПИБ.";}


          });
      }
    else{
      this.message = "Лозинке се не поклапају."
    }
    }
    else{
      this.message = "Лозинке није у одговарајућем формату."

    }
  }
    else{
    this.message = "Форма је непотпуна.";
    }
  }

  nepravilnaForma(){
    this.message= "Форма је непотпуна."
  }

  

  handleFileInput(files:FileList){
    var raw
    var self = this;
  
    this.grbZaSlanje=files.item(0);
    const reader= new FileReader();
    reader.readAsDataURL(this.grbZaSlanje);
    reader.onload = function(e){
    raw= reader.result;
    console.log("ready")
    self.grbUrl=raw;
    let image = new Image()
    image.src=e.target.result.toString()
    image.onload=(im)=>{
      var height=image.height;
      var width=image.width;
      if((height>300)||(height<100)||(width<100)||(width>300)){
        self.message="Грб је неодговарајућих димензија"
      }
      else{
        self.message='';
        self.potvrdi=true;
      }
    }
       
  
  }
  
    
   
   
  
  }
  


  


  }
  
  

