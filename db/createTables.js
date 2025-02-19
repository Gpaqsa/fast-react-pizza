const db = require("./db");

const createTables = async () => {
  try {
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create pizzaMenu table
    await db.query(`
      CREATE TABLE IF NOT EXISTS pizzaMenu (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        ingredients VARCHAR(255) NOT NULL,
        price INT,
        status BOOL,
        max_capacity INT,
        min_capacity INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log("Tables created successfully!");
  } catch (error) {
    console.log("Error creating tables: ", error);
  }
};

// Call the function to create tables
createTables();
