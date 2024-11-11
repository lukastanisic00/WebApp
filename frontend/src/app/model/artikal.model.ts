import { Objekti } from "./objekti.model";

export class Artikal{
    sifra_artikla:string;
    naziv_artikla:string;
    jedinica_mere:String;
    stopa_poreza:number;
    proizvodjac:String;
    tip:String;
    zemlja_porekla:String;
    strani_naziv_artikla:String;
    barkod:String;
    carinska_tarifa:String;
    eko_taksa:Boolean;
    akcize:Boolean;
    min_zeljene_zalihe:Number;
    maks_zeljene_zalihe:Number;
    opis:String;
    deklaracija:String;
    magacini_i_objekti:Objekti[];
    slika:String;
    pib:String;

    

}