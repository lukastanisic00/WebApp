import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Kupac = new Schema({

    kor_ime:{
        type: String},

    ime: {
        type:String},
    prezime: {
        type:String},
    brLk:{
        type:String
    },    

    lozinka:{
        type: String},
    tel: {
        type:String}
})
export default mongoose.model('Kupac', Kupac, 'kupci');