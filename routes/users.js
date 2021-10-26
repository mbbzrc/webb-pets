const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { hash, genSalt, compare } = require("bcrypt");

const {
  createUser,
  getUser,
  getAllUsers,
  getOrdersByUser,
  updateUser,
} = require("../db");
const { requireUser, isAdmin } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    isAdmin = false,
  } = req.body;

  try {
    const _user = await getUser({ username });
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that username already exists",
      });
    }

    if (password.length < 8) {
      next({
        name: "PasswordTooShort",
        message: "Password must be more than 8 characters.",
      });
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = await createUser({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "4w",
      }
    );

    res.send({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please provide both a username and password",
    });
  }

  try {
    const user = await getUser({ username });

    if (user) {
      const passwordsMatch = await compare(password, user.password);
      if (passwordsMatch) {
        delete user.password;
      } else {
        next({
          name: "PasswordMatchError",
          message: "Password is incorrect.",
        });
      }

      const token = jwt.sign(user, JWT_SECRET);
      res.send({
        message: "You are now logged in!",
        token,
        user,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username and/or password is incorrect",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const user = getUser();
    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/:userId/orders", isAdmin, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const orders = await getOrdersByUser(userId);
    res.send(orders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.patch("/:userId", isAdmin, async (req, res, next) => {
  const { userId } = req.params;
  const { username, password, firstName, lastName, email, isAdmin } = req.body;
  try {
    const updatedUser = await updateUser({
      userId,
      username,
      password,
      firstName,
      lastName,
      email,
      isAdmin,
    });
    res.send(updatedUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
