const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { ApolloServer, gql } = require("apollo-server-express");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");


const MONGO_URI =
  "mongodb+srv://admin:admin12345@cluster0.pzm0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

async function initServer() {
  const app = express();

  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/reservations", require("./routes/reservations"));
  app.use("/halls", require("./routes/halls"));
  app.use("/movies", require("./routes/movies"));

  const server = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({
    schema: schema,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = 80;

  server.listen(PORT, function () {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: server,
        path: "/graphql",
      }
    );
    console.log(`server running on port ${PORT}`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
  });
}

initServer();
