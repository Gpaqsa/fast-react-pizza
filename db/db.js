const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost", // MySQL server host
  user: "root", // MySQL username
  password: "my-secret-pw", // MySQL password
  database: "pizzaDb", // Database name
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queueing
});

// Test the connection by acquiring a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the MySQL database");
  connection.release(); // Release the connection back to the pool
});

// Export the pool using the promise-based interface
module.exports = pool.promise();
