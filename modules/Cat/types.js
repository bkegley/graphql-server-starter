export default `
    type Cat {
        _id: ID
        dog: String
    }

    extend type Query {
        getCats: [Cat]
    }

    extend type Mutation {
        createCat: Cat
    }

    extend type Subscription {
        catAdded: Cat
    }
`