import i18next from "i18next";
import { Divider } from "primereact/divider";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SenderDetail({ trackOrder }) {
  const { t } = useTranslation();

  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("sender_detail")}
        </span>
      </Divider>

      <div className="">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("name")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.sender?.name : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("phone")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.sender?.phone : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("city")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder && trackOrder.sender && trackOrder.sender.city
              ? i18next.language === "en"
                ? trackOrder.sender.city.name_en
                : trackOrder.sender.city.name_ar
              : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {t("neighborhood")}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder && trackOrder.sender && trackOrder.sender.neighborhood
              ? i18next.language === "en"
                ? trackOrder.sender.neighborhood.name_en
                : trackOrder.sender.neighborhood.name_ar
              : null}
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-lg font-semibold text-primary dark:text-white">
            {/* {"address"}{" "} */}
            {t("address")}{" "}
          </span>
          <span className="text-lg font-medium text-gray-600 dark:text-white">
            {trackOrder ? trackOrder?.sender?.full_address : null}
          </span>
        </div>
      </div>
    </>
  );
}
