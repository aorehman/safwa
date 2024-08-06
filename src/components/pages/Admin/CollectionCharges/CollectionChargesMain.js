import React, { useEffect } from "react";
import CollentionChargesTable from "./CollentionChargesTable";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionCharges } from "../../../../store/AsyncMethod/AdminMethod";

export default function CollectionChargesMain() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getCollectionCharges());
    }
  }, []);
  return (
    <div className="my-4">
      <CollentionChargesTable />
    </div>
  );
}
