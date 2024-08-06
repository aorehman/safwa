import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ShipmentTable from "./ShipmentListing/ShipmentTable";
import ImportOrder from "./ImportShipment/ImportOrder";
import { Dialog } from "primereact/dialog";

export default function LishShipmentMain() {
  const { t } = useTranslation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  return (
    <div className=" rtl:ml-5">
      <div className="my-4">
        <ShipmentTable
          page={page}
          setPage={setPage}
          rows={rows}
          setRows={setRows}
        />
      </div>

      <div>
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
    </div>
  );
}
