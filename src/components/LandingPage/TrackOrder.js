import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getTrackOrder } from "../../store/AsyncMethod/ShipmentMethod";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import OrderTimeLine from "../OtherComponents/OrderTimeLine";
import NotFoundRecord from "../PageNotFound/NotFoundRecord";
import { RESET_TRACK_ORDER } from "../../store/Types/ShipmentTypes";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { Toast } from "primereact/toast";
import Navbar from "./navbar";

function Track() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error, validateErrors } = useSelector((state) => state.AuthReducer);
  const { trackOrder } = useSelector((state) => state.ShipmentReducer);
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState(false);
  const dispatch = useDispatch();
  const toast = useRef(null);
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
      setIcon(false);
      navigate("/order-track/" + data.tracking_code);
    },
  });
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: RESET_TRACK_ORDER });
  }, [location]);
  useEffect(() => {
    if (id) {
      dispatch(getTrackOrder(id));
    }
  }, [id]);
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
      dispatch({ type: RESET_ERROR });
    }
  }, [error]);

  return (
    <>
      <div className="w-full h-full overflow-auto">
        <div className="card py-2 px-4 shadow-md rounded-lg">
          {/* <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
            {t("track_your_order")}
          </span>
        </Divider> */}
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-1 w-full lg:grid-cols-3 gap-2 !mx-0 !my-5">
              <div className=" w-full flex gap-2">
                <span className="p-float-label p-input-icon-left w-full">
                  <i className="pi pi-search dark:text-white rtl:p-input-icon-right rtl:left-auto pr-6" />
                  {formik.values.tracking_code && (
                    <i
                      className="pi pi-times dark:text-white absolute right-3 rtl:right-auto rtl:left-3 cursor-pointer"
                      onClick={() => {
                        setShow(true);
                        setIcon(false);
                        formik.values.tracking_code = "";
                      }}
                    />
                  )}
                  <InputText
                    id="tracking_code"
                    name="tracking_code"
                    className="w-full text-lg p-primary-input !pl-12 rtl:pl-0 rtl:pr-12"
                    type="number"
                    value={show ? "" : formik.values.tracking_code}
                    onChange={formik.handleChange}
                    onClick={() => {
                      setShow(false);
                      setIcon(true);
                    }}
                  />
                  <label
                    htmlFor="tracking_code"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-12 rtl:left-auto"
                  >
                    {t("order_track_code")}
                  </label>
                </span>

                <Button
                  className="bg-primary"
                  icon={
                    i18next.language === "en"
                      ? "pi pi-arrow-right dark:text-white"
                      : "pi pi-arrow-left dark:text-white"
                  }
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
                  <div className="my-6 flex justify-between flex-col sm:flex-row">
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
        <Toast position="bottom-right" ref={toast} />
      </div>
    </>
  );
}

export default Track;
