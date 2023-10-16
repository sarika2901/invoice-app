import React, { useState, useEffect } from "react";
import "../App.css";
import SearchCustomerBar from "./SearchCustomerBar";
import SearchItemBar from "./SearchItemBar";
import Modal from "../modal/modal";

const NewInvoicePage = ({ customers = [], items = [], onAdd }) => {
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [LineItems, setLineItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [invoiceNumber, setInvoiceNumber] = useState("INV0001");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [referenceID, setReferenceID] = useState("");

  const getNextInvoiceNumber = (currentNumber) => {
    const num = parseInt(currentNumber.replace("INV", "")) + 1;
    return `INV${String(num).padStart(4, "0")}`;
  };

  const addNewItem = () => {
    setLineItems((prevItems) => [...prevItems, { name: "", qty: 1, price: 0 }]);
  };

  const handleDelete = (indexToRemove) => {
    setLineItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  const resetFields = () => {
    setIssuedDate("");
    setDueDate("");
    setTotalAmount(0);
    setLineItems([{ name: "", qty: 1, price: 0 }]);
    setSelectedCustomer("");
    setReferenceID("");
  };

  const saveInvoice = () => {
    if (
      !selectedCustomer ||
      !issuedDate ||
      !invoiceNumber ||
      totalAmount === 0 ||
      isNaN(totalAmount)
    ) {
      alert(
        "Please fill out all required fields and ensure total amount is greater than 0!"
      );
      return;
    }

    if (LineItems.length === 1 && LineItems[0].name === "") {
      alert("Please add at least one item to the invoice.");
      return;
    }

    let status = dueDate ? "unpaid" : "paid";
    let amountDueValue = 0;

    if (status === "unpaid") {
      const unpaidAmount = parseFloat(prompt("Enter the unpaid amount:", "0"));
      if (
        isNaN(unpaidAmount) ||
        unpaidAmount <= 0 ||
        unpaidAmount > totalAmount
      ) {
        alert("Invalid unpaid amount entered.");
        return;
      }
      amountDueValue = unpaidAmount;
    }

    const newInvoice = {
      Customer: selectedCustomer,
      InvNumber: invoiceNumber,
      Date: issuedDate,
      DueDate: dueDate,
      PaidStatus: status,
      Amount: totalAmount,
      AmountDue: amountDueValue,
    };
    onAdd(newInvoice);
    setShowModal(true);
    const num = parseInt(invoiceNumber.replace("INV", "")) + 1;
    const newInvoiceNumber = getNextInvoiceNumber(invoiceNumber);
    setInvoiceNumber(newInvoiceNumber);

    resetFields();
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
        <button className="formChar-submit" onClick={saveInvoice}>
          Save Invoice
        </button>
      </div>
      <div className="left-right-box">
        <div className="left-new-invoice-page">
          <div className="left-new-invoice-page-header">Bill to</div>
          <SearchCustomerBar
            customers={customers}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
          />
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
                value={invoiceNumber}
                readOnly
                placeholder="Enter Invoice Number"
              />
            </div>
            <div className="right-new-invoice-page-header-referenceID">
              Reference ID
              <input
                type="text"
                className="text-input-box"
                value={referenceID}
                onChange={(e) => setReferenceID(e.target.value)}
                placeholder="Enter Reference ID"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Items-header">Items</div>
      <div className="item-list-container">
        {LineItems &&
          LineItems.map((item, index) => (
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
          {LineItems &&
            LineItems.map((item, index) => (
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
      {showModal && <Modal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default NewInvoicePage;
