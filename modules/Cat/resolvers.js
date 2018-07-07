import pubsub from '../../utils/pubsub'

export const queries = {
    getCats: async (parent, args, { models }) => {
        const { Cat } = models
        const cats = await Cat.find(args)
        return cats
    }
}

export const mutations = {
    createCat: async (parent, args, { models }) => {
        const { Cat } = models
        const cat = await new Cat(args).save()
        return cat
    }
}

export const CAT_ADDED = 'CAT_ADDED'

export const subscriptions = {
    catAdded: {
        subscribe: () => pubsub.asyncIterator(CAT_ADDED)
    }
}

export const Cat = {
    dog: async (parent, args, context) => {
        return 'woof!'
    }
}