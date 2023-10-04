import React from "react";

const TableRowItems = ({ name, description, price, addedOn }) => (
  <div className="table-items-container">
    <div className="table-item">{name}</div>
    <div className="table-item">{description}</div>
    <div className="table-item">{price}</div>
    <div className="table-item">{addedOn}</div>
  </div>
);
export default TableRowItems;
