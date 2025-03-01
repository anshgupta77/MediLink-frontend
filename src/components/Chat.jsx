import React, { useEffect, useState } from "react";
import socket from "../socket"; // Import socket instance
import axios from "axios";

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(""); // Chat partner's ID
    console.log(userId);
  // 🟢 Fetch old messages when receiverId changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return; // Don't fetch if receiver ID is empty

      try {
        const { data } = await axios.get(`http://localhost:5000/api/chat/getAllMessages/${userId}/${receiverId}`);
        setMessages(data); // Store previous chat messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [receiverId]); // Runs when receiverId changes

  // 🟢 Connect to WebSocket on component mount
  useEffect(() => {
    socket.connect();
    socket.emit("userOnline", userId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // 📨 Send Message
  const sendMessage = async () => {
    if (!newMessage.trim() || !receiverId) return;

    const messageData = {
      senderId: userId,
      receiverId,
      message: newMessage,
    };

    // Emit real-time message
    socket.emit("sendMessage", messageData);

    // Save message in database
    try {
      await axios.post("http://localhost:5000/api/chat/sendMessage", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage(""); // Clear input field
  };

  return (
    <div>
      <h2>Chat</h2>

      {/* Select User to Chat With */}
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />

      {/* Chat History */}
      <div style={{ border: "1px solid #ddd", height: "200px", overflowY: "auto", margin: "10px 0" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderId}:</strong> {msg.message}
          </p>
        ))}
      </div>

      {/* Message Input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;