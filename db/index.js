// database methods

// export
module.exports = {
  ...require("./client"),
  ...require("./users"),
  ...require("./products"),
  ...require("./orders"),
  ...require("./orderProducts"),
  // db methods
};
