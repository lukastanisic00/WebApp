import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Narucilac = new Schema({
    narucilac: {
        type: String
    },
    narucilacPIB: {
        type: String
    },
    naziv: {
        type: String
    },
    PIB: {
        type: String
    },
    brDana:{
        type: Number
    },
    procenatRabata:{
        type: Number
    },
    DatumNarudzbine:{
        type:Date
    }
})

export default mongoose.model('Narucioci', Narucilac, 'narudzbine');