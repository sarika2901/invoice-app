import React from "react";
import { useTable } from "./TableContext";

const Table = () => {
  const { headers, rows } = useTable();

  return (
    <div>
      <div className="table-head-container">
        {headers &&
          headers.map((header, idx) => (
            <div key={idx} className="table-head">
              {header}
            </div>
          ))}
      </div>
      {rows}
    </div>
  );
};

export default Table;
