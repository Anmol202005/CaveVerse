import http from "http";
import express from "express";
import cors from "cors";
import { Server, LobbyRoom } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { MyRoom } from "./rooms/MyRoom";

// import socialRoutes from "@colyseus/social/express"

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

const server = http.createServer(app);
const gameServer = new Server({
    server,
});

// register room handlers
gameServer.define("LOBBY_ROOM", LobbyRoom);
gameServer.define("PUBLIC_ROOM", MyRoom);
gameServer.define("PRIVATE_ROOM", MyRoom).enableRealtimeListing();

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
if (process.env.NODE_ENV !== "production") {
    app.use("/colyseus", monitor());
}

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
