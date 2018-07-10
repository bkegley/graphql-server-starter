import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Article = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    tags: [
        {
            type: String
        }
    ],
    description: {
        type: String
    },
    content: {
        type: String
    },
    userId: {
        type: String
    },
    published: {
        type: Boolean
    }
}, { timestamps: true })

Article.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = Date.now()
    }
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model('article', Article)