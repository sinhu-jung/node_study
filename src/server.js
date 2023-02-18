import http from "http";
import express from "express";
import { Server } from "socket.io";
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

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roonName) => {
    socket.join(roonName);
    socket.to(roonName).emit("welcome");
  });
  socket.on("offer", (offer, roonName) => {
    socket.to(roonName).emit("offer", offer);
  });
  socket.on("answer", (answer, roonName) => {
    socket.to(roonName).emit("answer", answer);
  });
  socket.on("ice", (ice, roonName) => {
    socket.to(roonName).emit("ice", ice);
  });
});

httpServer.listen(3000, handleListen);
