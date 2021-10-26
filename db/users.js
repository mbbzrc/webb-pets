const client = require("./client");

async function createUser({
  username,
  password,
  firstName,
  lastName,
  email,
  isAdmin,
}) {
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
      [username, password, firstName, lastName, email, isAdmin]
    );

    if (!user) throw new Error("Error creating user!");

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUser({ username }) {
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

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
        SELECT * FROM users
        `);
    delete users.password;

    if (!users.length > 0) {
      throw {
        name: "GetAllUsersError",
        message: "Error fetching all users.",
      };
    }

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById({ id }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT username, "firstName", "lastName", email, "isAdmin"
        FROM users
        WHERE id = $1;
        `,
      [id]
    );

    if (!user) {
      throw {
        name: "GetUserByIdError",
        message: "No user matching this id.",
      };
    }

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser({
  id,
  username,
  password,
  firstName,
  lastName,
  email,
  isAdmin,
}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users 
      SET "username"=$1, "password"=$2, "firstName"=$3, "lastName"=$4, "email"=$5, "isAdmin"=$6
      WHERE id=$7 
      RETURNING *;
      `,
      [username, password, firstName, lastName, email, isAdmin, id]
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
  updateUser,
};
