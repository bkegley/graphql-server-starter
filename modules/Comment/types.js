export default `
    interface CommentInterface {
        _id: ID
        text: String
        userId: ID
        user: User
        parentResource: ID
        comments: [Comment!]
        createdAt: Float
        updatedAt: Float
    }

    type Comment implements CommentInterface {
        _id: ID
        text: String
        userId: ID
        user: User
        parentResource: ID
        comments: [Comment!]
        createdAt: Float
        updatedAt: Float
    }

    extend type Query {
        getComments(
            userId: ID
            parentResource: ID
        ): [CommentInterface!]
    }

    extend type Mutation {
        createComment(
            text: String
            userId: ID
            parentResource: ID
        ): Comment!
    }
`