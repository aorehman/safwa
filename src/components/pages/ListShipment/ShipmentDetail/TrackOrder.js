import { Divider } from "primereact/divider";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import NotFoundRecord from "../../../PageNotFound/NotFoundRecord";
import OrderStepper from "../../../OtherComponents/OrderStepper";
import i18next from "i18next";
import OrderTimeLine from "../../../OtherComponents/OrderTimeLine";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_TRACK_ORDER } from "../../../../store/Types/ShipmentTypes";

export default function TrackOrder({ trackOrder }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: RESET_TRACK_ORDER });
  }, [location]);
  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("track_your_order")}
        </span>
      </Divider>

      <>
        {trackOrder ? (
          <div>
            <div className="my-6 flex justify-between">
              <h3 className="font-semibold text-lg text-primary dark:text-white">
                {t("order_track_id")}
                <span className="text-gray-600 font-normal ml-3 dark:text-white">
                  {trackOrder?.order_code}
                </span>
              </h3>

              <h3 className="font-semibold text-lg text-primary dark:text-white">
                {t("order_status")}
                <span className="text-gray-600 font-normal ml-3 dark:text-white">
                  {i18next.language === "en"
                    ? trackOrder?.order_status?.name_en
                    : trackOrder?.order_status?.name_ar}
                </span>
              </h3>
            </div>

            <div>
              {/* <OrderStepper trackOrder={trackOrder} /> */}
              <OrderTimeLine trackOrder={trackOrder} />
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <NotFoundRecord text="No Order Found" />
          </div>
        )}
        {/* <div className="">
            <OrderStepper />
          </div> */}
      </>
    </>
  );
}
