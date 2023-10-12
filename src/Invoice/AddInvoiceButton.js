import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const AddInvoiceButton = () => {
  return (
    <Link to="/new-invoice">
      <button className="add-invoice-btn">+ Add Invoice</button>
    </Link>
  );
};

export default AddInvoiceButton;
