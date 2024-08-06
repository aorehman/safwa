import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getCouriers } from "../../../../store/AsyncMethod/KeeperMethod";
import ReturnToWarehouseTable from "./ReturnToWarehouseTable";

const ReturnToWarehouseMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      //   dispatch(getCouriers());
    }
  }, []);
  return (
    <div className="my-4 pl-2 pr-3">
      <ReturnToWarehouseTable />
    </div>
  );
};

export default ReturnToWarehouseMain;
