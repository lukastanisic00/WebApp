import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AdminPrijavaComponent } from '../admin-prijava/admin-prijava.component';
import { AdminComponent } from '../admin/admin.component';
import { DodatnaFormaZaPreduzeceComponent } from '../dodatna-forma-za-preduzece/dodatna-forma-za-preduzece.component';
import { KorisnikComponent } from '../korisnik/korisnik.component';
import { PreduzeceInfoComponent } from '../preduzece-info/preduzece-info.component';
import { PreduzeceNaruciociComponent } from '../preduzece-narucioci/preduzece-narucioci.component';
import { PreduzecePocetnaComponent } from '../preduzece-pocetna/preduzece-pocetna.component';
import { PreduzeceRobeIUslugeComponent } from '../straniceArtikala/preduzece-robe-iusluge/preduzece-robe-iusluge.component';
import { PrijavaComponent } from '../prijava/prijava.component';
import { PromenaLozinkeComponent } from '../promena-lozinke/promena-lozinke.component';
import { ProveraComponent } from '../provera/provera.component';
import { RegistracijaComponent } from '../registracija/registracija.component';
import { PreduzeceRobeIUsluge1Component } from '../straniceArtikala/preduzece-robe-iusluge1/preduzece-robe-iusluge1.component';
import { PreduzeceRobeIUsluge2Component } from '../straniceArtikala/preduzece-robe-iusluge2/preduzece-robe-iusluge2.component';
import { PreduzeceRobeIUsluge3Component } from '../straniceArtikala/preduzece-robe-iusluge3/preduzece-robe-iusluge3.component';
import { PreduzeceRobeIUsluge4Component } from '../straniceArtikala/preduzece-robe-iusluge4/preduzece-robe-iusluge4.component';
import { RasporedArtikalaComponent } from '../raspored-artikala/raspored-artikala.component';
import { RasporedStolovaComponent } from '../raspored-stolova/raspored-stolova.component';
import { IzdavanjeRacunaComponent } from '../izdavanje-racuna/izdavanje-racuna.component';
import { AdminPromenaLozinkeComponent } from '../admin-promena-lozinke/admin-promena-lozinke.component';
import { AdminRegistracijaKComponent } from '../admin-registracija-k/admin-registracija-k.component';
import { AdminRegistracijaPComponent } from '../admin-registracija-p/admin-registracija-p.component';
import { KupacComponent } from '../kupac/kupac.component';
import { RacuniKupcaComponent } from '../racuni-kupca/racuni-kupca.component';
import { IzdavanjeRacunaUComponent } from '../izdavanje-racuna-u/izdavanje-racuna-u.component';
import { IzvestajComponent } from '../izvestaj/izvestaj.component';

const routes: Routes = [
  {path: "", component: PrijavaComponent},
  {path: "korisnik", component: KorisnikComponent},
  {path: "admin", component: AdminComponent},
  {path: "admin/promenaLozinke", component: AdminPromenaLozinkeComponent},
  {path: "admin/registrujPreduzece", component: AdminRegistracijaPComponent},
  {path: "admin/registrujKupca", component: AdminRegistracijaKComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "korisnik/promenaLozinke", component: PromenaLozinkeComponent},
  {path: "prijavaAdmin", component: AdminPrijavaComponent},
  {path: "prvaPrijava", component: DodatnaFormaZaPreduzeceComponent},
  {path: "preduzece", component: PreduzecePocetnaComponent},
  {path: "preduzece/info", component: PreduzeceInfoComponent},
  {path: "preduzece/narucioci", component: PreduzeceNaruciociComponent},
  {path: "preduzece/robe_i_usluge0", component: PreduzeceRobeIUslugeComponent},
  {path: "preduzece/robe_i_usluge1", component: PreduzeceRobeIUsluge1Component},
  {path: "preduzece/robe_i_usluge2", component: PreduzeceRobeIUsluge2Component},
  {path: "preduzece/robe_i_usluge3", component: PreduzeceRobeIUsluge3Component},
  {path: "preduzece/robe_i_usluge4", component: PreduzeceRobeIUsluge4Component},
  {path: "preduzece/rasporedArtikala", component: RasporedArtikalaComponent},
  {path: "preduzece/rasporedStolova", component:RasporedStolovaComponent},
  {path: "preduzece/izdavanje_racuna", component:IzdavanjeRacunaComponent},
  {path: "preduzece/izdavanje_racunaU", component:IzdavanjeRacunaUComponent},
  {path: "preduzece/izvestaj", component:IzvestajComponent},
  {path: "kupac", component:KupacComponent},
  {path: "kupac/racuni", component:RacuniKupcaComponent},
  
  {path: '*', component: ProveraComponent },
  {path: '**', component: PrijavaComponent },

  
  //ako ruta ne postoji, vrati na PrijavaComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
