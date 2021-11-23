import { graphql, buildSchema, GraphQLError, printSchema, printIntrospectionSchema }  from "graphql";


const typeDefs = `
  type Query {
    users: [User]
    hello: String
  }
  type User {
    username: String!
    avatar: String!
  }
`;

const schema = buildSchema(typeDefs)
console.log('schema:', printIntrospectionSchema(schema))

const resolvers = {
  Query: {
    users: () => { return [
      {
        username: "notrab",
      },
      {
        username: "rauchg",
      },
    ]},
    User: {
      avatar: (root) => `https://github.com/${'root.username'}.png`,
    },
  },
  hello: (r) => {console.log(r); return 'helloooo'}
};

// const schema = makeExecutableSchema({ typeDefs, resolvers });

export default async function handler(req, res) {
  const { method, body, query: qs } = req;

  if (method !== "GET" && method !== "POST") {
    return res
      .status(405)
      .setHeader("Allow", "GET,POST")
      .send("Method not allowed");
  }

  // if (!qs.query && method === "GET")
  //   return res.status(400).json({
  //     statusCode: 400,
  //     error: "Bad Request",
  //     message: "GET query missing",
  //   });

  const { query, variables, operationName } = method === "GET" ? qs : body;

  try {
    const result = await graphql({
      schema: schema,
      source: `{ users{ username } hello}
     `,
      rootValue: resolvers,
      contextValue: null,
      variableValues: {'variable': 'value'},
      operationName: null,
      fieldResolver: null,
      typeResolver: null,
    }
    );


    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(new GraphQLError(err.message));
  }
};
