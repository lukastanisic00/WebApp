import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Delatnosti } from '../model/delatnosti.model';
import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-preduzece-info',
  templateUrl: './preduzece-info.component.html',
  styleUrls: ['./preduzece-info.component.css']
})
export class PreduzeceInfoComponent implements OnInit {

  regForm:FormGroup
  productForm1: FormGroup; 
  productForm2: FormGroup;  
  message2:String;
  message3:String;
  greskaZR:String;
  greskaD:String;
  greskaK:String;
  greskaM:String;

  sifarnik:Delatnosti[];

  constructor(private fb: FormBuilder, private UserService:KorisnikService,private router: Router) { 

  }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('prijavljen'), )
    this.izmeni= false;
    this.izmeni2=false;
    this.izmeni3=false;
    this.initializeForm();
    this.initializeForm2();
    this.initializeForm3();
    this.UserService.dohvatiSifarnik().subscribe((delatnosti: Delatnosti[])=>{
      this.sifarnik = delatnosti;

    });
    
  }

  

  korisnik:Korisnik;
  initializeForm(){
    this.regForm = new FormGroup({
    kor_ime: new FormControl(this.korisnik.kor_ime,[Validators.required]),
    lozinka:  new FormControl('',[Validators.required,]),
    lozinkaP:  new FormControl(this.lozinkaP,[Validators.required]),
    ime: new FormControl(this.korisnik.ime,[Validators.required]),
    prezime: new FormControl(this.korisnik.prezime,[Validators.required]),
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
  initializeForm2(){
    this.productForm1 = this.fb.group({  
      tip : new FormControl(this.korisnik.tip,[Validators.required]),
      delatnosti: this.fb.array([]) ,
      uSistemu  : new FormControl(this.korisnik.uSistemu),  
      ziroRacuni: this.fb.array([])
    });
    console.log(this.korisnik);
    this.korisnik.ziroRacuni.forEach(element => { this.ziroRacuni().push(this.fb.group({  
      ziroRacun: new FormControl (element.ziroRacun,[Validators.required,Validators.pattern('^[0-9]{3}-[0-9]{12}-[0-9]{2}$')]),    
    }) 
  )});
    
    this.korisnik.delatnosti.forEach(element => {this.delatnosti().push(this.fb.group({  
      delatnost: new FormControl (element.delatnost ,[Validators.required]),    
    })  )})
  
    
  }

  initializeForm3(){
    this.productForm2= this.fb.group({
      magacini: this.fb.array([]) ,
      kase: this.fb.array([]),
      brojMagacina:new FormControl(this.korisnik.magacini.length),
      brojKasa:new FormControl(this.korisnik.kase.length)

    }); 
    
    this.korisnik.magacini.forEach(element => { this.magacini().push(this.fb.group({  
      naziv: new FormControl (element.naziv,[Validators.required]), 
      id: new FormControl (element.id,[Validators.required]),    
    })   )      
    });

    this.korisnik.kase.forEach(element => { this.kase().push(this.fb.group({  
      tip: new FormControl (element.tip,[Validators.required]), 
      lokacija: new FormControl (element.lokacija,[Validators.required]),    
    })  )
    });

    

  }

 
  
  
  lozinkaP: string;
  izmeni:Boolean;
  izmeni2:Boolean;
  izmeni3:Boolean;

 
    status: string;

  message: string;

  control = new FormControl('',Validators.required)

  Izmeni(){
    
    if (this.regForm.valid) {
      let provera=/^(?=(.*[A-Z])+)(?=(.*\d)+)(?=(.*[_@$!%*?&])+)[a-zA-Z][A-Za-z\d_@$!%*?&]{7,11}$/;
      if(provera.test(this.regForm.get("lozinka").value)==true){
      if (this.regForm.get("lozinka").value == this.regForm.get("lozinkaP").value) {
       this.UserService.izmeni(/*this.korisnik.kor_ime, this.korisnik.lozinka, this.korisnik.ime,
          this.korisnik.prezime, this.korisnik.broj, this.korisnik.mejl, this.korisnik.naziv, this.korisnik.tip,
          this.korisnik.adresa, this.korisnik.matBroj, this.korisnik.pib, this.korisnik.grb*/this.korisnik.kor_ime,
          this.regForm.get("kor_ime").value,this.regForm.get("lozinka").value,this.regForm.get("ime").value,
          this.regForm.get("prezime").value,this.regForm.get("broj").value,this.regForm.get("mejl").value,this.regForm.get("naziv").value,this.regForm.get("tip").value,
          this.regForm.get("adresa").value,this.regForm.get("matBroj").value,this.regForm.get("pib").value,this.regForm.get("grb").value       
          ).subscribe(respObj => {
            if (respObj['message'] == 'done') {
              this.message = "Измене успешно извршене.";
            }
            if (respObj['message'] == 'usernameError') {
              this.message = "Корисничко име је у употреби.";
            }
            if (respObj['message'] == 'emailError') {
              this.message = "Е-мејл је у употреби.";
            }


          });
      }
      else{
      this.message = "Лозинке се не поклапају."}
      }
      else{
        this.message = "Лозинка није у одговарајућем формату."
      }
    }
    this.message = "Форма је непотпуна.";

  }

  nepravilnaForma(){
    this.message= "Форма је непотпуна."
  }


  izmena(){
      this.izmeni = (!this.izmeni);
      if(this.izmeni==false) this.initializeForm();
    }

  izmena2(){
      this.izmeni2 = (!this.izmeni2);
      if(this.izmeni2==false) this.initializeForm2();
    }
  izmena3(){
      this.izmeni3 = (!this.izmeni3);
      if(this.izmeni3==false) this.initializeForm3();
    }   
    

      
    ziroRacuni() : FormArray {  
      return this.productForm1.get("ziroRacuni") as FormArray  
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
      return this.productForm1.get("delatnosti") as FormArray  
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
      return this.productForm2.get("magacini") as FormArray  
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
      return this.productForm2.get("kase") as FormArray  
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
      return this.productForm2.get("brojMagacina").value 
    }  
  
    brojKasa() : number {  
      return this.productForm2.get("brojKasa").value
    }  
  
   
       
    onSubmit() {  
      console.log(this.productForm1.value);
      console.log(this.productForm2.value);
      if(this.productForm1.valid && this.productForm2.valid){
      this.UserService.dopuni(this.korisnik.kor_ime,this.productForm1.get("tip").value,this.productForm1.get("delatnosti").value,
      this.productForm1.get("uSistemu").value,this.productForm1.get("ziroRacuni").value,this.productForm2.get("magacini").value,this.productForm2.get("kase").value     
      ).subscribe((korisnik: Korisnik)=>{
        if(!korisnik){
          this.message = 'Неуспешан унос';
        }
        else{
          this.message3 = "Измене успешно извршене.";
          this.message2 = "Измене успешно извршене.";
          if(this.izmena2) this.izmena3();
          if(this.izmena2) this.izmena2()
          
          }
        
      })
      
    }
    else{
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

}
