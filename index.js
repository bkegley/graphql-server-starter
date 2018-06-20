require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
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

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema, context: {models, req }})))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const server = createServer(app)

server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server,
      path: '/subscriptions'
    })
})