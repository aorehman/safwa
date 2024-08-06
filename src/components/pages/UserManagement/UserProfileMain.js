import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPersonalInfo from "./UserPersonalInfo";
import UserAddressInfo from "./UserAddressMangement/UserAddressInfo";
import {
  getCities,
  getUserAddresses,
} from "../../../store/AsyncMethod/GetDataMethod";

export default function UserProfileMain() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getUserAddresses());
      dispatch(getCities());
    }
  }, []);
  return (
    <div>
      <div>
        <UserPersonalInfo />
      </div>

      <div>
        <UserAddressInfo />
      </div>
    </div>
  );
}
