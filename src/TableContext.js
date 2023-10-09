import React, { createContext, useState } from "react";

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  return (
    <TableContext.Provider value={{ customers, setCustomers }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
