import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let izvestaj = new Schema({
    naziv: {
        type: String
    },
    pib:{ 
        type: String
    },
    
    iznos: {
        type: Number
    }
    ,
    porez:{
        type: Number
    },

    datum:{
        type:Date

    }
   
})

export default mongoose.model('Izvestaj', izvestaj, 'izvestaji');