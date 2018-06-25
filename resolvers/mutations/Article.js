export const mutation = {
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