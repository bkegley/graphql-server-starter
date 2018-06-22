import types from './types'
import { subscriptions } from './roots'
import { queries } from './roots'
import { mutations } from './roots'

export default [
    queries,
    mutations,
    types,
    subscriptions
]