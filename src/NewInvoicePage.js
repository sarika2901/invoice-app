import React, { useState } from "react";
import "./App.css";
import AddInvoiceButton from "./AddInvoiceButton";
import SearchCustomerBar from "./SearchCustomerBar";
import SearchItemBar from "./SearchItemBar";

const NewInvoicePage = ({ customers, items }) => {
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [quantity, setQuantity] = useState("");
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
      <div className="left-right-box">
        <div className="left-new-invoice-page2">
          <div className="items">
            <div className="left-new-invoice-page-header">Items</div>
            <SearchItemBar items={items} />
          </div>
          <div className="qty">
            <div className="left-new-invoice-page-header">Qty.</div>
            <input
              type="number"
              className="qty-input"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter"
              min="1"
            />
          </div>
          <div className="Amount">
            <div className="left-new-invoice-page-header">Amount</div>
          </div>
        </div>
        <div className="right-new-invoice-page"></div>
      </div>
    </div>
  );
};

export default NewInvoicePage;
