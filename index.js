require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(expressEjsLayouts);

app.set("view engine", "ejs");

app.set("layout", "layouts/layout");

app.get("/", (req, res) => {
  const users = [
    {
      id: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      age: 30,
      isActive: true,
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane.smith@example.com",
      age: 25,
      isActive: false,
    },
    {
      id: 3,
      username: "bob_jones",
      email: "bob.jones@example.com",
      age: 35,
      isActive: true,
    },
  ];
  res.render("home", { users });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => console.log(`server is running on port ${port}`));
