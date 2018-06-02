export const typeDef = `
    type Dog {
        _id: String!
        name: String!
    }
`

export const query = `
    getDogs: [Dog!]!
`

export const mutation = `
    createDog(name: String!): Dog!
`