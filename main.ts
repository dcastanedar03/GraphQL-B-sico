import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./GraphQLschema.ts";
import mongoose from "npm:mongoose@7.6.3";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
    Query,
  },
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);