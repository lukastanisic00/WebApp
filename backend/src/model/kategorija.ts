import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let kategorija = new Schema({
    naziv: {
        type: String
    },
    artikli: {
        type: Array<{
            naziv:{type:String},
            artikli:{type:Array<Object>}
        }>
    },
    
    potkategorije: {
        type: Array<Object>
    }
    ,
    id:{
        type: String
    }
   
})

export default mongoose.model('Kategorija', kategorija, 'kategorije');