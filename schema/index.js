import types from './types'
import subscriptions from './types/subscription'
import { queries } from './roots'
import { mutations } from './roots'

export default [
    queries,
    mutations,
    types,
    subscriptions
]