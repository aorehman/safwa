import React, { useState } from "react";
import AccountantTable from "./AccountantTable";

function AccountantMain() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  return (
    <>
      <div className="my-4 ">
        <AccountantTable
          page={page}
          setPage={setPage}
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
}

export default AccountantMain;
