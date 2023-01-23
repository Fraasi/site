// import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, buildSchema, GraphQLError, printSchema, printIntrospectionSchema } from "graphql";


const typeDefs = `
  type Query {
    users: [User]
  }
  type User {
    username: String
    avatar: String
    id: String
  }
`;

// const schema = makeExecutableSchema({ typeDefs, resolvers });
const schema = buildSchema(typeDefs)

const resolvers = {
  users: (root, args, ctx, info) => {
    console.log('root:', root)
    console.log('args:', args)
    console.log('ctx:', ctx)
    console.log('info:', info)
    return [
      {
        username: 'fraasi',
        avatar: 'aasa'
      },
      {
        username: "rauchg",
        avatar: ''
      },
    ]
  },
  User: {
    id: root => root.username.length,
    avatar: (root, args) => {
      console.log('a-root:', root)
      console.log('a-args:', args)

      return `https://github.com/${root.username}.png`
    },
    username: () => {
      return "notrab"
    }
  },
};



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
      source: `{  users {
        username
        avatar
      } }`,
      rootValue: resolvers,
      // contextValue: resolvers,
      // variableValues: { 'variable': 'value' },
      // operationName: null,
      // fieldResolver: null,
      // typeResolver: null,
    }
    );


    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(new GraphQLError(err.message));
  }
};
