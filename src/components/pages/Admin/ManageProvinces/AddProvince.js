import { useFormik } from "formik";
import i18next from "i18next";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  addProvince,
  addStore,
  editProvince,
  editStore,
  getProvinceList,
  getSpecificProvinceById,
} from "../../../../store/AsyncMethod/AdminMethod";
import { RESET_SPECIFIC_PROVINCE } from "../../../../store/Types/AdminTypes";
import { Dialog } from "primereact/dialog";

export default function AddProvince({
  setSelectedRow,
  selectedRow,
  showForm,
  setShowForm,
  setSelectedProducts,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provinceId } = useParams();
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  const { cities, neighborhoods, zones } = useSelector(
    (state) => state.GetDataReducer
  );

  const { specificProvince } = useSelector((state) => state.AdminReducer);

  //   const statusOptions = [
  //     { label: "0", id: 0 },
  //     { label: "1", id: 1 },
  //   ];
  const statusOptions = [
    { label: "Disable", id: 0 },
    { label: "Enable", id: 1 },
  ];

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("name_ar", selectedRow?.name_ar);
      formik.setFieldValue("name_en", selectedRow?.name_en);
      formik.setFieldValue("status", +selectedRow?.status);
      dispatch({ type: RESET_SPECIFIC_PROVINCE });
    }
  }, [selectedRow]);

  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      status: "",
    },
    validationSchema: () => {
      return Yup.object({
        name_ar: Yup.string().required(t("Arabic Name is required")),
        name_en: Yup.string().required(t("Name is required")),
        status: Yup.number().required(t("Status is required")),
      });
    },

    onSubmit: async (data) => {
      if (selectedRow) {
        const updateData = { ...data, province_id: selectedRow.id };
        dispatch(editProvince(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getProvinceList(1, 10));
            setSelectedRow(null);
            setShowForm(false);
            setSelectedProducts(null);
          }
        });
      } else {
        dispatch(addProvince(data)).then((success) => {
          if (success) {
            formik.resetForm();
            setShowForm(false);
            setSelectedRow(null);
            dispatch(getProvinceList(1, 10));
            setSelectedProducts(null);
          }
        });
      }
    },
  });

  useEffect(() => {
    if (provinceId) {
      dispatch(getSpecificProvinceById(provinceId));
    }
  }, [provinceId]);
  return (
    <Dialog
      header={selectedRow ? "Edit Province" : "Add Province"}
      visible={showForm}
      className=" !w-11/12 sm:!w-1/2"
      onHide={() => {
        setShowForm(false);
        formik.resetForm();
        setSelectedRow(null);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              <div className="">
                <span className="p-float-label w-full">
                  <InputText
                    id="name_en"
                    name="name_en"
                    // className="w-full text-lg p-primary-input"
                    className={`w-full text-lg p-primary-input ${
                      validateErrors?.quantity?.length > 0
                        ? "border-vError"
                        : ""
                    }`}
                    value={formik.values.name_en}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="quantity"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
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

              <div className="">
                <span className="p-float-label w-full">
                  <InputText
                    id="name_ar"
                    name="name_ar"
                    // className="w-full text-lg p-primary-input"
                    className={`w-full text-lg p-primary-input ${
                      validateErrors?.quantity?.length > 0
                        ? "border-vError"
                        : ""
                    }`}
                    value={formik.values.name_ar}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="quantity"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Arabic Name")}
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

              <div className="">
                <span className="p-float-label w-full">
                  <Dropdown
                    id="status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    options={statusOptions}
                    optionLabel="label"
                    optionValue="id"
                    className="w-full text-lg"
                    // className={`w-full text-lg ${
                    //   validateErrors?.status?.length > 0
                    //     ? "border-vError"
                    //     : ""
                    // }`}
                    // filter
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

                {validateErrors?.status?.length > 0
                  ? validateErrors.status.map((err, index) => (
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
                  setShowForm(false);
                  setSelectedProducts(null);
                }}
              />
              <Button
                disabled={loading}
                label={selectedRow ? t("Update") : t("Create")}
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
