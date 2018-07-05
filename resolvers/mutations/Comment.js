export const mutations = {
    createComment: async (parent, args, { models }) => {
        const { Comment } = models
        const comment = await new Comment(args).save()
        return comment
    }
}