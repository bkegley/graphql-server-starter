require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'
import * as models from './models'

import mongoose from 'mongoose'


// initialize database connection
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME || 'graphql-server'}`)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express()

const PORT = process.env.PORT || 3000

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: models }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})

