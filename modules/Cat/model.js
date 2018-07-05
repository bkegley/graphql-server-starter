import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Cat = new Schema({
    name: {
        type: String
    }
})

export default mongoose.model('cat', Cat)