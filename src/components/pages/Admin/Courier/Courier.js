import React, { useState } from "react";
import CourierTable from "./CourierTable";
import { useSelector } from "react-redux";
import { TabMenu } from "primereact/tabmenu";
import Navigation from "../../../OtherComponents/Navigation";

function Courier() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <div className="my-4 ">
        <CourierTable
          page={page}
          setPage={setPage}
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
}

export default Courier;
