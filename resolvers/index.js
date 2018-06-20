import queries from './queries'
import mutations from './mutations'
import { subscription } from './subscriptions'

export default {
    Query: { ...queries },
    Mutation: { ...mutations },
    Subscription: { ...subscription}
}

