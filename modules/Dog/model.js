import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Dog = new Schema({
    name: {
        type: String
    }
})

export default mongoose.model('dog', Dog)