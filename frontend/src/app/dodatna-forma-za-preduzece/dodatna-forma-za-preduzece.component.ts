import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Kasa } from '../model/kasa.model';
import { Magacin } from '../model/magacin.model';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-dodatna-forma-za-preduzece',
  templateUrl: './dodatna-forma-za-preduzece.component.html',
  styleUrls: ['./dodatna-forma-za-preduzece.component.css']
})
export class DodatnaFormaZaPreduzeceComponent implements OnInit {

  constructor(private ServisKorisnik: KorisnikService, ruter: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.brojKasa= 1;
    this.brojMagacina=1;
    this.brojZiroRacuna=1;
    this.magacini = new Magacin()[this.brojMagacina];
    
    this.kase= new Kasa()[this.brojKasa];

  }

  extraForm: FormGroup;




  brojKasa:number;
  brojMagacina:number;
  brojZiroRacuna:number;

  message:string;
  
  magacini:Magacin[];
  kase:Kasa[];
  tip:String;
  uSistemu:boolean;

  intializeForm(){
    this.extraForm= this.fb.group({
      tip : new FormControl('',[Validators.required]),
      sifra : new FormControl('',[Validators.required]),
      uSistemu  : new FormControl(),
      ziroRacuni: this.fb.array([]),
      magacini: this.fb.array([this.fb.group({
        id: ['',Validators.required],
        naziv:['',Validators.required]
      })]),
      kase: this.fb.array([this.fb.group({
        lokacija: ['',Validators.required],
        tip:['',Validators.required]
      })]),



    })
  }
  ziroRacuni() : FormArray {  
    return this.extraForm.get("ziroRacuni") as FormArray  
  }  
     
  noviZiroRacun(): FormGroup {  
    return this.fb.group({  
        ziroRacun: ['',Validators.required]  
    })  
  }  
     
  dodajPolje() {  
    this.ziroRacuni().push(this.noviZiroRacun());  
  }  







}
