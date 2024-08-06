import React from "react";
import { useTranslation } from "react-i18next";

const NotFoundRecord = ({ text }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center text-gray-500 text-lg mt-6 dark:text-white">
      <p>{text ? text : t("no_record_found")}</p>
    </div>
  );
};

export default NotFoundRecord;
