export const query = {
    getCats: async (parent, args, { models }) => {
        const { Cat } = models
        const cats = await Cat.find(args)
        return cats
    },
    getCatById: async (parent, args, { models }) => {
        const { Cat } = models
        const cat = await Cat.findOne(args)
        return cat
    }
}