import { Divider } from "primereact/divider";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ShipmentDetail({ trackOrder }) {
  const { t } = useTranslation();

  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("shipment_detail")}
        </span>
      </Divider>

      <div className="">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("shipping_charges")}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            SAR {trackOrder ? trackOrder?.order_detail?.shipping_charges : null}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("Quantity")}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.order_detail?.quantity : null}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("sub_amount")}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            SAR {trackOrder ? trackOrder?.order_detail?.sub_amount : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            VAT Amount ({trackOrder?.order_detail?.vat_percent * 100}%)
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            SAR {trackOrder ? trackOrder?.order_detail?.vat_amount : null}
          </span>
        </div>

        <Divider className="!my-2" />

        <div className="flex justify-end gap-2">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("total")}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            SAR {trackOrder ? trackOrder?.order_detail?.total_amount : null}
          </span>
        </div>
      </div>
    </>
  );
}
