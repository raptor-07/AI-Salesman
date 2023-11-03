import { useState } from "react";
import "./App.css";
import ChatInterface from "./components/ChatInterface";

function App() {
  const product1 = ` Category: phone, Price: 10.0,Target: [7.0, 10.0], Title: Verizon Car Charger with Dual Output Micro USB and LED Light, Description: Charge two devices simultaneously on the go. This vehicle charger with an additional USB port delivers enough power to charge two devices at once. The push-button activated LED connector light means no more fumbling in the dark trying to connect your device. Auto Detect IC Technology automatically detects the device type and its specific charging needs for improved compatibility. And the built-in indicator light illuminates red to let you know the charger is receiving power and the power socket is working properl`;
  const product2 = ` Category: Shoe, Price: 10.0,Target: [6.0, 10.0], Title: JQR Kick 2 Sports, Running,Walking, Gym, Training Shoes for Men|Stylish, Breathable,Lightweight,Comfortable, Description: AEROFOAM technology makes the shoe - exceptionally light,reduces fatigue and enhances endurance,gives a sense of freedom and agility.
  HYPERBOUNZE technology provides unparalleled energy with every step.
  The internal cushioning is made of premium materials,reduces the risk of injury.
  The premium materials offer outstanding comfort and support.
  The cushioning allows for focusing on performance.`;

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
