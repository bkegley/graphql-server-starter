import fs from 'fs'

// base path without the trailing '/'
const basePath = ('.')

const parseModules = (
    dir,
    models = {},
    tmpResolvers = {
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
        namedResolvers: {}
    },
    types = [`
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
) => {
    fs.readdirSync(dir).map(name => {
        if (fs.statSync(`${dir}/${name}`).isDirectory()) {
            parseModules(`${dir}/${name}`, models, tmpResolvers, types)
        } else {
            const moduleName = dir
                .replace(`${basePath}/modules/`,'')
                .split('/').map(dir => `${dir[0].toUpperCase()}${dir.slice(1)}`)
                .join('')
            name.includes('model') ? parseModel(name, dir, models, moduleName)
            : name.includes('resolvers') ? parseResolvers(name, dir, tmpResolvers)
            : name.includes('types') ? parseTypes(name, dir, types)
            : console.log(`did not recognize ${name} on path of ${dir}`)
        }
    })

    const { queries, mutations, subscriptions, namedResolvers } = tmpResolvers
    const resolvers = Object.assign(
        {},
        queries,
        mutations,
        subscriptions,
        namedResolvers
    )

    const moduleTypeDefs = types.join('\n')
    
    return {
        models,
        resolvers,
        moduleTypeDefs
    }
}

const parseModel = (name, dir, models, moduleName) => {
    const modelExport = require(`.${dir}/${name}`)
    modelExport.default ? Object.assign(models, { [moduleName] :modelExport.default }) : console.warn(`Please export model in .${dir}/${name} as default`)
}

const parseResolvers = (name, dir, tmpResolvers) => {
    const resolverExports = require(`.${dir}/${name}`)
    Object.assign(tmpResolvers.queries.Query, resolverExports.queries)
    Object.assign(tmpResolvers.mutations.Mutation, resolverExports.mutations)
    Object.assign(tmpResolvers.subscriptions.Subscription, resolverExports.subscriptions)
    const { queries, mutations, subscriptions, ...namedResolvers } = resolverExports
    Object.keys(namedResolvers).map(key => {
        const resolver = namedResolvers[key]
        if (resolver !== null && typeof resolver === 'object') Object.assign(tmpResolvers.namedResolvers, {[key]: resolver})
    })
    
}

const parseTypes = (name, dir, types) => {
    const typesExports = require(`.${dir}/${name}`)
    typesExports.default ? types = types.push(typesExports.default) : console.warn(`Please export Types in ${dir}/${name} as default`)
}

const parseDirectives = (
    dir,
    types = [],
    schemaDirectives = {}
) => {
    fs.readdirSync(dir).map(name => {
        if (fs.statSync(`${dir}/${name}`).isDirectory()) {
            return parseDirectives(`${dir}/${name}`, types, schemaDirectives)
        } else {
            const fileExports = require(`.${dir}/${name}`)
            Object.keys(fileExports).map(key => {
                const moduleExport = fileExports[key]
                moduleExport !== null && typeof moduleExport === 'object' ? Object.assign(schemaDirectives, moduleExport)
                : typeof moduleExport === 'string' ? types.push(moduleExport)
                : console.log(`did not recognize ${name} on path of ${dir}`)
            })
        }
    })

    const directiveTypeDefs = types.join('\n')
    return {
        schemaDirectives,
        directiveTypeDefs
    }
}

const parseAll = (modulePath, directivePath) => {
    const { models, moduleTypeDefs, resolvers } = parseModules(modulePath)
    const { schemaDirectives, directiveTypeDefs } = parseDirectives(directivePath)
    const typeDefs = moduleTypeDefs.concat(`\n${directiveTypeDefs}`)

    return {
        models,
        resolvers,
        typeDefs,
        schemaDirectives
    }
}

const { models, resolvers, typeDefs, schemaDirectives } = parseAll('./modules', './directives')

export {
    models,
    resolvers,
    typeDefs,
    schemaDirectives
}