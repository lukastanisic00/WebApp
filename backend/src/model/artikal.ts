import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Artikal = new Schema({
    sifra_artikla:{type:String},
    naziv_artikla:{type:String},
    jedinica_mere:{type:String},
    stopa_poreza:{type:Number},
    proizvodjac:{type:String},
    tip:{type:String},
    zemlja_porekla:{type:String},
    strani_naziv_artikla:{type:String},
    barkod:{type:String},
    carinska_tarifa:{type:String},
    eko_taksa:{type:Boolean},
    akcize:{type:Boolean},
    min_zeljene_zalihe:{type:Number},
    maks_zeljene_zalihe:{type:Number},
    opis:{type:String},
    deklaracija:{type:String},
    pib:{type:String},
    magacini_i_objekti:{type:Array<{naziv_magacina_objekta:{type:String},
    nabavna_cena_RSD:{type:Number},
    prodajna_cena_RSD:{type:Number},
    tekuce_stanje_lagera:{type:Number},
    min_zeljene_zalihe:{type:Number},
    maks_zeljene_zalihe:{type:Number},
    slika:{type:String}
}>}
         
})

export default mongoose.model('Artikal', Artikal, 'artikli');