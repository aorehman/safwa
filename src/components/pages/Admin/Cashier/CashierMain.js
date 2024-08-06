import React, { useState } from "react";
import CashierTable from "./CashierTable";

function CashierMain() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  return (
    <>
      <div className="my-4 ">
        <CashierTable
          page={page}
          setPage={setPage}
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
}

export default CashierMain;
