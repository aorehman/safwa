import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { getTrackOrder } from "../../../store/AsyncMethod/ShipmentMethod";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import NotFoundRecord from "../../PageNotFound/NotFoundRecord";
import OrderTimeLine from "../../OtherComponents/OrderTimeLine";
import i18next from "i18next";
import { useLocation } from "react-router-dom";
import { RESET_TRACK_ORDER } from "../../../store/Types/ShipmentTypes";
import { classNames } from "primereact/utils";

export default function TrackOrderMain() {
  const { t } = useTranslation();
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const { trackOrder } = useSelector((state) => state.ShipmentReducer);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tracking_code: "",
    },
    validationSchema: () => {
      return Yup.object({
        tracking_code: Yup.number().required(t("track_code_required")),
      });
    },

    onSubmit: async (data) => {
      formik.resetForm();
      dispatch(getTrackOrder(data.tracking_code)).then((success) => {
        if (success) {
        }
      });
    },
  });
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: RESET_TRACK_ORDER });
  }, [location]);
  return (
    <div>
      <div className="card py-2 px-4 shadow-md rounded-lg">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
            {t("track_your_order")}
          </span>
        </Divider>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="flex gap-2">
              <span className="p-float-label p-input-icon-left w-full">
                <i className="pi pi-search dark:text-white" />
                <InputText
                  id="tracking_code"
                  name="tracking_code"
                  className="w-full text-lg p-primary-input !pl-9"
                  type="number"
                  value={formik.values.tracking_code}
                  onChange={formik.handleChange}
                 
                />
                <label
                  htmlFor="tracking_code"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
                >
                  {t("order_track_code")}
                </label>
              </span>
              <Button
                icon="pi pi-arrow-right dark:text-white"
                className="p-primary-btn dark:bg-primary"
                pt={{
                  icon: { className: "w-full" },
                }}
              />
            </div>
          </div>

          {formik.touched?.tracking_code && formik.errors?.tracking_code && (
            <div className="p-error">{formik.errors?.tracking_code}</div>
          )}
          {validateErrors?.tracking_code?.length > 0
            ? validateErrors.tracking_code.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </form>

        <div>
          {trackOrder ? (
            <>
              <div>
                <div className="my-6 flex justify-between flex-col lg:flex-row md:flex-row sm:flex-row gap-2">
                  <h3 className="font-semibold text-xl text-primary dark:text-white">
                    {t("order_track_id")}
                    <span className="text-gray-600 font-normal ml-3 dark:text-white">
                      {trackOrder.order_code}
                    </span>
                  </h3>

                  <h3 className="font-semibold text-xl text-primary dark:text-white">
                    {t("order_status")}
                    <span className="text-gray-600 font-normal ml-3 dark:text-white">
                      {i18next.language === "en"
                        ? trackOrder?.order_status?.name_en
                        : trackOrder?.order_status?.name_ar}
                    </span>
                  </h3>
                </div>
              </div>
              <div dir="ltr">
                <OrderTimeLine trackOrder={trackOrder} />
              </div>
            </>
          ) : (
            <div className="mt-4">
              <NotFoundRecord text="No Order Found" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
