import { query as Cat } from './cat'
import { query as Dog } from './dog'
import { query as Article } from './Article'
import { query as User } from './User'
import { query as Scope } from './Scope'
import { query as Comment } from './Comment'

export default {
    _root: () => {
        return "Hello world!"
    },
    ...Cat,
    ...Dog,
    ...Article,
    ...User,
    ...Scope,
    ...Comment
}