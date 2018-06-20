export const mutation = {
    createCat: async (parent, args, { models }) => {
        const { Cat } = models
        const cat = await new Cat(args).save()
        return cat
    }
}