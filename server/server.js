const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let messages = [];
let users = [];
let usersTyping = [];

const addUser = (id, name) => {
  if (!name) return { error: "Username is required" };

  const isExistingUser = users.find(
    (user) => user.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
  if (isExistingUser) return { error: "Username already exists" };

  const user = { id, name };
  users.push(user);
  return { user };
};

io.on("connection", (socket) => {
  socket.on("newUser", ({ name }, callback) => {
    const { error, user } = addUser(socket.id, name);
    if (error) {
      return callback({ error });
    }
    io.emit("users", users);
    callback({ user });
  });

  socket.on("handleMessageChange", ({ user, message }) => {
    const findIndex = usersTyping.findIndex((obj) => obj.user.id == user.id);
    if (findIndex < 0) {
      usersTyping.push({ user, message });
    } else {
      if (message && message !== "") {
        usersTyping[findIndex] = { ...usersTyping[findIndex], message };
      } else {
        usersTyping.splice(findIndex, 1);
      }
    }

    socket.broadcast.emit("usersTyping", usersTyping);
  });

  socket.on("message", ({ user, message }) => {
    const date = new Date().toLocaleString();
    messages = [...messages, { user, message, date }];
    io.emit("messages", { user, message, date });
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    const findIndex = usersTyping.findIndex((obj) => obj.user.id == socket.id);
    usersTyping.splice(findIndex, 1);
    socket.broadcast.emit("userIsTyping", usersTyping);
    io.emit("users", users);
  });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
