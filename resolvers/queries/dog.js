export const query = {
    getDogs: async (parent, args, { models }) => {
        const { Dog } = models
        const dogs = await Dog.find(args)
        return dogs
    },
    getDogById: async (parent, args, { models }) => {
        const { Dog } = models
        const dog = await Dog.findOne(args)
        return dog
    }
}