import { Adresa } from "./adresa.model";
import { Delatnosti } from "./delatnosti.model";
import { Kasa } from "./kasa.model";
import { Magacin } from "./magacin.model";

export class Korisnik{
    kor_ime: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tel: string;
    mejl: string;
    naziv: string;
    sediste: String;
    pib: string;
    matBroj: String;
    tip: string;
    grb: string;
    status: string;
    uSistemu:boolean;
    postavljen: boolean;
    ziroRacuni:Array<{ziroRacun:string }>;
    delatnosti:Array<{delatnost:string}>;
    magacini:Array<Magacin>;
    kase:Array<Kasa>
         
}