export default `
    type Article {
        _id: ID
        title: String
        category: String
        tags: [String]
        description: String
        content: String
        user: ID
        published: Boolean
        createdAt: String
        updatedAt: String
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
            user: ID
        ): Article

        deleteArticle(_id: ID): Boolean
    }
`