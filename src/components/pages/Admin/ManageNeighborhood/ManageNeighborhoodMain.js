import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import NeighborhoodTable from "./NeighborhoodTable";

export default function ManageNeighborhoodMain() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  useEffect(() => {
    if (user) {
      //   dispatch(getCollectionCharges());
    }
  }, []);
  return (
    <div className="my-4">
      {
        <NeighborhoodTable
          page={page}
          setPage={setPage}
          rows={rows}
          setRows={setRows}
        />
      }
    </div>
  );
}
