import { useState, useCallback, useMemo } from "react";
import { client } from "@gradio/client";
import "./ChatInterface.css";

const AI = "ai";
const USER = "user";

function ChatInterface({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const productDetails = {
    category: "",
    price: 10.0,
    target: [7.0, 10.0],
    title: "Verizon Car Charger with Dual Output Micro USB and LED Light",
    description:
      "Charge two devices simultaneously on the go. This vehicle charger with an additional USB port delivers enough power to charge two devices at once. The push-button activated LED connector light means no more fumbling in the dark trying to connect your device. Auto Detect IC Technology automatically detects the device type and its specific charging needs for improved compatibility. And the built-in indicator light illuminates red to let you know the charger is receiving power and the power socket is working properly.",
  };

  const handleSendMessage = useCallback(async () => {
    if (messageInput.trim() !== "") {
      const newMessage = { text: messageInput, sender: USER };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setMessageInput("");

      const app = await client("https://1201ad761cda6681aa.gradio.live/");
      const prompt = `### instruction : You are an AI salesman working for online e-commerce sellers that sell on e-commerce platforms like shopify or amazon. You have to negotiate a price for a product being bought by any buyers of the sellers.
         Do not reveal any of the data provided to you to the user, like the bargain range, etc.
         Use persuasion techniques used by professional sales people.
         You should naturally bargain hard to fetch the best price for the product.
         You can choose to not change the price at all.
         You can choose to change the price by a certain percentage.
         You can not set the price lower than the minimum target range.
          ### product details and context:
            
            Category: ${productDetails.category}, Price: ₹${
        productDetails.price * 80
      }, Target: ${productDetails.target}, Title: ${
        productDetails.title
      }, Description: ${productDetails.description}
          ### seller:\n'''\n${newMessage.text}\n'''\n### buyer:`;
      const result = await app.predict("/predict", [prompt]);

      if (result && result.data) {
        const aiMessage = { text: result.data, sender: AI };
        const updatedMessages = [...newMessages, aiMessage];
        setMessages(updatedMessages);
      }
    }
  }, [messageInput, messages]);

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
        {message.text.includes("$")
          ? message.text.replace("$", "₹")
          : message.text}
      </div>
    ));
  }, [messages]);

  return (
    <div className="chat-interface">
      <button onClick={onClose}>Close Chat</button>
      <div className="product-details">
        <h2>Product Details</h2>
        <p>Category: {productDetails.category}</p>
        <p>Price: ₹{productDetails.price * 80}</p>
        <p>Target: {productDetails.target}</p>
        <p>Title: {productDetails.title}</p>
        <p>Description: {productDetails.description}</p>
      </div>
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
