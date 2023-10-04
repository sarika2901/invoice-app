import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import "./App.css";
import NewCustomerB from "./NewCustomerB";
import AddItemB from "./AddItemB";
import TableRow from "./TableRow";
import TableRowItems from "./TableRowItems";
import NewCustomerPage from "./NewCustomerPage";
import NewItemPage from "./NewItemPage";

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

const ItemsList = (props) => (
  <>
    <div className="header-container">
      <h3>Items</h3>
      <AddItemB />
    </div>
    <div className="table-head-container">
      <div className="table-head">NAME</div>
      <div className="table-head">DESCRIPTION</div>
      <div className="table-head">PRICE</div>
      <div className="table-head">ADDED ON</div>
    </div>
    {props.items.map((x) => (
      <TableRowItems
        key={x.name}
        name={x.name}
        price={x.price}
        description={x.description}
        addedOn={x.addedOn}
      />
    ))}
  </>
);

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
    <Router>
      <div className="app-container">
        <div className="column column-left">
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
            <i className="fa-solid fa-user icon-left"></i>
            Items
          </NavLink>
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
            <Route
              path="/customers"
              element={<CustomerList customers={customers} />}
            />
            <Route path="/new-item" element={<NewItemPage onAdd={addItem} />} />
            <Route path="/items" element={<ItemsList items={items} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
