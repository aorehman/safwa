import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tag } from "primereact/tag";
import {
  deleteBClientAgreement,
  getBClientAgreements,
} from "../../../../store/AsyncMethod/AdminMethod";
import CustomPaginator from "../../../OtherComponents/customPaginator";
import { Avatar } from "primereact/avatar";
import AddAgreement from "./AddAgreement";
import { getBClients } from "../../../../store/AsyncMethod/GetDataMethod";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function AgreementTable({ page, setPage, rows, setRows }) {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const { agreementList } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedForm, setSelectedForm] = useState(3);
  const toast = useRef(null);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const acceptMultiple = () => {
    if (selectedProducts) {
      const idsArray = selectedProducts.map((obj) => obj.code);

      if (selectedProducts.length !== 0) {
        dispatch(deleteBClientAgreement(idsArray)).then((success) => {
          if (success) {
            setSelectedProducts(null);
            dispatch(getBClientAgreements(page, rows));
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
    if (agreementList) {
      setTotalRecords(agreementList.total);
    }
  }, [agreementList]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  useEffect(() => {
    dispatch(getBClients());
  }, []);
  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex lg:justify-between flex-col lg:flex-row lg:items-center items-start py-2">
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
              label={t("Add Agreement")}
              icon="pi pi-plus"
              className="p-primary-btn dark:text-white dark:bg-primary"
              onClick={() => {
                setShowForm(true);
                setSelectedForm("3");
              }}
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
      case 3:
        return "bg-indigo-500";
      case 2:
        return "bg-amber-500";
      default:
        return "bg-green-500";
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getBClientAgreements(page, rows));
    }
  }, [page, rows]);

  const getFirstLetter = (name) => {
    const firstLetter = name
      ? name.split("").splice(0, 1).join().toUpperCase()
      : "S";
    return firstLetter;
  };
  const representativeBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        {rowData.profile_photo ? (
          <img
            alt={rowData?.client?.name}
            src={rowData?.client?.profile_photo}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Avatar
            label={getFirstLetter(rowData?.client?.name)}
            className=" dark:text-white dark:bg-primary cursor-pointer w-10 h-10"
            shape="circle"
            pt={{
              root: { className: "!w-10 !h-10" },
              label: { className: "!text-lg !font-medium" },
            }}
          />
        )}
        <span>{rowData?.client?.name}</span>
      </div>
    );
  };
  const RoleBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData?.role_id === "3" ? "Personal" : "Buisness"}
        className={` ${getSeverity(rowData?.role_id)} p-3`}
      ></Tag>
    );
  };
  return (
    <>
      <div>
        <div className="px-1">
          <DataTable
            value={agreementList?.data || []}
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
              className="text-start"
              field="representative"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Profile")}
              style={{ minWidth: "150px" }}
              body={representativeBodyTemplate}
            />

            <Column
              className="text-start"
              field="withdraw_days"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Withdraw Days")}
              style={{ minWidth: "160px" }}
              body={(rowData) => rowData?.withdraw_days + " Days"}
            />

            <Column
              className="text-start"
              field="remaining_days"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Remaining Days")}
              style={{ minWidth: "160px" }}
              body={(rowData) => rowData?.remaining_days + " Days"}
            />

            {/* <Column
            className="text-start"
            field="status"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("Status")}
            style={{ minWidth: "160px" }}
            body={statusBodyTemplate}
          /> */}
          </DataTable>
        </div>
      </div>
      <AddAgreement
        setSelectedProducts={setSelectedProducts}
        setShowForm={setShowForm}
        showForm={showForm}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
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

export default AgreementTable;
