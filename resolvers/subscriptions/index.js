import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

export const CAT_ADDED = 'CAT_ADDED'

export const subscription = {
    catAdded: {
        subscribe: () => pubsub.asyncIterator(CAT_ADDED)
    }
}