import queries from './queries'
import mutations from './mutations'
import { subscription } from './subscriptions'

// import query resolvers
import { Article, ArticleComment } from './queries/Article'
import { User } from './queries/User'
import { Comment } from './queries/Comment'

// import interfaces
import { CommentInterface } from './queries/interfaces'

export default {
    Query: { ...queries },
    Mutation: { ...mutations },
    Subscription: { ...subscription },
    Article: {...Article },
    ArticleComment: { ...ArticleComment },
    User: { ...User },
    Comment: { ...Comment },
    CommentInterface: { ...CommentInterface }
}

