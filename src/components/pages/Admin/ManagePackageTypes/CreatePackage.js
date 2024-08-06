import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import i18next from "i18next";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createPackageTypes,
  editPackageType,
  getPackageTypeById,
  getPackageTypes,
  getStoreList,
} from "../../../../store/AsyncMethod/AdminMethod";
import { InputNumber } from "primereact/inputnumber";

export default function CreatePackage({
  dialogVisible,
  setDialogVisible,
  selectedRow,
  setSelectedRow,
  setSelectedProducts,
}) {
  //   const location = useLocation();
  //   const rowData = location.state.rowData;
  const { t } = useTranslation();

  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packageId } = useParams();
  const { loading } = useSelector((state) => state.AuthReducer);

  const { specificPackageId } = useSelector((state) => state.AdminReducer);

  // const statusOption = [
  //   { status: "0", id: 0 },
  //   { status: "1", id: 1 },
  // ];

  const statusOptions = [
    { label: "Disable", id: 0 },
    { label: "Enable", id: 1 },
  ];

  useEffect(() => {
    if (specificPackageId?.name_en) {
      formik.setFieldValue("name_en", specificPackageId?.name_en);
      formik.setFieldValue("name_ar", specificPackageId?.name_ar);
      formik.setFieldValue("status", parseInt(specificPackageId?.status));
      formik.setFieldValue("amount", specificPackageId?.amount);
      dispatch({
        type: "RESET_SPECIFIC_PACKAGE_ID",
      });
    }
  }, [specificPackageId]);

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("name_en", selectedRow.name_en);
      formik.setFieldValue("name_ar", selectedRow.name_ar);
      formik.setFieldValue("status", parseInt(selectedRow.status));
      formik.setFieldValue("amount", +selectedRow.amount);
    }
  }, [selectedRow]);

  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_ar: "",
      status: "",
      amount: "",
    },

    validationSchema: Yup.object({
      name_en: Yup.string().required("Name (English) is required"),
      name_ar: Yup.string().required("Name (Arabic) is required"),
      status: Yup.number().required("Status is required"),
      amount: Yup.number().required("Amount is required"),
    }),

    onSubmit: async (data) => {
      if (selectedRow) {
        const updateData = { ...data, package_id: selectedRow.id };
        dispatch(editPackageType(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            setSelectedRow(null);
            dispatch(getPackageTypes(1, 10));
            setSelectedProducts(null);
          }
        });
      } else {
        dispatch(createPackageTypes(data)).then((success) => {
          if (success) {
            formik.resetForm();
            setSelectedRow(null);
            dispatch(getPackageTypes(1, 10));
            setDialogVisible(false);
            setSelectedProducts(null);
          }
        });
      }
    },
  });

  useEffect(() => {
    if (packageId) {
      dispatch(getPackageTypeById(packageId));
    }
  }, [packageId]);

  return (
    <>
      <Dialog
        header={selectedRow ? t("Edit Package Types") : t("Add Package Types")}
        visible={dialogVisible}
        className=" !w-11/12 sm:!w-1/2"
        onHide={() => {
          setSelectedRow(null);
          formik.resetForm();
          setDialogVisible(false);
          setSelectedProducts(null);
        }}
        pt={{
          content: { className: "!px-3 !py-2 " },
          header: { className: "!p-3 !py-3" },
        }}
      >
        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <div className=" mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {/* Name_en */}
              <div className="">
                <span className="p-float-label w-full">
                  <InputText
                    id="name_en"
                    name="name_en"
                    className={`w-full text-lg p-primary-input ${
                      validateErrors?.name_en?.length > 0 ? "border-vError" : ""
                    }`}
                    value={formik.values.name_en}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="name_en"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
                  >
                    {t("Name")}
                  </label>
                </span>
                {formik.touched.name_en && formik.errors.name_en && (
                  <div className="p-error">{formik.errors.name_en}</div>
                )}

                {validateErrors?.name_en?.length > 0
                  ? validateErrors.name_en.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null}
              </div>

              {/* Name_ar */}
              <div className="">
                <span className="p-float-label w-full">
                  <InputText
                    id="name_ar"
                    name="name_ar"
                    className={`w-full text-lg p-primary-input ${
                      validateErrors?.name_ar?.length > 0 ? "border-vError" : ""
                    }`}
                    value={formik.values.name_ar}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="name_ar"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Name Arabic")}
                  </label>
                </span>
                {formik.touched.name_ar && formik.errors.name_ar && (
                  <div className="p-error">{formik.errors.name_ar}</div>
                )}
                {validateErrors?.name_ar?.length > 0
                  ? validateErrors.name_ar.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null}
              </div>

              {/* Status */}
              <div className="">
                <span className="p-float-label w-full">
                  <Dropdown
                    id="status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    // onChange={(e) => {
                    //   formik.setFieldValue("status", e.value);
                    // }}
                    options={statusOptions}
                    optionLabel="label"
                    optionValue="id"
                    className={`w-full text-lg p-primary-input ${
                      formik.touched.status && formik.errors.status
                        ? "border-vError"
                        : ""
                    }`}
                    pt={{
                      root: { className: "w-full md:w-full p-primary-input" },
                      input: { className: "w-full p-primary-input" },
                      filterInput: { className: "mr-0" },
                      filterIcon: {
                        className: "rtl:right-auto rtl:left-4 dark:text-white",
                      },
                    }}
                  />
                  <label
                    htmlFor="status"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Select Status")}
                  </label>
                </span>
                {formik.touched.status && formik.errors.status && (
                  <div className="p-error">{formik.errors.status}</div>
                )}

                {validateErrors?.status?.length > 0 &&
                  validateErrors.status.map((err, index) => (
                    <div key={index} className="p-error">
                      {err}
                    </div>
                  ))}
              </div>

              {/* Amount */}
              <div className="">
                <span className="p-float-label w-full">
                  <InputNumber
                    id="amount"
                    name="amount"
                    className={`w-full text-lg p-primary-input ${
                      validateErrors?.amount?.length > 0 ? "border-vError" : ""
                    }`}
                    prefix="SAR "
                    minFractionDigits={1}
                    min={0.5}
                    useGrouping={false}
                    value={formik.values.amount}
                    onValueChange={formik.handleChange}
                  />
                  <label
                    htmlFor="package_type_id"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Amount")}
                  </label>
                </span>
                {formik.touched.amount && formik.errors.amount && (
                  <div className="p-error">{formik.errors.amount}</div>
                )}
                {validateErrors?.amount?.length > 0
                  ? validateErrors.amount.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null}
              </div>
            </div>

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
                    setSelectedProducts(null);
                  }}
                />
                <Button
                  disabled={loading}
                  label={selectedRow ? t("Update") : t("Add")}
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
    </>
  );
}

// {/* <Dialog
//   header={t("Add Package Type")}
//   headerClassName="text-2xl font-bold text-primary"
//   visible={visible}
//   onHide={() => setVisible(false)}
//   className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12"
//   pt={{
//     root: { className: "w-full sm:w-10/12 md:w-8/12 lg:w-7/12" },
//   }}
// >
//   <form onSubmit={formik.handleSubmit}>
//     <div className="mt-2">
//       <CreatePackage formik={formik} />
//     </div>
//     <div className="mt-10 flex justify-center gap-8">
//       <Button
//         type="button"
//         label={t("cancel")}
//         className="p-orange-btn px-10 dark:text-white"
//         onClick={() => {
//           setVisible(false);
//           formik.resetForm();
//         }}
//       />
//       <Button
//         type="submit"
//         label={loading ? "..." : t("add")}
//         className="p-primary-btn px-10 dark:text-white dark:bg-primary"
//       />
//     </div>
//   </form>
// </Dialog>; */}
