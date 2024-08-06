import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getAllOrders,
  getOrdersByStatus,
} from "../../../../store/AsyncMethod/ShipmentMethod";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import i18next from "i18next";
import { Dialog } from "primereact/dialog";
import ImportOrder from "../ImportShipment/ImportOrder";
import CustomPaginator from "../../../OtherComponents/customPaginator";
import { Toast } from "primereact/toast";
import { getkeeperWayBill } from "../../../../store/AsyncMethod/KeeperMethod";

export default function ShipmentTable({ page, setPage, rows, setRows }) {
  const { t } = useTranslation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);

  const { orderByStatus, allOrders } = useSelector(
    (state) => state.ShipmentReducer
  );
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [status, setStatus] = useState(0);
  const location = useLocation();
  const parts = location.pathname.split("/");
  const toast = useRef(null);

  let parentPath = "";
  if (parts.length >= 2) {
    parentPath = parts.slice(0, 2).join("/");
  }
  console.log(parentPath);
  useEffect(() => {
    if (allOrders) {
      setTotalRecords(allOrders.total);
    }
  }, [allOrders]);

  const statusOptions = [
    { name: t("all_shipment"), code: null },
    { name: t("picked_up"), code: "2" },
    { name: t("recieve_in_bound"), code: "3" },
    { name: t("delivered"), code: "5" },
    { name: t("out_for_delivery"), code: "4" },
    { name: t("transit_to_destination"), code: "7" },
    { name: t("transit_to_origin"), code: "8" },
    { name: t("created"), code: "9" },
    { name: t("canceled"), code: "14" },
    { name: t("postpone"), code: "17" },
    { name: t("going_for_pickup"), code: "18" },
  ];

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const handleStatusChange = (e) => {
    setSelectedOption(e.value);
    const status = +e.value;
    setStatus(status);
    if (status) {
      dispatch(getOrdersByStatus(status, page, rows));
    } else {
      dispatch(getAllOrders(page, rows));
    }
  };

  const printWayBill = () => {
    if (!selectedProducts || selectedProducts.length === 0) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Please select an order.",
      });
    } else {
      const orders = selectedProducts.map((order) => order.order_code);
      dispatch(getkeeperWayBill({ order_codes: orders }));
      setSelectedProducts([]);
    }
  };

  useEffect(() => {
    setTotalRecords(orderByStatus?.total);
  }, [orderByStatus]);

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex lg:justify-between flex-col lg:flex-row lg:items-center items-start p-2 ">
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

        <div className="flex flex-col lg:flex-row md:flex-row w-full lg:justify-end justify-start  ">
          <div className="p-input-icon-left  lg:w-3/12 w-[70%] mb-2 lg:mb-0">
            <i className="pi pi-search" />
            <Dropdown
              value={selectedOption}
              onChange={(e) => {
                handleStatusChange(e);
              }}
              filter
              options={statusOptions}
              optionLabel="name"
              optionValue="code"
              showClear
              placeholder={t("all_shipment")}
              className=" "
              pt={{
                root: { className: "w-full md:w-full p-primary-input" },
                input: { className: "w-full p-primary-input" },
                filterInput: { className: "mr-0" },
                filterIcon: {
                  className: "rtl:right-auto rtl:left-4 dark:text-white",
                },
              }}
            />
          </div>

          <div className="flex lg:mx-2 md:mx-2">
            {user.role_id == "2" ||
            user.role_id == "1" ||
            user.role_id == "10" ? (
              <>
                <Button
                  label={t("Import Shipments")}
                  icon="pi pi-file-import"
                  className="p-primary-btn dark:text-white dark:bg-primary mx-1"
                  onClick={() => setDialogVisible(true)}
                  pt={{
                    icon: { className: "rtl:mx-2" },
                  }}
                />
                <Button
                  label={t("new_shipment")}
                  icon="pi pi-plus"
                  className="p-primary-btn dark:text-white dark:bg-primary mx-1"
                  onClick={() => navigate(`${parentPath}/add-shipment`)}
                  pt={{
                    icon: { className: "rtl:mx-2" },
                  }}
                />
              </>
            ) : (
              <Button
                label={t("new_shipment")}
                icon="pi pi-plus"
                className="p-primary-btn dark:text-white dark:bg-primary"
                onClick={() => navigate("/client/add-shipment")}
                pt={{
                  icon: { className: "rtl:mx-2" },
                }}
              />
            )}
          </div>
        </div>

        <Dialog
          visible={dialogVisible}
          header={
            <p className="text-2xl font-bold text-color mr-6 text-primary dark:text-white">
              {t("Import Shipment")}
            </p>
          }
          onHide={() => setDialogVisible(false)}
          className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 mx-2"
        >
          <ImportOrder
            setDialogVisible={setDialogVisible}
            page={page}
            rows={rows}
          />
        </Dialog>
      </div>
    );
  };

  const header = renderHeader();

  const renderFooter = () => {
    return (
      <div className="flex justify-between">
        <div>
          <Button
            disabled={loading}
            label={t("print_waybill")}
            icon="pi pi-file"
            className="p-primary-btn dark:text-white dark:bg-primary my-3"
            onClick={printWayBill}
            pt={{
              icon: { className: "rtl:mx-2" },
            }}
          />
          <Toast position="bottom-right" ref={toast} />
        </div>
        <div>
          <CustomPaginator
            rows={rows}
            totalRecords={totalRecords}
            setPage={setPage}
            setRows={setRows}
          />
        </div>
      </div>
    );
  };

  const footer = renderFooter();

  const shipmentAmountBody = (rowData) => {
    return `SAR ${rowData.order_detail.shipping_charges}`;
  };

  const vatAmountBody = (rowData) => {
    return `SAR ${rowData.order_detail.vat_amount}`;
  };

  const totalAmountBody = (rowData) => {
    return `SAR ${rowData.order_detail.total_amount}`;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={
          i18next.language === "en"
            ? rowData.order_status.name_en
            : rowData.order_status.name_ar
        }
        className={getSeverity(rowData.order_status.id)}
      ></Tag>
    );
  };

  // const redirectTo = (id) => {
  //   // switch (parseInt(user?.role_id)) {
  //   //   case 1:
  //   //     return `/admin/shipment-detail/${id}`;
  //   //   case 2:
  //   //     return `/client/shipment-detail/${id}`;
  //   //   case 3:
  //   //     return `/client/shipment-detail/${id}`;
  //   //   case 8:
  //   //     return `/customer-care/shipment-detail/${id}`;
  //   //   case 10:
  //   //     return `/keeper/shipment-detail/${id}`;
  //   // }
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

  useEffect(() => {
    if (status > 1) {
      dispatch(getOrdersByStatus(status, page, rows));
    } else {
      dispatch(getAllOrders(page, rows));
    }
  }, [page, rows]);
  return (
    <div>
      <div className="px-1">
        <DataTable
          value={selectedOption ? orderByStatus?.data : allOrders?.data || []}
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
          onRowClick={(e) =>
            navigate(`${parentPath}/shipment-detail/${e.data.order_code}`)
          }
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
            field="order_code"
            sortable
            // rtl:!ml-0  ml-2
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("tracking_id")}
            style={{ minWidth: "150px" }}
          />
          <Column
            className="text-start"
            field="sender.name"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("sender_name")}
            style={{ minWidth: "150px" }}
          />

          <Column
            className="text-start"
            field="receiver.name"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("receiver_name")}
            style={{ minWidth: "150px" }}
          />

          <Column
            className="text-start"
            field="order_detail.shipping_charges"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("shipping_amount")}
            style={{ minWidth: "160px" }}
            body={shipmentAmountBody}
          />

          <Column
            className="text-start"
            field="order_detail.vat_amount"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("vat_amount")}
            body={vatAmountBody}
            style={{ minWidth: "150px" }}
          />

          <Column
            field="order_detail.total_amount"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("total_amount")}
            body={totalAmountBody}
            style={{ minWidth: "150px" }}
            className="text-start"
          />

          <Column
            header={t("status")}
            body={statusBodyTemplate}
            className="text-start"
            headerClassName="p-status"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
