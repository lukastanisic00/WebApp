import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Delatnosti } from '../model/delatnosti.model';
import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from '../services/korisnik.service';


@Component({
  selector: 'app-provera',
  templateUrl: './provera.component.html',
  styleUrls: ['./provera.component.css']
})
export class ProveraComponent implements OnInit {

  productForm: FormGroup;  
  korisnik:Korisnik;
  message:String;
  greskaZR:String;
  greskaD:String;
  greskaK:String;
  greskaM:String;

  sifarnik:Delatnosti[];
     
  constructor(private fb:FormBuilder, private router:Router, private korisnikServis:KorisnikService) {  
     
    this.productForm = this.fb.group({  
      tip : new FormControl('P',[Validators.required]),
      delatnosti: this.fb.array([]) ,
      uSistemu  : new FormControl(false),  
      ziroRacuni: this.fb.array([]) , 
      magacini: this.fb.array([]) ,
      kase: this.fb.array([]),
      brojMagacina:new FormControl(1),
      brojKasa:new FormControl(1)

    });  
  }  
  ngOnInit(): void {
    this.korisnikServis.dohvatiSifarnik().subscribe((delatnosti: Delatnosti[])=>{
      this.sifarnik = delatnosti;
    });
    this.ziroRacuni().push(this.noviRacun());
    this.delatnosti().push(this.novaDelatnost());  
    this.magacini().push(this.noviMagacin());
    this.postaviKase(this.brojKasa());
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen'))

  }
    
  ziroRacuni() : FormArray {  
    return this.productForm.get("ziroRacuni") as FormArray  
  }  
     
  noviRacun(): FormGroup {  
    return this.fb.group({  
      ziroRacun: new FormControl ('',[Validators.required,Validators.pattern('^[0-9]{3}-[0-9]{12}-[0-9]{2}$')]),    
    })  
  }  
     
  dodajRacun() {  
    if (this.ziroRacuni().valid)
    this.ziroRacuni().push(this.noviRacun());  
  }  
     
  ukloniRacun(i:number) {  
    this.ziroRacuni().removeAt(i);  
  } 
  
  delatnosti() : FormArray {  
    return this.productForm.get("delatnosti") as FormArray  
  }  
     
  novaDelatnost(): FormGroup {  
    return this.fb.group({  
      delatnost: new FormControl ('',[Validators.required]),    
    })  
  }  
     
  dodajDelatnost() {  
    if (this.delatnosti().valid)
    this.delatnosti().push(this.novaDelatnost());  
  }  
     
  ukloniDelatnost(i:number) {  
    this.delatnosti().removeAt(i);  
  } 

  magacini() : FormArray {  
    return this.productForm.get("magacini") as FormArray  
  }  
     
  noviMagacin(): FormGroup {  
    return this.fb.group({  
      naziv: new FormControl ('',[Validators.required]), 
      id: new FormControl ('',[Validators.required]),    
    })  
  }  
     
  postaviMagacine(n:number) { 
    while(this.magacini().length !==0) this.magacini().removeAt(0);
    for (let index = 0; index < n; index++) {
      this.magacini().push(this.noviMagacin());
    }
      
  }   

  kase() : FormArray {  
    return this.productForm.get("kase") as FormArray  
  }  
     
  novaKasa(): FormGroup {  
    return this.fb.group({  
      tip: new FormControl ('',[Validators.required]), 
      lokacija: new FormControl ('',[Validators.required]),    
    })  
  }  
     
  postaviKase(n:number) {  
    while(this.kase().length !==0) this.kase().removeAt(0);
    for (let index = 0; index < n; index++) {
      this.kase().push(this.novaKasa());
    }
      
  }  
  
  brojMagacina() : number {  
    return this.productForm.get("brojMagacina").value 
  }  

  brojKasa() : number {  
    return this.productForm.get("brojKasa").value
  }  

 
     
  onSubmit() {  
    console.log(this.productForm.value);
    if(this.productForm.valid){
    this.korisnikServis.dopuni(this.korisnik.kor_ime,this.productForm.get("tip").value,this.productForm.get("delatnosti").value,
    this.productForm.get("uSistemu").value,this.productForm.get("ziroRacuni").value,this.productForm.get("magacini").value,this.productForm.get("kase").value     
    ).subscribe((korisnik: Korisnik)=>{
      if(!korisnik){
        this.message = 'Неуспешан унос';
      }
      else{
        this.router.navigate(['preduzece']); 
        
        }
      
    })
    
  }
  this.message="Попуните сва отворена поља." 
  if (this.ziroRacuni().invalid) this.greskaZR="Попуните поља за жиро рачуне на одговарајући начин";
  this.message="Попуните сва отворена поља." 
  if (this.magacini().invalid) this.greskaM="Попуните поља за магацине на одговарајући начин";
  this.message="Попуните сва отворена поља." 
  if (this.delatnosti().invalid) this.greskaD="Попуните поља за делатности на одговарајући начин";
  this.message="Попуните сва отворена поља." 
  if (this.kase().invalid) this.greskaK="Попуните поља за касе на одговарајући начин";




} 
}
