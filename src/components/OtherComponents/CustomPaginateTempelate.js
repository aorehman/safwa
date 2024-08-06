import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import React from "react";

function CustomPaginateTemplate() {
  const { t } = useTranslation();
  const Template1 = {
    layout:
      "CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink ",
    CurrentPageReport: (options) => {
      return (
        <span className="p-3">{`Total ${options.totalRecords} records`}</span>
      );
    },

    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">{t("previous")}</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">{t("next")}</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
          className="!w-20"
          pt={{
            root: { className: "w-full md:w-full p-primary-input" },
            input: { className: "w-full p-primary-input" },
            filterInput: { className: "mr-0" },
            filterIcon: {
              className: "rtl:right-auto rtl:left-4 dark:text-white",
            },
          }}
        />
      );
    },
  };

  return Template1;
}

export default CustomPaginateTemplate;
