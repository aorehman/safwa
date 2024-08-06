import React, { useEffect } from "react";
import PickupOrdersTable from "./PickupOrdersTable/PickupOrdersTable";
import { getCouriers } from "../../../../store/AsyncMethod/KeeperMethod";
import { useDispatch, useSelector } from "react-redux";

const AssignForPickupMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getCouriers());
    }
  }, []);
  return (
    <div className="my-4 pl-2 pr-3 ">
      <PickupOrdersTable />
    </div>
  );
};

export default AssignForPickupMain;
