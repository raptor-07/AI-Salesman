import { useLocation } from 'react-router-dom';
import InventoryItem from "./inventoryItem";

function Buyer() {
  const location = useLocation();
  const items = location.state.items;

  return (
    <div>
        <h1>Discovery</h1>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="inventory-item-card">
            <InventoryItem item={item} />
            <button className="chat-button">Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buyer;