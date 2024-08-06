import { useFormik } from "formik";
import i18next from "i18next";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  getCities,
  getZonessById,
} from "../../../../store/AsyncMethod/GetDataMethod";
import {
  addStore,
  editStore,
  getSpecificStoreById,
  getStoreList,
} from "../../../../store/AsyncMethod/AdminMethod";
import { RESET_SPECIFIC_STORE } from "../../../../store/Types/AdminTypes";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

export default function AddStore({
  setShowForm,
  showForm,
  selectedRow,
  setSelectedProducts,
  setSelectedRow,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { validateErrors } = useSelector((state) => state.AuthReducer);

  const { cities, neighborhoods, zones } = useSelector(
    (state) => state.GetDataReducer
  );

  const { specificStore } = useSelector((state) => state.AdminReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  const statusOptions = [
    { label: "Disable", id: 0 },
    { label: "Enable", id: 1 },
  ];

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("name_ar", selectedRow?.name_ar);
      formik.setFieldValue("name_en", selectedRow?.name_en);
      formik.setFieldValue("status", +selectedRow?.status);
      formik.setFieldValue("zone_id", +selectedRow?.zone?.id);
      formik.setFieldValue("city_id", +selectedRow?.city?.id);
      dispatch({ type: RESET_SPECIFIC_STORE });
    }
  }, [selectedRow]);

  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      status: "",
      zone_id: "",
      city_id: "",
    },
    validationSchema: () => {
      return Yup.object({
        name_ar: Yup.string().required(t("Arabic Name is required")),
        name_en: Yup.string().required(t("Name is required")),
        status: Yup.number().required(t("Status is required")),
        zone_id: Yup.number().required(t("Zone is required")),
        city_id: Yup.number().required(t("City is required")),
      });
    },

    onSubmit: async (data) => {
      if (selectedRow) {
        const updateData = { ...data, store_id: selectedRow?.id };
        dispatch(editStore(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            setShowForm(false);
            setSelectedRow(null);
            dispatch(getStoreList(1, 10));
            setSelectedProducts(null);
          }
        });
      } else {
        dispatch(addStore(data)).then((success) => {
          if (success) {
            formik.resetForm();
            setShowForm(false);
            setSelectedRow(null);
            dispatch(getStoreList(1, 10));
            setSelectedProducts(null);
          }
        });
      }
    },
  });

  useEffect(() => {
    if (formik.values.city_id) {
      dispatch(getZonessById(formik.values.city_id));
    }
  }, [formik.values.city_id]);

  useEffect(() => {
    dispatch(getCities());
  }, []);

  useEffect(() => {
    if (storeId) {
      dispatch(getSpecificStoreById(storeId));
    }
  }, [storeId]);

  return (
    <Dialog
      header={selectedRow ? "Edit Store" : "Add Store"}
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
      <form onSubmit={formik.handleSubmit}>
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div className="">
              <span className="p-float-label w-full">
                <InputText
                  id="name_en"
                  name="name_en"
                  // className="w-full text-lg p-primary-input"
                  className={`w-full text-lg p-primary-input ${
                    validateErrors?.quantity?.length > 0 ? "border-vError" : ""
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
                    validateErrors?.quantity?.length > 0 ? "border-vError" : ""
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
                  id="city_id"
                  name="city_id"
                  value={formik.values.city_id}
                  onChange={formik.handleChange}
                  options={cities}
                  optionLabel={(option) =>
                    i18next.language === "en" ? option.name_en : option.name_ar
                  }
                  optionValue="id"
                  className="w-full text-lg"
                  // className={`w-full text-lg ${
                  //   validateErrors?.city_id?.length > 0
                  //     ? "border-vError"
                  //     : ""
                  // }`}
                  filter
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
                  htmlFor="city_id"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("select_city")}
                </label>
              </span>
              {formik.touched.city_id && formik.errors.city_id && (
                <div className="p-error">{formik.errors.city_id}</div>
              )}

              {validateErrors?.city_id?.length > 0
                ? validateErrors.city_id.map((err, index) => (
                    <div key={index} className="p-error">
                      {err}
                    </div>
                  ))
                : null}
            </div>

            <div className="">
              <span className="p-float-label w-full">
                <Dropdown
                  id="zone_id"
                  name="zone_id"
                  value={formik.values.zone_id}
                  onChange={formik.handleChange}
                  options={zones}
                  optionLabel={(option) =>
                    i18next.language === "en" ? option.name_en : option.name_ar
                  }
                  optionValue="id"
                  className="w-full text-lg"
                  // className={`w-full text-lg ${
                  //   validateErrors?.zone_id?.length > 0
                  //     ? "border-vError"
                  //     : ""
                  // }`}
                  filter
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
                  htmlFor="zone_id"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("select_zone")}
                </label>
              </span>
              {formik.touched.zone_id && formik.errors.zone_id && (
                <div className="p-error">{formik.errors.zone_id}</div>
              )}

              {validateErrors?.zone_id?.length > 0
                ? validateErrors.zone_id.map((err, index) => (
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
                  filter
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
                setSelectedRow(null);
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
    </Dialog>
  );
}
