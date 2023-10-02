import React from "react";

const TableRow = ({ name, phone, email, createdOn }) => {
  return (
    <div className="table-items-container">
      <div className="table-item">{name}</div>
      <div className="table-item">{phone}</div>
      <div className="table-item">{email}</div>
      <div className="table-item">{createdOn}</div>
    </div>
  );
};
export default TableRow;
