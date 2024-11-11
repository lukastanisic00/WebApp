import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let odeljenje = new Schema({
    naziv: {
        type: String
    },
    
    stolovi:{type: Array<Object>},

    nazivObjekta:{
        type: String
    },

  
    
    id:{
        type: String
    },

    pib:{
        type:String
    }
   
})

export default mongoose.model('Odeljenja', odeljenje, 'odeljenja');