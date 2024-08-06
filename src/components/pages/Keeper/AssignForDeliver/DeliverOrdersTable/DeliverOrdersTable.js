import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useTranslation } from "react-i18next";
import { Tag } from "primereact/tag";
import i18next from "i18next";
import { getkeeperOrdersDeliver } from "../../../../../store/AsyncMethod/KeeperMethod";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import AssignForDeliver from "../AssignForDeliver";
import { useNavigate } from "react-router-dom";
import CustomPaginator from "../../../../OtherComponents/customPaginator";

export default function DeliverOrdersTable() {
  const { t } = useTranslation();
  const { keeperOrdersDeliver } = useSelector((state) => state.KeeperReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  const [dialogVisible, setDialogVisible] = useState(false);

  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOrders, setselectedOrders] = useState(null);
  const [orders, setOrders] = useState(null);

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    if (keeperOrdersDeliver) {
      setTotalRecords(keeperOrdersDeliver.total);
    }
  }, [keeperOrdersDeliver]);

  const handleDeliverChange = () => {
    if (!selectedOrders || selectedOrders.length === 0) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Please select an order.",
      });
    } else {
      const orders = selectedOrders.map((order) => order.order_code);
      setOrders(orders);
      setDialogVisible(true);
    }
  };
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
      <div className="flex justify-between pb-2">
        <span className="p-input-icon-left flex w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 ">
          <i className="pi pi-search dark:text-white" />
          <InputText
            className="w-full p-primary-input !pl-10 font-normal"
            type="text"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder={t("search...")}
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const renderFooter = () => {
    return (
      <div className="flex justify-between">
        <div>
          <Button
            label={t("assign_courier")}
            icon="pi pi-plus"
            className="p-primary-btn dark:text-white dark:bg-primary my-3"
            onClick={handleDeliverChange}
            pt={{
              icon: { className: "rtl:mx-2" },
            }}
          />
          <Toast position="bottom-right" ref={toast} />
        </div>

        <div>
          <Dialog
            visible={dialogVisible}
            header={
              <p className="text-2xl font-bold text-color mr-6 text-primary dark:text-white">
                {t("assign_courier")}
              </p>
            }
            onHide={() => setDialogVisible(false)}
            className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 mx-2"
          >
            <AssignForDeliver
              setDialogVisible={setDialogVisible}
              orders={orders}
              page={page}
              rows={rows}
              setselectedOrders={setselectedOrders}
            />
          </Dialog>
        </div>

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

  const getSeverity = (orderId) => {
    switch (parseInt(orderId)) {
      case 9: // created
        return "bg-blue-500";

      case 5: // delivered
        return "bg-green-500";

      case 31: // going for pickup
        return "bg-gray-500";

      case 2: // picked up
        return "bg-cyan-600";

      case 3: // receive in bound
        return "bg-teal-500";

      case 8: // transit to origin
        return "bg-purple-500";

      case 7: // transit to destination
        return "bg-purple-500";

      case 17: // postpone
        return "bg-yellow-500";

      case 4: // out of delivery
        return "bg-pink-500";

      case 14: // cancel
        return "bg-red-500";

      default:
        return null;
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getkeeperOrdersDeliver(page, rows));
    }
  }, [page, rows]);

  return (
    <div>
      <div className="">
        <DataTable
          value={keeperOrdersDeliver?.data || []}
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="60vh"
          stripedRows
          header={header}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          footer={footer}
          selection={selectedOrders}
          onSelectionChange={(e) => setselectedOrders(e.value)}
          onRowClick={(e) =>
            navigate("/keeper/shipment-detail/" + e.data.order_code)
          }
          size="small"
          pt={{
            header: { className: "px-4 py-2 " },
            footer: { className: "px-4 py-2 " },
          }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            className="text-start"
            headerClassName="p-selection-column-header"
          ></Column>

          <Column
            field="order_code"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("tracking_id")}
            style={{ minWidth: "150px" }}
            className="text-start"
          />

          <Column
            field="sender.name"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("sender_name")}
            style={{ minWidth: "150px" }}
            className="text-start"
          />

          <Column
            field="receiver.name"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("receiver_name")}
            style={{ minWidth: "150px" }}
            className="text-start"
          />

          <Column
            field="order_detail.shipping_charges"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("shipping_amount")}
            style={{ minWidth: "160px" }}
            body={shipmentAmountBody}
            className="text-start"
          />

          <Column
            field="order_detail.vat_amount"
            sortable
            pt={{ headerTitle: { className: "" }, sortIcon: "mr-2" }}
            header={t("vat_amount")}
            body={vatAmountBody}
            style={{ minWidth: "150px" }}
            className="text-start"
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
            className="text-start"
            body={statusBodyTemplate}
            headerClassName="p-status"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
