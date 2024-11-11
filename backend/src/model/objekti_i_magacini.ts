import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Objekat = new Schema({
    naziv_magacina_objekta:{type:String},
    nabavna_cena_RSD:{type:Number},
    prodajna_cena_RSD:{type:Number},
    tekuce_stanje_lagera:{type:Number},
    min_zeljene_zalihe:{type:Number},
    maks_zeljene_zalihe:{type:Number}
})   