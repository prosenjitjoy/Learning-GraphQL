import { Elysia } from "elysia";
import { apollo } from "@elysiajs/apollo";
import { typeDefs } from "./graphql/schema";
import { Query } from "./resolvers/Query";
import { Category } from "./resolvers/Category";
import { Product } from "./resolvers/Product";
import { Mutation } from "./resolvers/Mutation";
import { db } from "./database/database";

// String, Int, Float, Boolean, ID!

const app = new Elysia()
  .use(
    apollo({
      typeDefs,
      resolvers: {
        Query,
        Category,
        Product,
        Mutation,
      },
      context: async () => {
        return { db };
      },
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
