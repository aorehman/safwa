import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addAgreement,
  editAgreement,
  getBClientAgreements,
} from "../../../../store/AsyncMethod/AdminMethod";
import { Avatar } from "primereact/avatar";
function AddAgreement({
  setShowForm,
  showForm,
  selectedRow,
  setSelectedRow,
  selectedForm,
  setSelectedForm,
  setSelectedProducts,
}) {
  const getFirstLetter = (name) => {
    const firstLetter = name
      ? name.split("").splice(0, 1).join().toUpperCase()
      : "S";
    return firstLetter;
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bClientList } = useSelector((state) => state.GetDataReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  const validation = yup.object().shape({
    client_id: yup
      .number("Client id must be a number")
      .required("Client is required"),
    withdraw_days: yup
      .number("Withdraw days must be a number")
      .required("Withdraw days are required"),
  });
  const formik = useFormik({
    initialValues: { client_id: "", withdraw_days: "" },
    validationSchema: validation,
    onSubmit: async () => {
      if (selectedRow) {
        const updateData = {
          ...formik.values,
        };
        dispatch(editAgreement(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getBClientAgreements(1, 10));
            setShowForm(false);
            setSelectedRow(null);
            setSelectedProducts(null);
          }
        });
      } else {
        const updateData = {
          ...formik.values,
        };
        dispatch(addAgreement(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            setShowForm(false);
            dispatch(getBClientAgreements(1, 10));
            setSelectedRow(null);
            setSelectedProducts(null);
          }
        });
      }
    },
  });
  const days = [
    {
      label: "Weekly",
      value: 7,
    },
    {
      label: "Fortnight",
      value: 15,
    },
    ,
    {
      label: "Monthly",
      value: 30,
    },
  ];
  const representativeBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        {rowData?.profile_photo ? (
          <img
            alt={rowData?.first_name}
            src={rowData?.profile_photo}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Avatar
            label={getFirstLetter(rowData?.fullName)}
            className=" dark:text-white dark:bg-primary cursor-pointer w-10 h-10"
            shape="circle"
            pt={{
              root: { className: "!w-10 !h-10" },
              label: { className: "!text-lg !font-medium" },
            }}
          />
        )}
        <span>{rowData?.fullName}</span>
      </div>
    );
  };
  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("client_id", selectedRow?.client?.id);
      formik.setFieldValue("withdraw_days", +selectedRow?.withdraw_days);
    }
  }, [selectedRow]);

  return (
    <Dialog
      header={selectedRow ? "Edit Agreement" : "Add Agreement"}
      visible={showForm}
      className=" lg:!w-3/4"
      style={{ width: "90vw" }}
      onHide={() => {
        setShowForm(false);
        formik.resetForm();
        setSelectedRow(null);
        setSelectedProducts(null);
      }}
      pt={{
        content: { className: "!px-3 !py-0 " },
        header: { className: "!pt-3 !pr-3 !pl-3 !pb-0 " },
      }}
    >
      <div className={`rtl:ml-5 ${selectedRow?.role_id ? "mt-2" : ""}`}>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div>
            <div className=" pb-2  pl-2 grid grid-cols-1 lg:grid-cols-3 mt-5 gap-3">
              <div className="">
                <span className="p-float-label w-full">
                  <Dropdown
                    id="client_id"
                    name="client_id"
                    value={formik.values.client_id}
                    onChange={formik.handleChange}
                    options={bClientList}
                    optionLabel="fullName"
                    itemTemplate={representativeBodyTemplate}
                    optionValue="id"
                    className="w-full text-lg"
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
                    htmlFor="cl"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Select Client")}
                  </label>
                </span>
                {formik.touched?.client_id && formik.errors?.client_id && (
                  <div className="p-error">{formik.errors?.client_id}</div>
                )}
              </div>

              <div className="">
                <span className="p-float-label w-full">
                  <Dropdown
                    id="withdraw_days"
                    name="withdraw_days"
                    value={formik.values.withdraw_days}
                    onChange={formik.handleChange}
                    options={days}
                    optionLabel={(option) => option.label}
                    optionValue="value"
                    className="w-full text-lg"
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
                    htmlFor="withdraw_days"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("Select Withdraw Days")}
                  </label>
                </span>
                {formik.touched?.withdraw_days &&
                  formik.errors?.withdraw_days && (
                    <div className="p-error">
                      {formik.errors?.withdraw_days}
                    </div>
                  )}

                {/* {validateErrors?.neighborhood_id?.length > 0
                  ? validateErrors.neighborhood_id.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null} */}
              </div>
            </div>
          </div>
          <div className="my-3">
            <div className=" flex justify-end gap-4">
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
  );
}

export default AddAgreement;
