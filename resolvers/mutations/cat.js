import { pubsub, CAT_ADDED } from '../subscriptions'

export const mutation = {
    createCat: async (parent, args, { models }) => {
        const { Cat } = models
        const cat = await new Cat(args).save()
        pubsub.publish(CAT_ADDED, {'catAdded': cat })
        return cat
    }
}