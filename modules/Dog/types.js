export default `
    type Dog {
        _id: ID
        cat: String
    }

    extend type Query {
        getDogs: [Dog]
    }

    extend type Mutation {
        createDog: Dog
    }
`