import requireDir from 'require-dir'
import * as interfaces from '../modules/interfaces'

const modules = requireDir('../modules', { recurse: true })

// TODO: normalize directories here

// initialize variables
let types = [`
    type Query {
        _root: String
    }

    type Mutation {
        _root: String
    }
    
    type Subscription {
        _root: String
    }
`]

const tmpResolvers = {
    queries: {
        Query: {
            _root: () => 'Hello world!'
        }
    },
    mutations: {
        Mutation: {
            _root: () => 'Hello world!'
        }
    },
    subscriptions: {
        Subscription: {
            _root: () => 'Hello world!'
        }
    },
    namedResolvers: {...interfaces}
}

const models = {}

const schemaDirectives = {}

const parseModule = (mod, name, tmpResolvers, models, types) => {
    Object.keys(mod).map(async key => {
        key === 'resolvers' ? parseResolvers(mod[key], name, tmpResolvers)
        // if types push string to typeDef array
        : key === 'types' ? types.push(mod[key].default)
        // if model push named model to models
        : key === 'model' ? Object.assign(models, {[name]: mod[key].default})
        : console.warn(`File ${key} on module ${name} was not parsed.`)
    })
}

const parseResolvers = (moduleResolvers, name, { queries, mutations, subscriptions, namedResolvers}) => {
    Object.keys(moduleResolvers).map(key => {
        const resolver = moduleResolvers[key]
        key === 'queries' ? Object.assign(queries.Query, resolver)
        : key === 'mutations' ? Object.assign(mutations.Mutation, resolver)
        : key === 'subscriptions' ? Object.assign(subscriptions.Subscription, resolver)
        : key === name ? Object.assign(namedResolvers, {[name]: resolver})
        : console.warn(`Resolver export ${key} on module ${name} was not parsed.`)    
    }) 
}

// iterate over modules
Object.values(modules).map( (mod, index) => {
    parseModule(mod, Object.keys(modules)[index], tmpResolvers, models, types)
})

// parse directives
const directivesTypeDefs = requireDir('../directives/typeDefs')
Object.values(directivesTypeDefs).map(directive => {
    types.push(directive.default)
})

const directivesResolvers = requireDir('../directives/resolvers')
Object.values(directivesResolvers).map(directive => {
    Object.assign(schemaDirectives, directive.default)
})

const { queries, mutations, subscriptions, namedResolvers } = tmpResolvers
export const resolvers = Object.assign(
    {},
    queries,
    mutations,
    subscriptions,
    namedResolvers
)

export const typeDefs = types.join('\n')

export { models }

export { schemaDirectives }
