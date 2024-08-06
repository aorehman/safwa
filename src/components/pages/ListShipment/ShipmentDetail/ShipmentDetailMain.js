import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTrackOrder } from "../../../../store/AsyncMethod/ShipmentMethod";
import SenderDetail from "./SenderDetail";
import ReceiverDetail from "./ReceiverDetail";
import ShipmentDetail from "./ShipmentDetail";
import TrackOrder from "./TrackOrder";

export default function ShipmentDetailMain() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { trackOrder } = useSelector((state) => state.ShipmentReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (id) {
      dispatch(getTrackOrder(id));
    }
  }, []);

  return user?.role_id == 3 || user?.role_id == 2
    ? [
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            <div className="card pb-2 px-6 shadow-md rounded-lg">
              <SenderDetail trackOrder={trackOrder} />
            </div>

            <div className="card pb-2 px-6 shadow-md rounded-lg">
              <ReceiverDetail trackOrder={trackOrder} />
            </div>

            <div className="card pb-2 px-6 shadow-md rounded-lg">
              <ShipmentDetail trackOrder={trackOrder} />
            </div>
          </div>

          <div
            className="card bg-white py-2 px-6 shadow-md rounded-lg my-2"
            dir="ltr"
          >
            <TrackOrder trackOrder={trackOrder} />
          </div>
        </div>,
      ]
    : [
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            <div className="card pb-2 px-6 shadow-md rounded-lg">
              <SenderDetail trackOrder={trackOrder} />
            </div>

            <div className="card pb-2 px-6 shadow-md rounded-lg">
              <ReceiverDetail trackOrder={trackOrder} />
            </div>

            <div className="card pb-2 px-6 shadow-md rounded-lg">
              <ShipmentDetail trackOrder={trackOrder} />
            </div>
          </div>

          <div
            className="card bg-white py-2 px-6 shadow-md rounded-lg my-2"
            dir="ltr"
          >
            <TrackOrder trackOrder={trackOrder} />
          </div>
        </div>,
      ];
}
