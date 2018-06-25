export const query = {
    getComments: async (parent, args, { models }) => {
        const { Comment } = models
        const comments = await Comment.find(args)
        return comments
    }
}

export const Comment = {
    comments: async (parent, args, { models }) => {
        const { Comment } = models
        const comments = await Comment.find({parentResource: parent._id})
        return comments
    },
    user: async (parent, args, { models }) => {
        const { User } = models
        const user = User.findOne({_id: parent.userId})
        return user
    }
}