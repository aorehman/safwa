import React, { useEffect } from "react";
import ReceiveOrdersTable from "./ReceiveOrdersTable/ReceiveOrdersTable";
import { useDispatch, useSelector } from "react-redux";
import { getCouriers } from "../../../../store/AsyncMethod/KeeperMethod";

const ReceiveInBoundOrdersMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getCouriers());
    }
  }, []);
  return (
    <div className="my-4">
      <ReceiveOrdersTable />
    </div>
  );
};

export default ReceiveInBoundOrdersMain;
