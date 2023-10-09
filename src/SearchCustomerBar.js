import React from "react";
import { useState } from "react";
import "./App.css";

const SearchCustomerBar = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const handleChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  return (
    <select
      className="customer-dropdown"
      value={selectedCustomer}
      onChange={handleChange}
    >
      <option value="" disabled>
        Select a customer
      </option>
      {customers.map((customer) => (
        <option key={customer.phone} value={customer.name}>
          {customer.name}
        </option>
      ))}
    </select>
  );
};

export default SearchCustomerBar;
