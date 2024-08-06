import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Paginator } from "primereact/paginator";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import i18next from "i18next";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import AddCollectionCharges from "./AddCollectionCharges";
export default function CollentionChargesTable() {
  const { t } = useTranslation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer);
  const [selectedRow, setSelectedRow] = useState(null);
  const { collectionCharges } = useSelector((state) => state.AdminReducer);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    if (collectionCharges) {
      setTotalRecords(collectionCharges.total);
    }
  }, [collectionCharges]);

  //   const onPageChange = (event) => {
  //     setPage(event.page + 1);
  //     setRows(event.rows);
  //     setFirst(event.first);
  //   };

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
            {/* <Button
              label={t("new_shipment")}
              icon="pi pi-plus"
              className="p-primary-btn dark:text-white dark:bg-primary"
              onClick={() => navigate("/client/add-shipment")}
              pt={{
                icon: { className: "rtl:mx-2" },
              }}
            /> */}
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const renderFooter = () => {
    return (
      <div className="flex justify-end pt-2">
        {/* <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[5, 10, 20, 30]}
          onPageChange={onPageChange}
          template={template1}
          className="!bg-transparent"
        /> */}
      </div>
    );
  };

  const footer = renderFooter();

  const feeBody = (rowData) => {
    return `SAR ${rowData?.fee}`;
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

  //   useEffect(() => {
  //     if (user) {
  //       dispatch(getKeeperList(page, rows));
  //     }
  //   }, [page, rows]);
  return (
    <>
      <div>
        <div className="px-1">
          <DataTable
            value={collectionCharges || []}
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
            {/* <Column
            className="text-start"
            selectionMode="multiple"
            headerStyle={{ width: "3rem " }}
            headerClassName="p-selection-column-header"
          ></Column> */}

            <Column
              className="text-start capitalize"
              field="city"
              sortable
              pt={{ headerTitle: { className: "mx-2" }, sortIcon: "mr-2" }}
              header={t("City")}
              style={{ minWidth: "150px" }}
            />
            <Column
              className="text-start capitalize"
              field="area"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Area")}
              style={{ minWidth: "150px" }}
            />

            <Column
              className="text-start"
              field="fee"
              sortable
              pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
              header={t("Fee")}
              style={{ minWidth: "150px" }}
              body={feeBody}
            />
          </DataTable>
        </div>
      </div>
      <AddCollectionCharges
      setSelectedProducts={setSelectedProducts}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
        setDialogVisible={setDialogVisible}
        dialogVisible={dialogVisible}
      />
      
    </>
  );
}
