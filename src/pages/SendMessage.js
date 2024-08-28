import React, { useEffect, useState } from "react";
import { socket } from "../util/socket";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //Send message to that channel
    socket.emit("sendMessage", message);

    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("recentMessage", (newMessage) => {
        setMessages((prevMessages) => {
          return [...prevMessages, newMessage];
        });
      });
    }
    return () => {
      if (socket) {
        socket.off("recentMessage");
      }
    };
  }, []);

  console.log("messages", messages);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write message"
          onChange={(e) => setMessage(e.target.value)}
        />
        &nbsp;
        <button>Submit</button>
      </form>
      <h2>Chat Messages</h2>
      <ul>
        {messages?.map((msg, index) => {
          return (
            <li>
              <li key={index}>{msg}</li>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SendMessage;
