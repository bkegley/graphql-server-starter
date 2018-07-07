export const queries = {
    getDogs: async (parent, args, { models }) => {
        const { Dog } = models
        const dogs = await Dog.find(args)
        return dogs
    }
}

export const mutations = {
    createDog: async (parent, args, { models }) => {
        const { Dog } = models
        const dog = await new Dog(args).save()
        return dog
    }
}

export const Dog = {
    cat: async (parent, args, context) => {
        return 'meow!'
    }
}