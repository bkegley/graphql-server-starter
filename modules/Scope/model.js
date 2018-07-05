import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Scope = new Schema({
    scope: {
        type: String,
        required: [true, 'name field is required']
    },
    crudOperation: {
        type: String,
        required: [true, 'crudOperation field is required']
    },
    resource: {
        type: String,
        required: [true, 'resource field is required']
    },
    field: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

Scope.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = Date.now()
    }
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model('scope', Scope)