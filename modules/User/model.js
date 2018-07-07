import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    scope: {
        type: [String]
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

User.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = Date.now()
    }
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model('user', User)