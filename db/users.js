const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({
  username,
  password,
  firstName,
  lastName,
  email,
  isAdmin,
}) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users( username, password, "firstName", "lastName", email, "isAdmin" )
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `,
      [username, hashedPassword, firstName, lastName, email, isAdmin]
    );
    delete user.password;

    return user;
  } catch (err) {
    throw Error(`Error while creating user: ${err}`);
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE username=$1;
        `,
      [username]
    );

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      throw error;
    }
  } catch (err) {
    throw Error(`Error while getting user: ${err}`);
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
        SELECT * FROM users
        `);
    delete users.password;
    return users;
  } catch (err) {
    throw Error(`Error while getting all users: ${err}`);
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users WHERE id = $1
        `,
      [id]
    );

    delete user.password;
    return user;
  } catch (err) {
    throw Error(`Error while getting user by ID: ${err}`);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE username = $1;
        `,
      [username]
    );
    return user;
  } catch (err) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
