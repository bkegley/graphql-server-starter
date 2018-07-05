export const queries = {
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

export const mutations = {
    createUser: async (parent, args, { models }) => {
        const { User } = models
        const user = await new User(args).save()
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
