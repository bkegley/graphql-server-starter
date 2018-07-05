import { DatabaseError } from '../../utils/errors'

export const queries = {
    getScopes: async (parent, args, { models }) => {
        const { Scope } = models
        const scope = await Scope.find(args)
        return scope
    }
}

export const mutations = {
    createScope: async (parent, args, { models }) => {

        // https://stackoverflow.com/a/15829686
        String.prototype.toCamelCase = function() {
            return this.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
                if (p2) return p2.toUpperCase()
                return p1.toLowerCase();       
            })
        }
        const { Scope } = models
        
        const acceptedCrudOperations = ['create', 'read', 'update', 'delete']
        
        const name = `${args.crudOperation}:${args.resource.toCamelCase()}${args.field ? '-' + args.field.toCamelCase() : ''}`
        const scopeOfSameName = await Scope.find({ scope: name })

        if ( !acceptedCrudOperations.find(operation => operation === args.crudOperation) ) {
            throw new DatabaseError({
                data: {
                    errorMessage: `Please enter a valid CRUD operation (create, read, update, delete).`
                }
            })
        } else if (scopeOfSameName.length != 0) {
            throw new DatabaseError({
                data: {
                    errorMessage: `This scope already exists - ${name}`
                }
            })
        }
        Object.keys(args).map(key => args[key] = args[key].toCamelCase())
        const scope = await new Scope(Object.assign({ scope: name }, args)).save()
        return scope
    }
}