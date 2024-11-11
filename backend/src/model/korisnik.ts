import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Preduzece = new Schema({
    ime: {
        type:String},
    prezime: {
        type:String},
    kor_ime:{
        type: String},
    lozinka:{
        type: String},
    mejl: {
        type:String},
    tel: {
        type:String},
    tip: {
        type:String},
    naziv: {
        type:String},
    sediste: {
        type:String},
    pib: {
        type:String},
    matBroj: {
        type:String},
    status: {
        type:String},
    grb:{
        type:String
    }   , 
    postavljen:{
        type:Boolean
    },
    uSistemu:{
        type:Boolean
    },
    ziroRacuni:{
        type:Array<Object>
    },
    delatnosti:{
        type:Array<Object>
    },
    magacini:{
        type:Array<Object>
    },
    kase:{
        type:Array<Object>
    }      
})

export default mongoose.model('Korisnik', Preduzece, 'preduzeca');