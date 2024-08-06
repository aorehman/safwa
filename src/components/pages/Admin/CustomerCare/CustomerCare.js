import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomerCareTable from "./CustomerCareTable";

function CustomerCare() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <div className="my-4 ">
        <CustomerCareTable
          page={page}
          setPage={setPage}
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
}

export default CustomerCare;
