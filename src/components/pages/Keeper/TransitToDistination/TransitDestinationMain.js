import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DestinationOrderTable from "./DestinationOrderTable/DestinationOrderTable";
import { getStores } from "../../../../store/AsyncMethod/GetDataMethod";

const TransitDestinationMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getStores());
    }
  }, []);
  return (
    <div className="my-4 pl-2 pr-3">
      <DestinationOrderTable />
    </div>
  );
};

export default TransitDestinationMain;
