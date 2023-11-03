import { useState } from "react";
import "./App.css";
import ChatInterface from "./components/ChatInterface";

function App() {
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div className="App">
      {!chatVisible ? (
        <div className="centered">
          <button onClick={toggleChat}>Let's Chat</button>
        </div>
      ) : (
        <ChatInterface onClose={toggleChat} />
      )}
    </div>
  );
}

export default App;
