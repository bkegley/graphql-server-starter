import { mutation as Cat } from './cat'
import { mutation as Dog } from './dog'
import { mutation as Article } from './Article'

export default {
    _root: () => {
        return "Hello world!"
    },
    ...Cat,
    ...Dog,
    ...Article
}