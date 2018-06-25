export default `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        scope: [Scope]
        comments: [Comment]
        createdAt: Float
        updatedAt: Float
    }

    extend type Query {
        getUsers: [User]
        getUserById(_id: ID): User
    }

    extend type Mutation {
        createUser(
            firstName: String
            lastName: String
            email: String
        ): User
        deleteUser(_id: ID): Boolean
    }
`