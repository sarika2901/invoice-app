import React, { useState, useEffect } from "react";
import "../App.css";
import SearchCustomerBar from "./SearchCustomerBar";
import SearchItemBar from "./SearchItemBar";

const NewInvoicePage = ({ customers, items }) => {
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [LineItems, setLineItems] = useState([{ name: "", qty: 1, price: 0 }]);

  const addNewItem = () => {
    setLineItems((prevItems) => [...prevItems, { name: "", qty: 1, price: 0 }]);
  };

  const handleDelete = (indexToRemove) => {
    setLineItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleItemUpdate = (index, updatedItem) => {
    setLineItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = updatedItem;
      return newItems;
    });
  };

  useEffect(() => {
    const newTotal = LineItems.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    setTotalAmount(newTotal);
  }, [LineItems]);

  return (
    <div className="invoice-page-container">
      <div className="header-container-invoice">
        <h3>New Invoice</h3>
        <button className="formChar-submit" type="submit">
          Save Invoice
        </button>
      </div>
      <div className="left-right-box">
        <div className="left-new-invoice-page">
          <div className="left-new-invoice-page-header">Bill to</div>
          <SearchCustomerBar customers={customers} />
        </div>
        <div className="right-new-invoice-page">
          <div className="date-inputs-container">
            <div className="right-new-invoice-page-header-issuedAt">
              Issued At
              <input
                type="date"
                className="date-picker-input"
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
              />
            </div>
            <div className="right-new-invoice-page-header-issuedAt">
              Due Date
              <input
                type="date"
                className="date-picker-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="text-inputs-container">
            <div className="right-new-invoice-page-header-invoiceNumber">
              Invoice Number
              <input
                type="text"
                className="text-input-box"
                placeholder="Enter Invoice Number"
              />
            </div>
            <div className="right-new-invoice-page-header-referenceID">
              Reference ID
              <input
                type="text"
                className="text-input-box"
                placeholder="Enter Reference ID"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Items-header">Items</div>
      <div className="item-list-container">
        {LineItems.map((item, index) => (
          <div key={index} className="item-row">
            <SearchItemBar
              items={items}
              index={index}
              onUpdate={(updatedItem) => handleItemUpdate(index, updatedItem)}
              onDelete={() => handleDelete(index)}
            />
          </div>
        ))}
        <button className="formChar-submit" onClick={addNewItem}>
          Add an Item
        </button>
      </div>
      <div className="notes-summary-container">
        <div className="notes">
          <div className="notes-header">Notes</div>
          <div className="note-description">
            <textarea
              className="notes-text-area"
              rows="4"
              cols="27"
              placeholder="Enter your notes here"
            ></textarea>
          </div>
        </div>
        <div className="summary">
          {LineItems.map((item, index) => (
            <div className="summary-items" key={index}>
              <span className="item-name">{item.name}</span>
              <span className="qty-name">x{item.qty}</span>
              <span className="item-price-name">Rs.{item.price}</span>
              <span className="item-price-amt">
                = Rs.{item.price * item.qty}
              </span>
            </div>
          ))}
          <span className="amt-summ">Total Amount = Rs. {totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default NewInvoicePage;
