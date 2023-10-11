import React, { createContext, useContext, useState } from "react";

const TableContext = createContext();

const useTable = () => {
  return useContext(TableContext);
};

const TableProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const value = {
    headers,
    rows,
    setHeaders,
    setRows,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export { useTable, TableProvider };
