// database methods

// export
module.exports = {
  ...require("./client"),
  ...require("./products"),
  ...require("./orders"),
  ...require("./orderProducts"),
  ...require("./users")
  // db methods
};
