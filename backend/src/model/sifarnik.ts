import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Delatnosti = new Schema({
    naziv: {
        type: String
    }
})

export default mongoose.model('Sifarnik', Delatnosti, 'sifrarnikDelatnosti');