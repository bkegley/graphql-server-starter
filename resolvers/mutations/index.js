import { mutation as Cat } from './cat'
import { mutation as Dog } from './dog'

export default {
    _root: () => {
        return "Hello world!"
    },
    ...Cat,
    ...Dog
}