import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import "./App.css";
import NewCustomerB from "./customers/NewCustomerB";
import AddItemB from "./Items/AddItemB";
import AddInvoiceButton from "./Invoice/AddInvoiceButton";
import NewCustomerPage from "./customers/NewCustomerPage";
import NewInvoicePage from "./Invoice/NewInvoicePage";
import NewItemPage from "./Items/NewItemPage";
import Table from "./Table";
import { TableProvider, useTable } from "./TableContext";
import HomePage from "./Home/HomePage";

const CustomerList = ({ customers }) => {
  const { setHeaders, setRows } = useTable();

  useEffect(() => {
    setHeaders(["NAME", "PHONE", "EMAIL", "CREATED ON"]);

    setRows(
      customers.map((x) => (
        <div key={x.phone} className="table-items-container">
          <div className="table-item">{x.name}</div>
          <div className="table-item">{x.phone}</div>
          <div className="table-item">{x.email}</div>
          <div className="table-item">{x.createdOn}</div>
        </div>
      ))
    );
  }, [customers, setHeaders, setRows]);

  return (
    <>
      <div className="header-container">
        <h3>Customers</h3>
        <NewCustomerB />
      </div>
      <Table />
    </>
  );
};

const ItemsList = ({ items }) => {
  const { setHeaders, setRows } = useTable();
  useEffect(() => {
    setHeaders(["NAME", "DESCRIPTION", "PRICE", "ADDED ON"]);
    setRows(
      items &&
        items.map((x) => (
          <div key={x.name} className="table-items-container">
            <div className="table-item">{x.name}</div>
            <div className="table-item">{x.description}</div>
            <div className="table-item">Rs. {x.price}</div>
            <div className="table-item">{x.addedOn}</div>
          </div>
        ))
    );
  }, [items, setHeaders, setRows]);
  return (
    <>
      <div className="header-container">
        <h3>Items</h3>
        <AddItemB />
      </div>
      <Table />
    </>
  );
};

const InvoicesList = ({ invoices }) => {
  const { setHeaders, setRows } = useTable();

  useEffect(() => {
    setHeaders([
      "DATE",
      "CUSTOMERS",
      "NUMBER",
      "PAID STATUS",
      "AMOUNT",
      "AMOUNT DUE",
    ]);

    setRows(
      invoices &&
        invoices.map((invoice, index) => (
          <div key={index} className="table-items-container">
            <div className="table-item">{invoice.Date}</div>
            <div className="table-item">{invoice.Customer}</div>
            <div className="table-item">{invoice.InvNumber}</div>
            <div className="table-item">{invoice.PaidStatus}</div>
            <div className="table-item">
              Rs. {invoice.Amount ? invoice.Amount.toFixed(2) : "N/A"}
            </div>
            <div className="table-item">
              Rs. {invoice.AmountDue ? invoice.AmountDue.toFixed(2) : "N/A"}
            </div>
          </div>
        ))
    );
  }, [invoices, setHeaders, setRows]);

  return (
    <>
      <div className="header-container">
        <h3>Invoices</h3>
        <AddInvoiceButton />
      </div>
      <Table />
    </>
  );
};

const App = () => {
  const [customers, setCustomers] = useState([]);
  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const [items, setItems] = useState([]);
  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const [invoices, setInvoices] = useState([]);
  const addInvoice = (newInvoice) => {
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
  };

  return (
    <TableProvider>
      <Router>
        <div className="app-container">
          <div className="column column-left">
            <h3 className="banner-text-left">Menu</h3>
            <NavLink
              to="/"
              className="icon-text-container"
              activeClassName="active"
            >
              <i className="fa fa-home icon-left"></i>
              Home
            </NavLink>
            <NavLink
              to="/customers"
              className="icon-text-container"
              activeClassName="active"
            >
              <i className="fa-solid fa-user icon-left"></i>
              Customers
            </NavLink>
            <NavLink
              to="/items"
              className="icon-text-container"
              activeClassName="active"
            >
              <i className="fa fa-star icon-left"></i>
              Items
            </NavLink>
            <NavLink
              to="/invoices"
              className="icon-text-container"
              activeClassName="active"
            >
              <i className="fa fa-id-card icon-left"></i>
              Invoices
            </NavLink>
          </div>
          <div className="column column-right">
            <h2 className="banner-text">Generate Invoices</h2>
            <Routes>
              <Route path="/" element={<HomePage />} exact />
              <Route
                path="/new-customer"
                element={<NewCustomerPage onAdd={addCustomer} />}
              />
              <Route
                path="/customers"
                element={<CustomerList customers={customers} />}
              />

              <Route
                path="/new-item"
                element={<NewItemPage onAdd={addItem} />}
              />
              <Route path="/items" element={<ItemsList items={items} />} />
              <Route
                path="/new-invoice"
                element={
                  <NewInvoicePage
                    customers={customers}
                    items={items}
                    onAdd={addInvoice}
                  />
                }
              />

              <Route
                path="/invoices"
                element={<InvoicesList invoices={invoices} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </TableProvider>
  );
};

export default App;
