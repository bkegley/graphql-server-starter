export const mutation = {
    createUser: async (parent, args, { models }) => {
        const { User } = models
        const user = await new User(args).save()
        return user
    }
}