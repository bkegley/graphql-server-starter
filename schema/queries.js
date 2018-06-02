import { query as Cat } from './types/cat'
import { query as Dog } from './types/dog'

export default `
    type Query {
        ${Cat}
        ${Dog}
    }
`