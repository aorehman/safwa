import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import i18next from "i18next";
import {
  deleteZone,
  getZoneList,
} from "../../../../store/AsyncMethod/AdminMethod";
import CustomPaginator from "../../../OtherComponents/customPaginator";
import AddZone from "./AddZone";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

export default function ZonesTable({ page, setPage, rows, setRows }) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.AuthReducer);
  const { zoneList } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const toast = useRef(null);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const acceptMultiple = () => {
    if (selectedProducts) {
      const idsArray = selectedProducts.map((obj) => obj.id);

      if (selectedProducts.length !== 0) {
        dispatch(deleteZone(idsArray)).then((success) => {
          if (success) {
            setSelectedProducts(null);
            dispatch(getZoneList(page, rows));
          }
        });
      }
    } else {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Please select an order.",
      });
    }
  };

  const rejectMultiple = () => {
    setShowMultipleDelDialog(false);
  };

  useEffect(() => {
    if (zoneList) {
      setTotalRecords(zoneList.total);
    }
  }, [zoneList]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex lg:justify-between flex-col lg:flex-row lg:items-center items-start p-2">
        <div className="p-input-icon-left w-[70%] lg:w-6/12 md:w-full mb-2 lg:mb-0">
          <i className="pi pi-search dark:text-white" />
          <InputText
            className="w-full p-primary-input !pl-10 font-normal"
            type="text"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder={t("search...")}
          />
        </div>

        <div className="flex flex-col lg:flex-row md:flex-row w-full lg:justify-end justify-start ">
          <div className="flex lg:mx-2 md:mx-2">
            <Button
              label={t("Add Zone")}
              icon="pi pi-plus"
              className="p-primary-btn dark:text-white dark:bg-primary"
              onClick={() => setShowForm(true)}
              pt={{
                icon: { className: "rtl:mx-2" },
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const renderFooter = () => {
    return (
      <div className="flex justify-between pt-2">
        <Button
          label={t("Delete")}
          icon="pi pi-trash"
          className="p-orange-btn dark:text-white  my-3"
          onClick={() => setShowMultipleDelDialog(true)}
          pt={{
            icon: { className: "rtl:mx-2" },
          }}
        />
        <CustomPaginator
          rows={rows}
          totalRecords={totalRecords}
          setPage={setPage}
          setRows={setRows}
        />
      </div>
    );
  };

  const footer = renderFooter();

  const feeBody = (rowData) => {
    return `SAR ${rowData?.fee}`;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData?.status == 0 ? "Disabled" : "Enabled"}
        className={getSeverity(rowData?.status)}
      ></Tag>
    );
  };

  const getSeverity = (status) => {
    switch (parseInt(status)) {
      case 1:
        return "bg-green-500";
      case 0:
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getZoneList(page, rows));
    }
  }, [page, rows]);

  return (
    <>
      <div>
        <div className="px-1">
          <DataTable
            value={zoneList?.data || []}
            tableStyle={{ minWidth: "50rem" }}
            scrollable
            scrollHeight="60vh"
            stripedRows
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            footer={footer}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            onRowClick={(e) => {
              setShowForm(true);
              setSelectedRow(e.data);
            }}
            size="small"
            pt={{
              header: { className: "px-4 py-2 " },
              footer: { className: "px-4 py-2 " },
            }}
          >
            <Column
              className="text-start"
              selectionMode="multiple"
              headerStyle={{ width: "3rem " }}
              headerClassName="p-selection-column-header"
            ></Column>

            <Column
              className="text-start capitalize"
              field="name_en"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Name")}
              style={{ minWidth: "150px" }}
            />
            <Column
              className="text-start capitalize"
              field="name_ar"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Arabic Name")}
              style={{ minWidth: "150px" }}
            />

            <Column
              className="text-start"
              field="city.name_en"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("City Name")}
              style={{ minWidth: "160px" }}
            />

            <Column
              className="text-start"
              field="status"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Status")}
              style={{ minWidth: "160px" }}
              body={statusBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
      <AddZone
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setShowForm={setShowForm}
        showForm={showForm}
        setSelectedProducts={setSelectedProducts}
      />

      <ConfirmDialog
        message="Do you want to delete this record?"
        header="Delete confirmation"
        icon="pi pi-info-circle"
        accept={acceptMultiple}
        reject={rejectMultiple}
        acceptLabel="Yes"
        visible={showMultipleDelDialog}
        onHide={() => setShowMultipleDelDialog(false)}
        pt={{
          acceptButton: {
            className: "p-orange-btn",
          },
          rejectButton: {
            className: "p-primary-btn",
          },
          root: {
            className: "w-full sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mx-2",
          },
          icon: {
            className: "mx-2",
          },
        }}
      />

      <Toast position="bottom-right" ref={toast} />
    </>
  );
}
