const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");
class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    // Connecting to Database
    this.connectingDB();
    //middlewares
    this.middlewares();
    //router
    this.routes();
  }

  async connectingDB() {
    await dbConnection();
  }

  routes() {
    this.rootPath = "/api";
    this.authPath = "/api/auth"
    this.userPath = "/api/user";
    this.productPath = "/api/product";
    this.app.use(this.userPath, require("./routes/user.routes"));
    this.app.use(this.authPath, require("./routes/auth.routes"));
    this.app.use(this.productPath, require("./routes/products.routes"));
    this.app.use(this.rootPath, require("./routes/general.routes"));
  }

  middlewares() {
    // Public directory
    this.app.use(express.static("public"));
    // CORS
    this.app.use(cors());
    // Reading and parsing of body
    this.app.use(express.json());
    
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`server listening on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
