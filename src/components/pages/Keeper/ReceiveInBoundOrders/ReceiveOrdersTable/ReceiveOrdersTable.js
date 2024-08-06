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
import { getkeeperOrdersReceive } from "../../../../../store/AsyncMethod/KeeperMethod";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import ReceiveOrders from "../ReceiveOrders";
import { useNavigate } from "react-router-dom";
import { RESET_KEEPER_ORDERS_RECEIVE } from "../../../../../store/Types/KeeperTypes";
import { ConfirmDialog } from "primereact/confirmdialog";
import CustomPaginateTempelate from "../../../../OtherComponents/CustomPaginateTempelate";

export default function ReceiveOrdersTable() {
  const { t } = useTranslation();
  const { keeperOrdersReceive } = useSelector((state) => state.KeeperReducer);
  const [dialogVisible, setDialogVisible] = useState(false);

  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOrders, setselectedOrders] = useState(null);
  const [selectedInput, setselectedInput] = useState("");
  const [orders, setOrders] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);
  useEffect(() => {
    if (keeperOrdersReceive) {
      setTotalRecords(totalRecords + 1);
    }
  }, [keeperOrdersReceive]);
  useEffect(() => {
    if (keeperOrdersReceive.length > 0) {
      setConfirmVisible(true);
    } else {
      setConfirmVisible(false);
    }
  }, []);
  const deleteRecords = () => {
    dispatch({ type: RESET_KEEPER_ORDERS_RECEIVE });
    setConfirmVisible(false);
  };
  const handleReceiveChange = () => {
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

  const renderHeader = () => {
    return (
      <div className="flex gap-2  mb-3">
        <span className="flex w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 ">
          <InputText
            className="w-full p-primary-input font-normal"
            type="text"
            value={selectedInput === null ? "" : selectedInput}
            onChange={(e) => setselectedInput(e.target.value)}
            placeholder={t("search_for_order")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(getkeeperOrdersReceive(parseInt(selectedInput)));
                setselectedInput(null);
              }
            }}
          />
        </span>
        <Button
          icon={
            i18next.language === "en"
              ? "pi pi-arrow-right dark:text-white"
              : "pi pi-arrow-left dark:text-white"
          }
          className="p-primary-btn dark:bg-primary"
          onClick={() => {
            dispatch(getkeeperOrdersReceive(parseInt(selectedInput)));
            setselectedInput(null);
          }}
          pt={{
            icon: { className: "w-full" },
          }}
        />
      </div>
    );
  };

  const header = renderHeader();

  const renderLeft = () => {
    return (
      <div className="flex justify-between">
        <div>
          <Button
            label={t("receive_orders")}
            icon="pi pi-plus"
            className="p-primary-btn dark:text-white dark:bg-primary my-3 "
            onClick={handleReceiveChange}
            pt={{
              icon: { className: "rtl:mx-2  " },
            }}
          />
          <Toast position="bottom-right" ref={toast} />
        </div>

        <div>
          <Dialog
            visible={dialogVisible}
            header={
              <p className="text-2xl font-bold text-color mr-6 text-primary dark:text-white">
                {t("receive_orders")}
              </p>
            }
            onHide={() => setDialogVisible(false)}
            className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 mx-2"
          >
            <ReceiveOrders
              setDialogVisible={setDialogVisible}
              orders={orders}
              setselectedOrders={setselectedOrders}
            />
          </Dialog>
        </div>
      </div>
    );
  };

  const left = renderLeft();

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

  return (
    <div className="pl-2 pr-3">
      <ConfirmDialog
        className="w-4/12"
        group="declarative"
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message="Do you want to keep your data?"
        header="Confirmation"
        rejectLabel="No"
        rejectClassName="bg-red-500 hover:bg-red-600 border-red-500"
        closable={false}
        accept={() => {
          setConfirmVisible(false);
        }}
        reject={() => {
          deleteRecords();
        }}
      />
      <div className="">
        <DataTable
          value={keeperOrdersReceive || []}
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="60vh"
          stripedRows
          header={header}
          paginator
          rows={5}
          paginatorLeft={left}
          paginatorTemplate={CustomPaginateTempelate()}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
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
