import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  editCollectionCharge,
  getCollectionCharges,
} from "../../../../store/AsyncMethod/AdminMethod";
import { Dialog } from "primereact/dialog";

export default function AddCollectionCharges({
  setSelectedRow,
  selectedRow,
  dialogVisible,
  setSelectedProducts,
  setDialogVisible,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collectionChargesId } = useParams();
  const { validateErrors, loading } = useSelector((state) => state.AuthReducer);

  // useEffect(() => {
  //   if (newSender) {
  //     formik.setFieldValue("pickup_address_id", 0);
  //     formik.setFieldValue("sender_first_name", "");
  //     formik.setFieldValue("sender_last_name", "");
  //     formik.setFieldValue("sender_phone", "");
  //   }
  // }, [newSender]);

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("fee", selectedRow?.fee);
    }
  }, [selectedRow]);

  const formik = useFormik({
    initialValues: {
      fee: selectedRow?.fee,
    },
    validationSchema: () => {
      return Yup.object({
        fee: Yup.number().required(t("Fee is required")),
      });
    },

    onSubmit: async (data) => {
      if (selectedRow) {
        const updatedData = { ...data, charges_id: parseInt(selectedRow.id) };
        dispatch(editCollectionCharge(updatedData)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            dispatch(getCollectionCharges());
            setSelectedProducts(null);
          }
        });
      }
    },
  });
  return (
    <Dialog
      header={
        selectedRow ? "Edit Collection Charges" : "Add Collection Charges"
      }
      visible={dialogVisible}
      className=" !w-11/12 sm:!w-1/2"
      onHide={() => {
        setDialogVisible(false);
        formik.resetForm();
        setSelectedProducts(null);
      }}
      pt={{
        content: { className: "!px-3 !py-2 " },
        header: { className: "!p-3 !py-3" },
      }}
    >
      <div className="rtl:ml-5">
        <form onSubmit={formik.handleSubmit} className="py-3 ">
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
              <div className="">
                <span className="p-float-label w-full">
                  <InputText
                    type="number"
                    id="fee"
                    name="fee"
                    // className="w-full text-lg p-primary-input"
                    className={`w-full text-lg p-primary-input ${
                      validateErrors?.quantity?.length > 0
                        ? "border-vError"
                        : ""
                    }`}
                    value={formik.values.fee}
                    onChange={formik.handleChange}
                    min={1}
                  />
                  <label
                    htmlFor="quantity"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Fee")}
                  </label>
                </span>
                {formik.touched.fee && formik.errors.fee && (
                  <div className="p-error">{formik.errors.fee}</div>
                )}
                {validateErrors?.fee?.length > 0
                  ? validateErrors.fee.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </>
          <div className="mt-4">
            <div className=" flex justify-end gap-3">
              <Button
                label={t("cancel")}
                className="p-orange-btn dark:text-white"
                icon="pi pi-times"
                type="button"
                pt={{
                  icon: { className: "rtl:mx-2" },
                }}
                onClick={() => {
                  formik.resetForm();
                  setDialogVisible(false);
                  formik.resetForm();
                  setSelectedProducts(null);
                }}
              />
              <Button
                disabled={loading}
                label={selectedRow ? t("Update") : t("create")}
                className="p-primary-btn dark:text-white dark:bg-primary"
                icon="pi pi-check"
                type="submit"
                pt={{
                  icon: { className: "rtl:mx-2" },
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
