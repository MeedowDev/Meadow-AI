import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

// Enable promise-based SQLite transactions
enablePromise(true);

const tableName = 'users';

// User data model
export type User = {
  id: number;
  name: string;
  contact: string;
  location: string;
};

// Get DB connection
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return openDatabase({ name: 'user-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact TEXT NOT NULL,
      location TEXT NOT NULL
    );`;
    await db.executeSql(query);
    console.log('Table created successfully!');
  } catch (error) {
    console.error('Error creating table: ', error);
    throw Error('Failed to create table!');
  }
};


// Get all users from the database
export const getUsers = async (db: SQLiteDatabase): Promise<User[]> => {
  try {
    const users: User[] = [];
    const results = await db.executeSql(`SELECT id, name, contact, location FROM ${tableName}`);

    // Check if the results array is valid and contains rows
    if (results && results.length > 0) {
      const result = results[0]; // Get the first result set (there should only be one)

      if (result && result.rows.length > 0) {
        for (let index = 0; index < result.rows.length; index++) {
          const item = result.rows.item(index);

          // Ensure the item is not null
          if (item) {
            users.push({
              id: item.id,
              name: item.name,
              contact: item.contact,
              location: item.location,
            });
          }
        }
      }
    }
    
    return users;
  } catch (error) {
    console.error('Error getting users: ', error);
    throw new Error('Failed to retrieve users from the database.');
  }
};

// Save a new user to the database
export const saveUser = async (db: SQLiteDatabase, user: User) => {
  const insertQuery = `INSERT INTO ${tableName} (name, contact, location) VALUES (?, ?, ?)`;
  return db.executeSql(insertQuery, [user.name, user.contact, user.location]);
};

// Delete a user from the database
export const deleteUser = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
};

// Drop the users table (for debugging or resetting the database)
export const dropTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  await db.executeSql(query);
};
