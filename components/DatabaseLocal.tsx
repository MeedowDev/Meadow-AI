import SQLite, { SQLiteDatabase,ResultSet} from 'react-native-sqlite-storage';

export const openDatabase = (): Promise<SQLite.SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Initializing database...');
      const db = SQLite.openDatabase(
        {
          name: 'UserDatabase.db',
          location: 'default',
        },
        // Success callback
        () => {
          console.log('Database opened successfully');
          resolve(db); // Resolve the promise with the db instance
        },
        // Error callback
        (error) => {
          console.error('Error opening database:', error);
          reject(error); // Reject the promise if an error occurs
        }
      );

      if (!db) {
        console.error('Database object is null after openDatabase');
        throw new Error('Database object is null');
      }
    } catch (e) {
      console.error('Exception in openDatabase:', e);
      reject(e);
    }
  });
};
  
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