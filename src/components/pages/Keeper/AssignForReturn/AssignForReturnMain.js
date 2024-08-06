import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReturnOrdersTable from "./ReturnOrderTable/ReturnOrderTable";
import { getCouriers } from "../../../../store/AsyncMethod/KeeperMethod";

function AssignForReturnMain() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getCouriers());
    }
  }, []);
  return (
    <div className="my-4 pl-2 pr-3">
      <ReturnOrdersTable />
    </div>
  );
}

export default AssignForReturnMain;
