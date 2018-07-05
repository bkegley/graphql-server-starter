import { createError } from 'apollo-errors'

export const AuthenticationError = createError('AuthenticationError', {
    message: 'Please authenticate with a token to view this resource.'
})

export const AuthorizationError = createError('AuthorizationError', {
    message: 'Not authorized for this resource.'
})

export const DatabaseError = createError('DatabaseError', {
    message: 'There was an error saving the document to the database.'
})