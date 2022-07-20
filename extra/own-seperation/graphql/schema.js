const { buildSchema } = require("graphql");
const schema1 = require("./schemas/schema1");
const schema2 = require("./schemas/schema2");
const schema3 = require("./schemas/schema3");
const schema4 = require("./schemas/schema4");

module.exports = buildSchema(`
  ${schema1.schema}
  ${schema2.schema}
  ${schema3.schema}
  ${schema4.schema}
  
  type RootQuery{
    ${schema1.query}
    ${schema2.query}
    ${schema3.query}
    ${schema4.query}
  }
  
  type RootMutation{
    ${schema1.mutation}
    ${schema2.mutation}
    ${schema3.mutation}
    ${schema4.mutation}
  }

  schema{
    query: RootQuery
    mutation: RootMutation
  }
`);
