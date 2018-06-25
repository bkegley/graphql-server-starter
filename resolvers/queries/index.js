import { query as Cat } from './cat'
import { query as Dog } from './dog'
import { query as Article } from './Article'

export default {
    _root: () => {
        return "Hello world!"
    },
    ...Cat,
    ...Dog,
    ...Article
}