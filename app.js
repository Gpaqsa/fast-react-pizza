const express = require("express");
const app = express();
const PORT =  3307;
const userRouter = require("./routes/userRoutes")
const menuRouter = require("./routes/menuRoutes")
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('/api/users')
})


app.use("/", userRouter)

app.use("/", menuRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
