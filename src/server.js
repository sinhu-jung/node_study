import http from "http";
import express from "express";
import WebSocket from "ws";
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";

const app = express();

const liveServer = livereload.createServer({
  exts: ["js", "pug", "css"],
  delay: 1000,
});

liveServer.watch(__dirname);

app.use(livereloadMiddleware());

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.get("/", (req, res) => res.render("home"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", () => console.log("DisConnected from the Browser"));
  socket.on("message", (message) => {
    console.log(message.toString("utf-8"));
  });
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
