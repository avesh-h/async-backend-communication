import { io } from "socket.io-client";

export let socket;

export const connectToSocket = (query) => {
  if (!socket) {
    let serverToConnect;

    if (query?.server === "serverA") {
      serverToConnect =
        process.env.REACT_APP_SERVER_A || "http://localhost:3001";
    } else if (query?.server === "serverB") {
      serverToConnect =
        process.env.REACT_APP_SERVER_B || "http://localhost:3002";
    } else {
      serverToConnect =
        process.env.REACT_APP_SERVER_C || "http://localhost:3003";
    }

    socket = io(serverToConnect, {
      query: query,
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server", socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log("Disconnect from server", socket.id); // undefined
    });

    socket.connect(); // Manually connect the socket
  }

  return socket;
};
