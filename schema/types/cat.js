export default `
    type Cat {
        _id: String!
        name: String!
}
    extend type Query {
        getCats: [Cat]
        getCatById(_id: String!): Cat
    }

    extend type Mutation {
        createCat(name: String!): Cat!
    }
`