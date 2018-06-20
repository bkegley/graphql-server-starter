import { query as Cat } from './cat'
import { query as Dog } from './dog'

export default {
    _root: () => {
        return "Hello world!"
    },
    ...Cat,
    ...Dog
}