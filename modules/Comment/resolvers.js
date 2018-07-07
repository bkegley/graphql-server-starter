export const queries = {
    getComments: async (parent, args, { models }) => {
        const { Comment } = models
        const comments = await Comment.find(args)
        return comments
    }
}

export const mutations = {
    createComment: async (parent, args, { models }) => {
        const { Comment } = models
        const comment = await new Comment(args).save()
        return comment
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

export const CommentInterface = {
    __resolveType: (parent, args, context) => {
        if (parent.isArticleComment) {
            return 'ArticleComment'
        }
        return 'Comment'
    }
}