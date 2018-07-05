export default `
    """
    Enum for controlling CRUD operations
    """
    enum CRUD {
        create
        read
        update
        delete
    }

    """
    An array of Strings defining scope permissions for the user.

    All scopes are defined as \`[operation]:[resource]-[field]\`
    - *operation* is one of create, read, update, delete (CRUD)
    - *resource* is a singular camelCase resource
    - *field* is optional and is a camelCase field name

    For example "read:user" or "read:user-lastName"
    """
    type Scope {
        scope: String
        crudOperation: CRUD!
        resource: String!
        field: String
        createdAt: Float
        updatedAt: Float
    }

    extend type Query {
        getScopes: [Scope!]
        getScopeById(_id: String): Scope!
    }

    extend type Mutation {
        createScope(
            crudOperation: String!
            resource: String!
            field: String
        ): Scope!
    }
`