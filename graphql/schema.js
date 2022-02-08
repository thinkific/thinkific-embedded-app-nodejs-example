const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Task {
    _id: ID!
    description: String!
    userId: ID!
  }

  input TaskInput {
    description: String!
    userId: ID!
  }

  type RootQuery {
    task(id: ID!): Task!
    tasks(userId: ID!): [Task]!
  }

  type RootMutation {
    addTask(input: TaskInput!): Task!
    deleteTask(id: ID!): Task!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
