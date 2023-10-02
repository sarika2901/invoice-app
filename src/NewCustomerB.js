import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const NewCustomerB = () => {
  return (
    <Link to="/new-customer">
      <button className="new-customer-btn">+ New Customer</button>
    </Link>
  );
};

export default NewCustomerB;
