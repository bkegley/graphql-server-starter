export const query = {
    getUsers: async (parent, args, { models }) => {
        const { User } = models
        const user = await User.find(args)
        return user
    },
    getUserById: async (parent, args, { models }) => {
        const { User } = models
        const user = await User.findOne(args)
        return user
    }
}

export const User = {
    comments: async (parent, args, { models }) => {
        const { Comment } = models
        const comments = await Comment.find({userId: parent._id})
        return comments
    }
}