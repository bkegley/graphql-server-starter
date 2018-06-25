import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Comment = new Schema({
    text: {
        type: String
    },
    userId: {
        type: String
    },
    parentResource: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    isArticleComment: {
        type: Boolean
    }
})

Comment.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = Date.now()
    }
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model('comment', Comment)