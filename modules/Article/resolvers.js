export const queries = {
    getArticles: async (parent, args, { models }) => {
        const { Article } = models
        const articles = await Article.find(args)
        return articles
    },
    getArticleById: async (parent, args, { models }) => {
        const { Article } = models
        const article = await Article.findOne(args)
        return article
    }
}

export const mutations = {
    createArticle: async (parent, args, { models }) => {
        const { Article } = models
        const article = await new Article(args).save()
        return article
    },
    createArticleComment: async (parent, args, { models }) => {
        const { Comment } = models
        const articleComment = await new Comment({
            ...args,
            isArticleComment: true
        }).save()
        return articleComment
    },
    deleteArticle: async (parent, args, { models }) => {
        const { Article } = models
        const response = await Article.deleteOne(args)
        return response.n === 1 ? true : false
    }
}

export const Article = {
    user: async (parent, args, { models }) => {
        const { User } = models
        const user = await User.findOne({_id: parent.userId})
        return user
    },
    comments: async (parent, args, { models }) => {
        const { Comment } = models
        const comments = await Comment.find({parentResource: parent._id})
        return comments
    }
}

export const ArticleComment = {
    user: async (parent, args, { models }) => {
        const { User } = models
        const user = User.findOne({_id: parent.userId})
        return user
    } 
}