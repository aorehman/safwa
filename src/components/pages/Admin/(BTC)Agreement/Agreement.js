import React, { useState } from "react";
import AgreementTable from "./AgreementTable";

function Agreement() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  return (
    <div className="my-4">
      <AgreementTable
        page={page}
        setPage={setPage}
        rows={rows}
        setRows={setRows}
      />
    </div>
  );
}

export default Agreement;
