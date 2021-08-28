const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users( username, password )
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `,
      [username, hashedPassword]
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
        SELECT * FROM users WHERE username=$1
        `,
      [username]
    );

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      delete user.password;
      return user;
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
        SELECT * FROM users WHERE username = $1
        `,
      [username]
    );
  } catch (err) {
    throw Error(`Error while getting user by username: ${err}`);
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
