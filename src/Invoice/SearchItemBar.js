import React from "react";
import { useState, useEffect } from "react";

const SearchItemBar = ({ items, onDelete }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (selectedItem && selectedItem.price) {
      setAmount(selectedItem.price * quantity);
    }
  }, [selectedItem, quantity]);

  const handleItemChange = (event) => {
    const selectedItemName = event.target.value;
    const item = items.find((i) => i.name === selectedItemName);
    setSelectedItem(item);
  };

  return (
    <div className="qty-price">
      <div className="drop">
        <select
          className="item-dropdown"
          value={selectedItem.name || ""}
          onChange={handleItemChange}
        >
          <option value="" disabled>
            Select Items
          </option>
          {items.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="qty-input">
        <span className="qty">Qty.</span>
        <input
          type="number"
          className="qtyChange"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
      </div>
      <div className="price">
        {" "}
        Price
        <p>Rs. {selectedItem.price || ""}</p>
      </div>
      <div className="price">
        {" "}
        Amount
        <p> Rs. {amount} </p>
      </div>
      <div className="price">
        <button
          className="fa-solid fa-trash bin-icon"
          onClick={onDelete}
        ></button>
      </div>
    </div>
  );
};

export default SearchItemBar;
