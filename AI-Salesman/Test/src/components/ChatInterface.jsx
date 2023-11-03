import { useState, useEffect, useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import "./ChatInterface.css";

const AI = "ai";
const USER = "user";
const CHAT_MESSAGES = "chatMessages";
const API_URL = "http://localhost:5000/chat";

function ChatInterface({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", sender: AI },
    {
      text: "I'm looking for a new laptop. Can you help me choose one?",
      sender: USER,
    },
    { text: "Of course! What's your budget?", sender: AI },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [cookies, setCookie] = useCookies([CHAT_MESSAGES]);

  useEffect(() => {
    if (cookies[CHAT_MESSAGES]) {
      setMessages(cookies[CHAT_MESSAGES]);
    }
  }, [cookies]);

  const sendMessageToApi = async (message, url) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, url }),
      });

      return await response.json();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (messageInput.trim() !== "") {
      const newMessage = { text: messageInput, sender: USER };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setCookie(CHAT_MESSAGES, newMessages, { path: "/" });
      setMessageInput("");

      const tabUrl = window.location.href;
      const data = await sendMessageToApi(messageInput, tabUrl);

      if (data && data.message) {
        const aiMessage = { text: data.message, sender: AI };
        const updatedMessages = [...newMessages, aiMessage];
        setMessages(updatedMessages);
        setCookie(CHAT_MESSAGES, updatedMessages, { path: "/" });
      }
    }
  }, [messageInput, messages, setCookie]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessages = useMemo(() => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`message ${message.sender === USER ? "sent" : "received"}`}>
        {message.text}
      </div>
    ));
  }, [messages]);

  return (
    <div className="chat-interface">
      <button onClick={onClose}>Close Chat</button>
      <div className="chat-messages">{renderMessages}</div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
