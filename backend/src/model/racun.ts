import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Racun = new Schema({
    pib: {
        type: String
    },
    iznos: {
        type: Number
    },
    pdv: {
        type: String
    },
    datum: {
        type: Date
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    brLk:{
        type:String
    },
    stavke:{
        type: Array<Object>
    },
    nacinPlacanja:{
        type:String
    },
    nazivPreduzeca:{
        type:String
    },
    nazivObjekta:{
        type:String
    },

    narucilac:{
        type:String
    }
})

export default mongoose.model('Racuni', Racun, 'racuni');
