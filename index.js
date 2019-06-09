const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");

// Create server
const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

/**
 *  Up the server and connect to MongoDB
 */
server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on("error", () => console.log(error));

db.once("open", () => {
  require("./routes/customers")(server);
  console.log(`Server started on port ${config.PORT}`);
});
