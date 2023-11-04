import "./InventoryItem.css";

function InventoryItem({ item, showTargets = true }) {
  return (
    <div className="inventory-item-card">
      <div className="item-details">
        <h3 className="item-title">Title: {item.title}</h3>
        <p className="item-category">Category: {item.category}</p>
        <div className="item-price">
          <span className="label">Price:</span> ₹ {item.price}
        </div>
        {showTargets && (
          <div className="item-targets">
            <span className="label">Low Target:</span> ₹ {item.lowTarget}
            <span className="label"> High Target:</span> ₹ {item.highTarget}
          </div>
        )}
        <p className="item-description">
          <span className="label">Description:</span> {item.description}
        </p>
      </div>
    </div>
  );
}

export default InventoryItem;
