import { mutation as Cat } from './types/cat'
import { mutation as Dog } from './types/dog'

export default `
    type Mutation {
        ${Cat}
        ${Dog}
    }
`