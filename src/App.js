import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import NewCustomerB from "./NewCustomerB";
import TableRow from "./TableRow";
import NewCustomerPage from "./NewCustomerPage";

// let customers = [
//   {
//     name: "Sarika",
//     phone: "911",
//     email: "bestperson@awesome.com",
//     createdOn: "31 Feb 2051",
//   },
//   {
//     name: "Kajal",
//     phone: "911",
//     email: "bestperson@awesome.com",
//     createdOn: "31 Feb 2051",
//   },
//   {
//     name: "Neeraj",
//     phone: "911",
//     email: "bestperson@awesome.com",
//     createdOn: "31 Feb 2051",
//   },
//   {
//     name: "Rajni",
//     phone: "911",
//     email: "bestperson@awesome.com",
//     createdOn: "31 Feb 2051",
//   },
//   {
//     name: "Sid",
//     phone: "911",
//     email: "bestperson@awesome.com",
//     createdOn: "31 Feb 2051",
//   },
// ];

const CustomerList = (props) => (
  <>
    <div className="header-container">
      <h3>Customers</h3>
      <NewCustomerB />
    </div>
    <div className="table-head-container">
      <div className="table-head">NAME</div>
      <div className="table-head">PHONE</div>
      <div className="table-head">EMAIL</div>
      <div className="table-head">CREATED ON</div>
    </div>
    {props.customers.map((x) => (
      <TableRow
        key={x.phone}
        name={x.name}
        phone={x.phone}
        email={x.email}
        createdOn={x.createdOn}
      />
    ))}
  </>
);

const App = () => {
  const [customers, setCustomers] = useState([]);
  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="column column-left">
          <div className="icon-text-container">
            <i className="fa-solid fa-user icon-left"></i>
            Customers
          </div>
          <div className="icon-text-container">
            <i className="fa fa-star icon-left"></i>
            Items
          </div>
          <div className="icon-text-container">
            <i className="fa fa-sticky-note icon-left"></i>
            Invoices
          </div>
        </div>
        <div className="column column-right">
          <Routes>
            <Route
              path="/new-customer"
              element={<NewCustomerPage onAdd={addCustomer} />}
            />
            <Route path="/" element={<CustomerList customers={customers} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
