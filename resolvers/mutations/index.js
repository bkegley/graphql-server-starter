import { mutation as Cat } from './cat'
import { mutation as Dog } from './dog'
import { mutation as Article } from './Article'
import { mutation as User } from './User'
import { mutation as Scope } from './Scope'
import { mutation as Comment } from './Comment'

export default {
    _root: () => {
        return "Hello world!"
    },
    ...Cat,
    ...Dog,
    ...Article,
    ...User,
    ...Scope,
    ...Comment,
}