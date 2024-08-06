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
import { getProvinces } from "../../../../store/AsyncMethod/GetDataMethod";
import {
  addCity,
  editCity,
  getCityList,
  getSpecificCityById,
} from "../../../../store/AsyncMethod/AdminMethod";
import { RESET_SPECIFIC_City } from "../../../../store/Types/AdminTypes";
import { Dialog } from "primereact/dialog";

export default function AddCity({
  setDialogVisible,
  dialogVisible,
  selectedRow,
  setSelectedRow,
  setSelectedProducts,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cityId } = useParams();
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  const { provinces } = useSelector((state) => state.GetDataReducer);

  const { specificCity } = useSelector((state) => state.AdminReducer);

  const statusOptions = [
    { label: "Disable", id: 0 },
    { label: "Enable", id: 1 },
  ];

  const codOptions = [
    { label: "Available", id: 1 },
    { label: "Unavailable", id: 0 },
  ];

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("name_ar", selectedRow?.name_ar);
      formik.setFieldValue("name_en", selectedRow?.name_en);
      formik.setFieldValue("status", +selectedRow?.status);
      formik.setFieldValue("cod", +selectedRow?.cod);
      formik.setFieldValue("province_id", +selectedRow?.province_id);
      dispatch({ type: RESET_SPECIFIC_City });
    }
  }, [selectedRow]);

  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      status: "",
      cod: "",
      province_id: "",
    },
    validationSchema: () => {
      return Yup.object({
        name_ar: Yup.string().required(t("Arabic Name is required")),
        name_en: Yup.string().required(t("Name is required")),
        status: Yup.number().required(t("Status is required")),
        cod: Yup.number().required(t("COD is required")),
        province_id: Yup.number().required(t("Province is required")),
      });
    },

    onSubmit: async (data) => {
      if (selectedRow) {
        const updateData = { ...data, city_id: selectedRow.id };
        dispatch(editCity(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getCityList(1, 10));
            setDialogVisible(false);
            setSelectedRow(null);
            setSelectedProducts(null);
          }
        });
      } else {
        dispatch(addCity(data)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            setSelectedRow(null);
            dispatch(getCityList(1, 10));
            setSelectedProducts(null);
          }
        });
      }
    },
  });

  useEffect(() => {
    dispatch(getProvinces());
  }, []);

  useEffect(() => {
    if (cityId) {
      dispatch(getSpecificCityById(cityId));
    }
  }, [cityId]);
  return (
    <Dialog
      header={selectedRow ? "Edit City" : "Add City"}
      visible={dialogVisible}
      className=" !w-11/12 sm:!w-1/2"
      onHide={() => {
        setDialogVisible(false);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-3 mt-4">
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
                    id="province_id"
                    name="province_id"
                    value={formik.values.province_id}
                    onChange={formik.handleChange}
                    options={provinces}
                    optionLabel={(option) =>
                      i18next.language === "en"
                        ? option.name_en
                        : option.name_ar
                    }
                    optionValue="id"
                    className="w-full text-lg"
                    // className={`w-full text-lg ${
                    //   validateErrors?.province_id?.length > 0
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
                    htmlFor="province_id"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Select Province")}
                  </label>
                </span>
                {formik.touched.province_id && formik.errors.province_id && (
                  <div className="p-error">{formik.errors.province_id}</div>
                )}

                {validateErrors?.province_id?.length > 0
                  ? validateErrors.province_id.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null}
              </div>
              <div className="">
                <span className="p-float-label w-full">
                  <Dropdown
                    id="cod"
                    name="cod"
                    value={formik.values.cod}
                    onChange={formik.handleChange}
                    options={codOptions}
                    optionLabel="label"
                    optionValue="id"
                    className="w-full text-lg"
                    // className={`w-full text-lg ${
                    //   validateErrors?.cod?.length > 0
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
                    htmlFor="cod"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Select COD")}
                  </label>
                </span>
                {formik.touched.cod && formik.errors.cod && (
                  <div className="p-error">{formik.errors.cod}</div>
                )}

                {validateErrors?.cod?.length > 0
                  ? validateErrors.cod.map((err, index) => (
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
                  setDialogVisible(false);
                  setSelectedProducts(null);
                }}
              />
              <Button
                disabled={loading}
                label={cityId ? t("Update") : t("create")}
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
