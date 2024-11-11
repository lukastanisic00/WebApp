import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';
import { Kupac } from '../model/kupac.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-registracija-k',
  templateUrl: './admin-registracija-k.component.html',
  styleUrls: ['./admin-registracija-k.component.css']
})
export class AdminRegistracijaKComponent implements OnInit {

  constructor(private AdminService: AdminService,private router: Router,private fb:FormBuilder) { }

  public regForm:FormGroup;
 
  

  ngOnInit(): void {
    this.kupac= new Kupac();
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
    broj: new FormControl('',[Validators.required,]),
    brLk: new FormControl('',[Validators.required,])
  });


  

  }

  kupac: Kupac;
  
  
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
       this.AdminService.registrujKupca(
          this.regForm.get("kor_ime").value,this.regForm.get("lozinka").value,this.regForm.get("ime").value,
          this.regForm.get("prezime").value,this.regForm.get("broj").value,this.regForm.get("brLk").value).subscribe((respObj)=>{
            if (respObj['message'] == 'done') {
              this.router.navigate(['admin'])
            }
            if (respObj['message'] == 'usernameError') {
              this.message = "Корисничко име је у употреби.";
            }
            if (respObj['message'] == 'lkError') {
              this.message = "Лична карта је у употреби.";
            }


          });
      }
    else{
      this.message = "Лозинке се не поклапају."
    }
  }
  else
  {
    this.message = "Лозинка није у одговарајућем формату.";

  }
    }
    else{
    this.message = "Форма је непотпуна.";
    }
  }

  nepravilnaForma(){
    this.message= "Форма је непотпуна."
  }

  


  


  


  }
  
  


