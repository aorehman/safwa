import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useTranslation } from "react-i18next";
import {
  deleteAccountant,
  getAccountantList,
} from "../../../../store/AsyncMethod/AdminMethod";
import { Avatar } from "primereact/avatar";
import CustomPaginator from "../../../OtherComponents/customPaginator";
import { useDispatch, useSelector } from "react-redux";
import AddAccountant from "./AddAccountant";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function AccountantTable({ page, setPage, rows, setRows }) {
  const { t } = useTranslation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const { accountantList } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const toast = useRef(null);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const acceptMultiple = () => {
    if (selectedProducts) {
      const idsArray = selectedProducts.map((obj) => obj.id);

      if (selectedProducts.length !== 0) {
        dispatch(deleteAccountant(idsArray)).then((success) => {
          if (success) {
            setSelectedProducts(null);
            dispatch(getAccountantList(page, rows));
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

  const getFirstLetter = (name) => {
    const firstLetter = name
      ? name?.split("").splice(0, 1).join().toUpperCase()
      : "S";
    return firstLetter;
  };
  useEffect(() => {
    if (accountantList) {
      setTotalRecords(accountantList.total);
    }
  }, [accountantList]);

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
          <div className="flex">
            <Button
              label={t("Add Accountant")}
              icon="pi pi-plus"
              className="p-primary-btn dark:text-white dark:bg-primary"
              onClick={() => setDialogVisible(true)}
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

  const representativeBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        {rowData.profile_photo ? (
          <img
            alt={rowData.first_name}
            src={rowData.profile_photo}
            className="w-10 h-10"
          />
        ) : (
          <Avatar
            label={getFirstLetter(rowData?.first_name)}
            className=" dark:text-white dark:bg-primary cursor-pointer w-10 h-10"
            shape="circle"
            pt={{
              root: { className: "!w-10 !h-10" },
              label: { className: "!text-lg !font-medium" },
            }}
          />
        )}
        <span>{rowData.first_name + " " + rowData.last_name}</span>
      </div>
    );
  };

  // const statusBodyTemplate = (rowData) => {
  //   return (
  //     <Tag
  //       value={
  //         i18next.language === "en"
  //           ? rowData.order_status.name_en
  //           : rowData.order_status.name_ar
  //       }
  //       className={getSeverity(rowData.order_status.id)}
  //     ></Tag>
  //   );
  // };

  const getSeverity = (orderId) => {
    switch (parseInt(orderId)) {
      case 9:
        return "bg-blue-500";

      case 5:
        return "bg-green-500";

      case 31:
        return "bg-gray-500";

      case 2:
        return "bg-cyan-600";

      case 3:
        return "bg-teal-500";

      case 8:
        return "bg-purple-500";

      case 7:
        return "bg-purple-500";

      case 17:
        return "bg-yellow-500";

      case 4:
        return "bg-pink-500";

      case 14:
        return "bg-red-500";
      default:
        return null;
    }
  };

  function formatDateTime12Hour(rowData) {
    const date = new Date(rowData?.created_at);

    // Extract date components
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    // Extract time components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct formatted date and time string
    const formattedDateTime = `${year}-${month}-${day} ${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedDateTime;
  }

  useEffect(() => {
    if (user) {
      dispatch(getAccountantList(page, rows));
    }
  }, [page, rows]);
  return (
    <>
      <div>
        <div className="px-1">
          <DataTable
            value={accountantList?.data || []}
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
              setDialogVisible(true);
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
              field="phone"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Phone Number")}
              style={{ minWidth: "150px" }}
            />

            <Column
              className="text-start"
              field="email"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("E-mail")}
              style={{ minWidth: "150px" }}
            />

            <Column
              className="text-start"
              field="created_at"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Created At")}
              style={{ minWidth: "160px" }}
              body={formatDateTime12Hour}
            />

            {/* <Column
              field="store.name_en"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Store Name")}
              style={{ minWidth: "150px" }}
              className="text-start"
            /> */}

            {/* <Column
              header={t("status")}
              field="status"
              className="text-start"
              headerClassName="p-status"
            ></Column> */}
          </DataTable>
        </div>
      </div>
      <AddAccountant
        setDialogVisible={setDialogVisible}
        dialogVisible={dialogVisible}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
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

export default AccountantTable;
