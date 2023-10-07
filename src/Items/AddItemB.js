import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const AddItemB = () => {
  return (
    <Link to="/new-item">
      <button className="add-item-btn">+ Add Item</button>
    </Link>
  );
};

export default AddItemB;
