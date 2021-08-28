const usersRouter = require("express").Router();

const { createUser, getUserByUsername   } = require("../db/users");

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users...");
    next();
  });

usersRouter.post("/register", async (req, res, next) => {

    try {

    } catch (err) {
        console.error(err)
    }

})




module.exports = usersRouter;