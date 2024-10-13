import * as SQLite from "expo-sqlite";

/**
 * Opens the SQLite database.
 *
 * @param {string} dbName - The name of the database file.
 * @returns {Promise<SQLite.SQLiteDatabase>} - The opened database instance.
 */
function openDatabase(dbName: string): Promise<SQLite.SQLiteDatabase> {
	return SQLite.openDatabaseAsync(dbName);
}

/**
 * Adds a new column to an existing table in the database.
 *
 * @param {string} dbName - The name of the database file.
 * @param {string} tableName - The name of the table to alter.
 * @param {string} columnDefinition - The definition of the column to add (e.g., "newColumn TEXT").
 * @throws {Error} If the database operation fails.
 */
async function addColumn(dbName: string, tableName: string, columnDefinition: string): Promise<void> {
	const db = await openDatabase(dbName);
	const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition};`;
	try {
		await db.execAsync(sql);
		console.log(`Column added to ${tableName}: ${columnDefinition}`);
	} catch (error) {
		console.error(`Error adding column to ${tableName}:`, error);
		throw new Error(`Failed to add column: ${error.message}`);
	}
}

/**
 * Renames a table in the database.
 *
 * @param {string} dbName - The name of the database file.
 * @param {string} oldTableName - The current name of the table.
 * @param {string} newTableName - The new name for the table.
 * @throws {Error} If the database operation fails.
 */
async function renameTable(dbName: string, oldTableName: string, newTableName: string): Promise<void> {
	const db = await openDatabase(dbName);
	const sql = `ALTER TABLE ${oldTableName} RENAME TO ${newTableName};`;
	try {
		await db.execAsync(sql);
		console.log(`Table renamed from ${oldTableName} to ${newTableName}`);
	} catch (error) {
		console.error(`Error renaming table ${oldTableName}:`, error);
		throw new Error(`Failed to rename table: ${error.message}`);
	}
}

/**
 * Removes a column from an existing table in the database.
 * Note: SQLite does not support dropping columns directly, so this will involve creating a new table.
 *
 * @param {string} dbName - The name of the database file.
 * @param {string} tableName - The name of the table to alter.
 * @param {string} columnName - The name of the column to remove.
 * @throws {Error} If the database operation fails.
 */
async function removeColumn(dbName: string, tableName: string, columnName: string): Promise<void> {
	const db = await openDatabase(dbName);
	try {
		// Get the existing columns
		const columnsResult = await db.execAsync(`PRAGMA table_info(${tableName});`);
		const columns = columnsResult.rows._array;

		// Build new table columns without the specified column
		const newColumns = columns
			.filter((col: any) => col.name !== columnName)
			.map((col: any) => `${col.name} ${col.type}`)
			.join(", ");

		// Create a new table
		const newTableName = `${tableName}_new`;
		await db.execAsync(`CREATE TABLE ${newTableName} (${newColumns});`);

		// Copy data to the new table
		await db.execAsync(`INSERT INTO ${newTableName} (${newColumns}) SELECT ${newColumns} FROM ${tableName};`);

		// Drop the old table
		await db.execAsync(`DROP TABLE ${tableName};`);

		// Rename the new table to the original table name
		await db.execAsync(`ALTER TABLE ${newTableName} RENAME TO ${tableName};`);

		console.log(`Column ${columnName} removed from ${tableName}`);
	} catch (error) {
		console.error(`Error removing column ${columnName} from ${tableName}:`, error);
		throw new Error(`Failed to remove column: ${error.message}`);
	}
}

/**
 * Creates a new table in the database.
 *
 * @param {string} dbName - The name of the database file.
 * @param {string} tableDefinition - The SQL definition for the new table (e.g., "CREATE TABLE ...").
 * @throws {Error} If the database operation fails.
 */
async function createTable(dbName: string, tableDefinition: string): Promise<void> {
	const db = await openDatabase(dbName);
	try {
		await db.execAsync(tableDefinition);
		console.log(`Table created: ${tableDefinition}`);
	} catch (error) {
		console.error(`Error creating table:`, error);
		throw new Error(`Failed to create table: ${error.message}`);
	}
}

/**
 * Drops a table from the database.
 *
 * @param {string} dbName - The name of the database file.
 * @param {string} tableName - The name of the table to drop.
 * @throws {Error} If the database operation fails.
 */
async function dropTable(dbName: string, tableName: string): Promise<void> {
	const db = await openDatabase(dbName);
	try {
		const sql = `DROP TABLE IF EXISTS ${tableName};`;
		await db.execAsync(sql);
		console.log(`Table ${tableName} dropped successfully.`);
	} catch (error) {
		console.error(`Error dropping table ${tableName}:`, error);
		throw new Error(`Failed to drop table: ${error.message}`);
	}
}

export { openDatabase, addColumn, renameTable, removeColumn, createTable, dropTable };
