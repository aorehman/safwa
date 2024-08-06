import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  getNeighborhoodsById,
  getUserAddresses,
  getZonessById,
} from "../../../../store/AsyncMethod/GetDataMethod";
import AddressInfoFields from "../../../Authentication/Registration/AddressInfoFields";
import { addUserAddress } from "../../../../store/AsyncMethod/ShipmentMethod";

export default function AddNewAddress() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { loading, user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      addressInfo: {
        title: "",
        city_id: "",
        neighborhood_id: "",
        postal_code: "",
        street: "",
        building: "",
        full_address: "",
        description: "",
        // zone_id: "",
        user_id: user?.id,
      },
    },
    validationSchema: () => {
      return Yup.object({
        addressInfo: Yup.object().shape({
          title: Yup.string().required(t("address_title_required")),
          city_id: Yup.number().required(t("city_required")),
          neighborhood_id: Yup.string().required(t("neighborhood_required")),
          postal_code: Yup.string().required(t("postal_code_required")),
          street: Yup.string().required(t("street_required")),
          building: Yup.string().required(t("building_required")),
          full_address: Yup.string().required(t("full_address_required")),
          description: Yup.string().required(t("description_required")),
          // zone_id: Yup.number().required(t("zone_required")),
        }),
      });
    },

    onSubmit: async (data) => {
      dispatch(addUserAddress(data.addressInfo, formik)).then((success) => {
        if (success) {
          dispatch(getUserAddresses());
          setVisible(false);
          formik.resetForm();
          // navigate("/client/dashboard");
        }
      });
    },
  });

  // useEffect(() => {
  //   if (formik.values.addressInfo?.city_id) {
  //     dispatch(getZonessById(formik.values.addressInfo?.city_id));
  //   }
  // }, [formik.values.addressInfo?.city_id]);

  useEffect(() => {
    if (formik.values.addressInfo?.city_id) {
      dispatch(getNeighborhoodsById(formik.values.addressInfo?.city_id));
    }
  }, [formik.values.addressInfo?.city_id]);
  return user?.role_id == 3 || user?.role_id == 2
    ? [
        <div>
          <div className="flex justify-end">
            <Button
              label={t("add_new_address")}
              icon="pi pi-plus"
              className="p-primary-btn dark:text-white dark:bg-primary"
              onClick={() => setVisible(true)}
              type="button"
              pt={{
                icon: { className: "rtl:mx-2" },
              }}
            />
          </div>
          <Dialog
            header={t("add_new_address")}
            headerClassName="text-2xl font-bold text-primary"
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12"
            pt={{
              root: { className: "w-full sm:w-10/12 md:w-8/12 lg:w-7/12" },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-2">
                <AddressInfoFields formik={formik} />
              </div>
              <div className="mt-10 flex justify-center gap-8">
                <Button
                  type="button"
                  label={t("cancel")}
                  className="p-orange-btn px-10 dark:text-white"
                  onClick={() => {
                    setVisible(false);
                    formik.resetForm();
                  }}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  label={loading ? "..." : t("add")}
                  className="p-primary-btn px-10 dark:text-white dark:bg-primary"
                />
              </div>
            </form>
          </Dialog>
        </div>,
      ]
    : [
        // <div>
        //   <div className="flex justify-end">
        //     <Button
        //       label={t("add_new_address")}
        //       icon="pi pi-plus"
        //       className="p-primary-btn dark:text-white dark:bg-primary"
        //       onClick={() => setVisible(true)}
        //       type="button"
        //       pt={{
        //         icon: { className: "rtl:mx-2" },
        //       }}
        //     />
        //   </div>
        //   <Dialog
        //     header={t("add_new_address")}
        //     headerClassName="text-2xl font-bold text-primary"
        //     visible={visible}
        //     onHide={() => setVisible(false)}
        //     className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12"
        //     pt={{
        //       root: { className: "w-full sm:w-10/12 md:w-8/12 lg:w-7/12" },
        //     }}
        //   >
        //     <form onSubmit={formik.handleSubmit}>
        //       <div className="mt-2">
        //         <AddressInfoFields formik={formik} />
        //       </div>
        //       <div className="mt-10 flex justify-center gap-8">
        //         <Button
        //           type="button"
        //           label={t("cancel")}
        //           className="p-orange-btn px-10 dark:text-white"
        //           onClick={() => {
        //             setVisible(false);
        //             formik.resetForm();
        //           }}
        //         />
        //         <Button
        //           type="submit"
        //           label={loading ? "..." : t("add")}
        //           className="p-primary-btn px-10 dark:text-white dark:bg-primary"
        //         />
        //       </div>
        //     </form>
        //   </Dialog>
        // </div>
      ];
}
