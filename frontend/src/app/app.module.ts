import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './services/app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import {MatRadioModule} from '@angular/material/radio';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminPrijavaComponent } from './admin-prijava/admin-prijava.component';
import { DodatnaFormaZaPreduzeceComponent } from './dodatna-forma-za-preduzece/dodatna-forma-za-preduzece.component';
import { ProveraComponent } from './provera/provera.component';
import {MatSelectModule} from '@angular/material/select';
import { PreduzecePocetnaComponent } from './preduzece-pocetna/preduzece-pocetna.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreduzeceInfoComponent } from './preduzece-info/preduzece-info.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PreduzeceNaruciociComponent } from './preduzece-narucioci/preduzece-narucioci.component';
import { PreduzeceRobeIUslugeComponent } from './straniceArtikala/preduzece-robe-iusluge/preduzece-robe-iusluge.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PreduzeceRobeIUsluge1Component } from './straniceArtikala/preduzece-robe-iusluge1/preduzece-robe-iusluge1.component';
import { PreduzeceRobeIUsluge2Component } from './straniceArtikala/preduzece-robe-iusluge2/preduzece-robe-iusluge2.component';
import { PreduzeceRobeIUsluge3Component } from './straniceArtikala/preduzece-robe-iusluge3/preduzece-robe-iusluge3.component';
import { PreduzeceRobeIUsluge4Component } from './straniceArtikala/preduzece-robe-iusluge4/preduzece-robe-iusluge4.component';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RasporedDijalogComponent } from './raspored-dijalog/raspored-dijalog.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component';
import { DodajStoComponent } from './dodaj-sto/dodaj-sto.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { AdminPromenaLozinkeComponent } from './admin-promena-lozinke/admin-promena-lozinke.component';
import { AdminRegistracijaPComponent } from './admin-registracija-p/admin-registracija-p.component';
import { AdminRegistracijaKComponent } from './admin-registracija-k/admin-registracija-k.component';
import { KupacComponent } from './kupac/kupac.component';
import { RacuniKupcaComponent } from './racuni-kupca/racuni-kupca.component';
import { IzdavanjeRacunaUComponent } from './izdavanje-racuna-u/izdavanje-racuna-u.component';
import { IzvestajComponent } from './izvestaj/izvestaj.component';
import {MatToolbar, MatToolbarModule, MatToolbarRow} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    KorisnikComponent,
    AdminComponent,
    RegistracijaComponent,
    PromenaLozinkeComponent,
    AdminPrijavaComponent,
    DodatnaFormaZaPreduzeceComponent,
    ProveraComponent,
    PreduzecePocetnaComponent,
    PreduzeceInfoComponent,
    PreduzeceNaruciociComponent,
    PreduzeceRobeIUslugeComponent,
    PreduzeceRobeIUsluge1Component,
    PreduzeceRobeIUsluge2Component,
    PreduzeceRobeIUsluge3Component,
    PreduzeceRobeIUsluge4Component,
    RasporedArtikalaComponent,
    RasporedDijalogComponent,
    RasporedStolovaComponent,
    DodajStoComponent,
    IzdavanjeRacunaComponent,
    AdminPromenaLozinkeComponent,
    AdminRegistracijaPComponent,
    AdminRegistracijaKComponent,
    KupacComponent,
    RacuniKupcaComponent,
    IzdavanjeRacunaUComponent,
    IzvestajComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    DragDropModule,
  

  
  ],
  providers: [MatRadioModule
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
