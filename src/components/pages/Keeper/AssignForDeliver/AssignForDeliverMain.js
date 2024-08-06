import React, { useEffect } from "react";
import { getCouriers } from "../../../../store/AsyncMethod/KeeperMethod";
import { useDispatch, useSelector } from "react-redux";
import DeliverOrdersTable from "./DeliverOrdersTable/DeliverOrdersTable";

const AssignForDeliverMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getCouriers());
    }
  }, []);
  return (
    <div className="my-4 pl-2 pr-3">
      <DeliverOrdersTable />
    </div>
  );
};

export default AssignForDeliverMain;
