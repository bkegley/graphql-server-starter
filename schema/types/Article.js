export default `
    type Article {
        _id: ID
        title: String
        category: String
        tags: [String]
        description: String
        content: String
        userId: ID
        user: User
        comments: [ArticleComment]
        published: Boolean
        createdAt: Float
        updatedAt: Float
    }

    type ArticleComment implements CommentInterface {
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
        getArticles: [Article]
        getArticleById (_id: ID): Article
    }

    extend type Mutation {
        createArticle(
            title: String
            tags: [String]
            category: String
            content: String
            desciption: String
            userId: ID
        ): Article

        createArticleComment(
            text: String!
            parentResource: ID
            userId: ID
        ): ArticleComment

        deleteArticle(_id: ID): Boolean
    }
`