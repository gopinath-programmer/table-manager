/** @format */

import React from "react";
import TableManagerProvider from "./TableProvider";
import Form from "./Form";
import Table from "./Table";
import Footer from "./Footer";

function TableManager() {
  return (
    <TableManagerProvider>
      <Table />
      <Footer />
    </TableManagerProvider>
  );
}

export default TableManager;
