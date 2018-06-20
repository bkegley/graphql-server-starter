export const mutation = {
    createDog: async (parent, args, { models }) => {
        const { Dog } = models
        const dog = await new Dog(args).save()
        return dog
    }
}