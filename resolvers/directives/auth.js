require('dotenv').config()
import jwt from 'jsonwebtoken'
import { defaultFieldResolver } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { AuthenticationError, AuthorizationError } from '../errors'

class AuthenticationDirective extends SchemaDirectiveVisitor {
    resolve(field) {
        const {resolve = defaultFieldResolver } = field
        field.resolve = async function(...args) {
            const context = args[2]
            
            if (process.env.AUTH_REQUIRED == 'false') {
                const result = await resolve.apply(this, args)
                return result
            }
    
            const token = context.req.headers.authorization
            if (!token) {
                throw new AuthenticationError({
                    data: {
                        field: field.name,
                        errorMessage: `You must authenticate with a token to view the resource: "${field.name}"`
                    }
                })
            }
            try {
                  const decoded = jwt.verify(
                    token.replace('Bearer ', ''),
                    process.env.JWT_SECRET
                  )
                  context.user = decoded.user
    
                const result = await resolve.apply(this, args)
                return result
            } catch (err) {
                throw new AuthenticationError({
                    data: {
                        field: field.name,
                        errorMessage: `There was an error validating your token on resource: "${field.name}"`
                    }
                })
            }
        }
    }
    visitFieldDefinition(field) {
        this.resolve(field)
    }
    visitObject(object) {
        Object.keys(object.getFields()).map( (fieldName) => {
            const field = object.getFields()[fieldName]
            this.resolve(field)
        })
    }
}

class AuthorizationDirective extends SchemaDirectiveVisitor {
    resolve(field) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async function(...args) {
            const context = args[2]

            if (process.env.AUTH_REQUIRED == 'false') {
                const result = await resolve.apply(this, args)
                return result
            }

            const token = context.req.headers.authorization
            const expectedScopes = args.scope
    
            if (!token) {
                throw new AuthenticationError({
                    data: {
                        field: field.name,
                        errorMessage: `You must authenticate with a token to view the resource: "${field.name}"`
                    }
                })
            }
            try {
                const decoded = jwt.verify(
                    token.replace('Bearer ', ''),
                    process.env.JWT_SECRET
                )
                await context.models.User.findOne({"applicationCredentials.userId": decoded.user.id})
                    .then(user => {
                        const scopes = user.scope
                        if (expectedScopes.some(scope => scopes.indexOf(scope) !== -1)) {
                            return resolve.apply(this, args)
                        } else {
                            return Promise.reject(
                                new AuthorizationError({
                                    data: {
                                        field: field.name,
                                        errorMessage: `You are not authorized to view this resource. Expected scopes: ${expectedScopes.join(
                                            ', '
                                        )}`
                                    }
                                })
                            )
                        }
                    }).catch(err => {
                        return Promise.reject(
                            new AuthorizationError({
                                data: {
                                    field: field.name,
                                    errorMessage: `You are not authorized to view this resource. Expected scopes: ${expectedScopes.join(
                                        ', '
                                    )}`
                                }
                            })
                        )
                    })
                    return next()
            } catch (err) {
                return Promise.reject(
                    new AuthorizationError({
                        data: {
                            errorMessage: `You are not authorized to view this resource. Expected scopes: ${expectedScopes.join(
                            ', '
                        )}`
                    }
                    })
                )
            }
        }
    }
    visitFieldDefinition(field) {
        this.resolve(field)
    }
    visitObject(object) {
        Object.keys(object.getFields()).map( (fieldName) => {
            const field = object.getFields()[fieldName]
            this.resolve(field)
        })
    }
}

export default {
    isAuthenticated: AuthenticationDirective,
    hasScope: AuthorizationDirective
}