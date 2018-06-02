export const typeDef = `
    type Cat {
        _id: String!
        name: String!
    }
`

export const query = `
    getCats: [Cat!]!
    getCatById(_id: String!): Cat!
`

export const mutation = `
    createCat(name: String!): Cat!
`