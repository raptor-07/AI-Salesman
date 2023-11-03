import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Inventory.css";
import InventoryItem from "./inventoryItem";

function Inventory() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Item 1",
      category: "Category 1",
      price: "100",
      lowTarget: "90",
      highTarget: "110",
      description: "This is a description for Item 1",
    },
    {
      id: 2,
      title: "Item 2",
      category: "Category 2",
      price: "200",
      lowTarget: "180",
      highTarget: "220",
      description: "This is a description for Item 2",
    },])  
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    lowTarget: "",
    highTarget: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveProduct = () => {
    if (editProduct) {
      // Update existing product
      const updatedItems = items.map((item) =>
        item.id === editProduct.id ? { ...item, ...product } : item
      );
      setItems(updatedItems);
      setEditProduct(null);
    } else {
      // Add new product
      const newItem = {
        id: items.length + 1,
        ...product,
      };
      setItems([...items, newItem]);
    }
    setProduct({
      title: "",
      category: "",
      price: "",
      lowTarget: "",
      highTarget: "",
      description: "",
    });
    setShowProductForm(false);
  };

  const handleBuyerClick = () => {
    navigate('/buyer', { state: { items } });
  };

  return (
    <div className="inventory-container">
      <div className="card">
        <h1>Inventory</h1>
        <button className="add-button" onClick={() => setShowProductForm(true)}>
          Add Product
        </button>
        <div className="buyer-button-container">
  <button className="buyer-button" onClick={handleBuyerClick}>
    Buyer
  </button>
</div>
        {showProductForm && (
          <div className="input-fields">
            <div className="input-field">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="lowTarget">Low Target:</label>
              <input
                type="text"
                id="lowTarget"
                name="lowTarget"
                value={product.lowTarget}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="highTarget">High Target:</label>
              <input
                type="text"
                id="highTarget"
                name="highTarget"
                value={product.highTarget}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <button className="save-button" onClick={handleSaveProduct}>
              {editProduct ? "Update" : "Save"}
            </button>
          </div>
        )}
      </div>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="inventory-item-card">
            <InventoryItem item={item} />
            <button
              className="edit-button"
              onClick={() => {
                setProduct(item);
                setEditProduct(item);
                setShowProductForm(true);
              }}
            >
              Edit
            </button>
            <button className="chat-button">Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;