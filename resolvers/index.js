import queries from './queries'
import mutations from './mutations'
import { subscription } from './subscriptions'

// import query resolvers
import { Article } from './queries/Article'

export default {
    Query: { ...queries },
    Mutation: { ...mutations },
    Subscription: { ...subscription},
    Article: {...Article},
}

