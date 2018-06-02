import mongoose from 'mongoose'

const Dog = {
    name: String
}

export default mongoose.model('dog', Dog)