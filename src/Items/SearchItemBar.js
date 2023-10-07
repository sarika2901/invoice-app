import React from "react";
import { useState } from "react";

const SearchItemBar = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemPrice, setSelectedItemPrice] = useState(null);

  const handleChange = (event) => {
    const selectedItemName = event.target.value;
    setSelectedItem(selectedItemName);

    const selectedPrice = items.find(
      (item) => item.name === selectedItemName
    )?.price;

    setSelectedItemPrice(selectedPrice);
  };

  return (
    <div className="qty-price">
      <select
        className="customer-dropdown"
        value={selectedItem}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select
        </option>
        {items.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="text">
        Price:{" "}
        {selectedItemPrice !== null ? `Rs.${selectedItemPrice}` : "Select Item"}
      </span>
    </div>
  );
};

export default SearchItemBar;
