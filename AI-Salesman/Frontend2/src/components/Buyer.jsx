import InventoryItem from "./inventoryItem";
import { useLocation } from "react-router-dom";

const Buyer = () => {
  const location = useLocation();
  const items = location.state.items;
  // const handleChatButtonClick = () => {
  //   const extensionId = "dkggbiighkonkpfoboifonjmpbbfgcck"; // Replace with the actual extension ID
  
  //   // Check if the extension is installed
  //   if (chrome.runtime.sendMessage) {
  //     // Send a message to the extension
  //     try {
  //       chrome.runtime.sendMessage(extensionId, { action: "openPopup" });
  //     } catch (error) {
  //       console.error("Error while sending message to the extension:", error);
  //     }
  //   } else {
  //     console.error("The sendMessage method is not available.");
  //   }
  // };

  const handleChatButtonClick = () => {
    const extensionId = "apjnchckacmnnlbebahngbjjokigkpfh"; // Replace with the actual extension ID
  
    // Check if the extension is installed
    // if (chrome.runtime.sendMessage) {
    //   // Send a message to the extension to request opening the popup
    //   try {
        chrome.runtime.sendMessage(extensionId, { action: "openPopup" });
    //   } catch (error) {
    //     console.error("Error while sending message to the extension:", error);
    //   }
    // } else {
    //   console.error("The sendMessage method is not available.");
    // }
  };
  

  return (
    <div>
      <h1>Discovery</h1>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="inventory-item-card">
            <InventoryItem item={item} />
            <button className="chat-button" onClick={handleChatButtonClick}>
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buyer;
