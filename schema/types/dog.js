export default `
    type Dog {
        _id: String
        name: String
    }

    extend type Query {
        getDogs: [Dog]
        getDogById: Dog
    }

    extend type Mutation {
        createDog(name: String!): Dog!
    }
`