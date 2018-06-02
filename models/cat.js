import mongoose from 'mongoose'

const Cat = {
    name: String
}

export default mongoose.model('cat', Cat)