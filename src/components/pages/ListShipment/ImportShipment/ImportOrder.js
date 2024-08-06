import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAllOrders,
  importShipment,
} from "../../../../store/AsyncMethod/ShipmentMethod";
import { useDispatch, useSelector } from "react-redux";
import { getSampleFile } from "../../../../store/AsyncMethod/GetDataMethod";

export default function ImportOrder({ setDialogVisible, page, rows }) {
  const [totalSize, setTotalSize] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sampleUrl } = useSelector((state) => {
    return state.GetDataReducer;
  });
  const { loading } = useSelector((state) => state.AuthReducer);

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;

    const downloadSampleFile = () => {
      dispatch(getSampleFile());
    };
    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          paddingLeft: 0,
        }}
      >
        {chooseButton}
        <Button
          type="button"
          onClick={() => {
            downloadSampleFile();
          }}
          label="Sample File"
          icon="pi pi-download"
          className="p-primary-btn"
        />
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center" style={{ width: "40%" }}>
          <img
            alt="Excel Icon"
            role="presentation"
            src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png"
            width={100}
          />
          <span className="flex flex-col text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        {/* <Tag value={props.formatSize} className="px-3 py-2 bg-yellow-500" /> */}
        <Button
          type="button"
          icon="pi pi-times"
          rounded
          className="p-orange-btn"
          onClick={() => {
            onTemplateRemove(file, props.onRemove);
            formik.resetForm();
          }}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex items-center flex-col">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Excel File Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-file-excel",
    className: "p-primary-btn",
  };

  const formik = useFormik({
    initialValues: {
      excelFile: null,
    },
    validationSchema: Yup.object({
      excelFile: Yup.mixed()
        .required(t("excel_file_required"))
        .test(
          "fileFormat",
          "Invalid file format. Please upload an Excel file.",
          (value) => {
            // Ensure the value is a File object
            if (value instanceof File) {
              // Check the file type or other conditions if needed
              return (
                value.type === "application/vnd.ms-excel" ||
                value.type ===
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              );
            }
            return false;
          }
        ),
    }),
    onSubmit: async (data) => {
      const formData = new FormData();

      formData.append("excel_file", data.excelFile);
      dispatch(importShipment(formData)).then((success) => {
        if (success) {
          setDialogVisible(false);
          dispatch(getAllOrders(page, rows));
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FileUpload
          name="excelFile"
          accept=".xls,.xlsx"
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          progressBarTemplate={() => <></>}
          onSelect={(e) => {
            if (e.files.length > 0) {
              formik.setFieldError("excelFile", "");
              formik.setFieldValue("excelFile", e.files[0]);
            }
          }}
          onClear={() => {
            formik.setFieldValue("excelFile", null);
          }}
          onError={(e) => {
            formik.setFieldError("excelFile", "Error on uploading file.");
          }}
        />
        {formik.touched.excelFile && formik.errors.excelFile && (
          <div className="p-error">{formik.errors.excelFile}</div>
        )}

        <div className="mt-4 flex justify-center gap-4">
          <Button
            type="button"
            label={t("cancel")}
            icon="pi pi-times"
            className="p-orange-btn px-10 dark:text-white"
            onClick={() => {
              setDialogVisible(false);
              formik.resetForm();
            }}
          />
          <Button
            disabled={loading}
            type="submit"
            label={t("submit")}
            icon="pi pi-check"
            className="p-primary-btn px-10 dark:text-white dark:bg-primary"
          />
        </div>
      </form>
    </div>
  );
}
