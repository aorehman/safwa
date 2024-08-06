import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeeperListTable from "./KeeperListTable";

const KeeperListMain = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      //   dispatch(getCouriers());
    }
  }, []);
  return (
    <div className="my-4">
      <KeeperListTable
        page={page}
        setPage={setPage}
        rows={rows}
        setRows={setRows}
      />
    </div>
  );
};

export default KeeperListMain;
