import SQLite, { SQLiteDatabase,ResultSet} from 'react-native-sqlite-storage';

// Enable SQLite debugging
SQLite.enablePromise(true);

const openDatabase = async () => {
    try {
        const db = await SQLite.openDatabase({ name: 'myDatabase.db', location: 'Documents' });
        console.log('Database opened successfully');
        return db;
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

// Call the function to open the database
openDatabase();
  
export const createTable = (db: SQLite.SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => { 
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,  
          contact TEXT,
          location TEXT
        );`,
        [],
        () => {
          console.log('Table created successfully');
          resolve();
        },
        (tx, error) => {
          console.error('Error creating table:', error);
          reject(error);
        }
      );
    },
    (transactionError) => {
      console.error('Transaction error:', transactionError);
      reject(transactionError);
    });
  });
};

// Insert user data into Users table
export const insertUser = (
  db: SQLiteDatabase,
  name: string,
  contact: string,
  location: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Perform a transaction on the database
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Users (name, contact, location) VALUES (?, ?, ?);`,
        [name, contact, location],
        (transaction, results: ResultSet) => {
          console.log('User added successfully');
          resolve(); // Resolve on success
        },
        (transaction, error: any) => {
          console.error('Error inserting user:', error);
          reject(error); // Reject on error
        }
      );
    });
  });
};