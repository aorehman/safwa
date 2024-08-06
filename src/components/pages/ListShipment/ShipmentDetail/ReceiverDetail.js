import i18next from "i18next";
import { Divider } from "primereact/divider";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ReceiverDetail({ trackOrder }) {
  const { t } = useTranslation();

  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("receiver_detail")}
        </span>
      </Divider>

      <div className="">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("name")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.receiver?.name : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("phone")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.receiver?.phone : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("city")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder && trackOrder.receiver && trackOrder.receiver.city
              ? i18next.language === "en"
                ? trackOrder.receiver.city.name_en
                : trackOrder.receiver.city.name_ar
              : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("neighborhood")}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder &&
            trackOrder.receiver &&
            trackOrder.receiver.neighborhood
              ? i18next.language === "en"
                ? trackOrder.receiver.neighborhood.name_en
                : trackOrder.receiver.neighborhood.name_ar
              : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("address")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.receiver?.full_address : null}
          </span>
        </div>
      </div>
    </>
  );
}
