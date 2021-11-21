// export default async function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
// import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLError }  from "graphql";
// import pkg  from 'graphql.js';
// const { graphql, GraphQLError } = pkg

// import pkg from 'graphql';
// const { parse, GraphQLError, isNonNullType, valueFromAST, print, isObjectType, isListType, isSpecifiedDirective, astFromValue, isSpecifiedScalarType, isIntrospectionType, isInterfaceType, isUnionType, isInputObjectType, isEnumType, isScalarType, GraphQLDeprecatedDirective, specifiedRules, concatAST, validate, versionInfo, buildClientSchema, visit, TokenKind, Source, isTypeSystemDefinitionNode, getNamedType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLInterfaceType, GraphQLInputObjectType, GraphQLDirective, GraphQLUnionType, GraphQLEnumType, GraphQLScalarType, isNamedType, getNullableType, isLeafType, GraphQLSchema, isDirective, isCompositeType, doTypesOverlap, getOperationAST, getDirectiveValues, GraphQLSkipDirective, GraphQLIncludeDirective, typeFromAST, isAbstractType, getOperationRootType, TypeNameMetaFieldDef, buildASTSchema } = pkg;

const typeDefs = `
  type Query {
    users: [User]
  }

  type User {
    username: String!
    avatar: String!
  }
`;

const resolvers = {
  Query: {
    users: () => [
      {
        username: "notrab",
      },
      {
        username: "rauchg",
      },
    ],
  },
  User: {
    avatar: (root) => `https://github.com/${root.username}.png`,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default async function handler(req, res) {
  const { method, body, query: qs } = req;

  if (method !== "GET" && method !== "POST") {
    return res
      .status(405)
      .setHeader("Allow", "GET,POST")
      .send("Method not allowed");
  }

  if (!qs.query && method === "GET")
    return res.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message: "GET query missing",
    });

  const { query, variables, operationName } = method === "GET" ? qs : body;

  try {
    const result = await graphql(
      schema,
      query,
      null,
      null,
      variables,
      operationName
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(new GraphQLError(err.message));
  }
};
