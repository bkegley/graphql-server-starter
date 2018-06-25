export const mutation = {
    createArticle: async (parent, args, { models }) => {
        const { Article } = models
        const article = await new Article(args).save()
        return article
    },
    deleteArticle: async (parent, args, { models }) => {
        const { Article } = models
        const response = await Article.deleteOne(args)
        return response.n === 1 ? true : false
    }
}