const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const {JWT_SECRET = 'dontTell'} = process.env;

const {getUserByUsername, createUser, getUser, getOrdersByUser} = require("../db")
const {requireUser, isAdmin} = require("./utils");

usersRouter.post("/register", async(req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    isAdmin
  } = req.body;

  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user with that username already exists'
      });
    }

    const user = await createUser({
      username,
      password,
      firstName,
      lastName,
      email,
      isAdmin
    })

    const token = jwt.sign({
      id: user.id,
      username
    }, JWT_SECRET, {
      expiresIn: '4w'
    });

    res.sendStatus({
      message: "Thank you for signing up.",
      token,
    })
  } catch ({name, message}) {
    next({name, message});
  }
});

usersRouter.post('/login', async(req, res, next) => {
  const {username, password} = req.body;

  if(!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUser({username, password});
    if(user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({
        message: "You are now logged in!", token, username
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username and/or password is incorrect",
      });
    }
  } catch (error) {
    throw error
  }
})

usersRouter.get("/me", requireUser, async(req, res, next) => {
  try {
    const user = getUser();
    res.send(user);
  } catch(error) {
    throw error
  }
})

module.exports = usersRouter;