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
import AddInvoiceButton from "./AddInvoiceButton";
import NewCustomerPage from "./customers/NewCustomerPage";
import NewInvoicePage from "./NewInvoicePage";
import NewItemPage from "./Items/NewItemPage";
import Table from "./Table";
import { TableProvider, useTable } from "./TableContext";

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
      items.map((x) => (
        <div className="table-items-container">
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

// const ItemsList = (props) => (
//   <>
//     <div className="header-container">
//       <h3>Items</h3>
//       <AddItemB />
//     </div>
//     <div className="table-head-container">
//       <div className="table-head">NAME</div>
//       <div className="table-head">DESCRIPTION</div>
//       <div className="table-head">PRICE</div>
//       <div className="table-head">ADDED ON</div>
//     </div>
//     {props.items.map((x) => (
//       <TableRowItems
//         key={x.name}
//         name={x.name}
//         price={x.price}
//         description={x.description}
//         addedOn={x.addedOn}
//       />
//     ))}
//   </>
// );

let invoices = [
  {
    Date: "12/17/2019",
    Customer: "Sarika",
    InvNumber: "INV-00010",
    PaidStatus: "Issued",
    Amount: 3000,
    AmountDue: 1000,
  },
  {
    Date: "12/19/2019",
    Customer: "Harry",
    InvNumber: "INV-00011",
    PaidStatus: "Paid",
    Amount: 5000,
    AmountDue: 0,
  },
  {
    Date: "01/10/2020",
    Customer: "Ron",
    InvNumber: "INV-00012",
    PaidStatus: "Pending",
    Amount: 2500,
    AmountDue: 2500,
  },
  {
    Date: "01/15/2020",
    Customer: "Hermione",
    InvNumber: "INV-00013",
    PaidStatus: "Issued",
    Amount: 4000,
    AmountDue: 1500,
  },
  {
    Date: "02/05/2020",
    Customer: "Draco",
    InvNumber: "INV-00014",
    PaidStatus: "Paid",
    Amount: 6000,
    AmountDue: 0,
  },
];

const InvoicesList = () => {
  return (
    <div className="invoices-list-container">
      <div className="header-container">
        <h3>Invoices</h3>
        <AddInvoiceButton />
      </div>
      <div className="table-head-container">
        <div className="table-head">DATE</div>
        <div className="table-head">CUSTOMERS</div>
        <div className="table-head">NUMBER</div>
        <div className="table-head">PAID STATUS</div>
        <div className="table-head">AMOUNT</div>
        <div className="table-head">AMOUNT DUE</div>
      </div>
      {invoices.map((invoice, index) => (
        <div key={index} className="table-items-container">
          <div className="table-item">{invoice.Date}</div>
          <div className="table-item">{invoice.Customer}</div>
          <div className="table-item">{invoice.InvNumber}</div>
          <div className="table-item">{invoice.PaidStatus}</div>
          <div className="table-item">${invoice.Amount.toFixed(2)}</div>
          <div className="table-item">${invoice.AmountDue.toFixed(2)}</div>
        </div>
      ))}
    </div>
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
                element={<NewInvoicePage customers={customers} items={items} />}
              />

              <Route path="/invoices" element={<InvoicesList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TableProvider>
  );
};

export default App;
