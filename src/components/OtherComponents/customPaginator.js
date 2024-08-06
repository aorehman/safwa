import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
function CustomPaginator({ rows, totalRecords, setPage, setRows }) {
  const [first, setFirst] = useState(0);
  const { t } = useTranslation();
  const onPageChange = (event) => {
    setPage(event.page + 1);
    setRows(event.rows);
    setFirst(event.first);
  };

  const template1 = {
    layout:
      "CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink ",
    CurrentPageReport: (options) => {
      return (
        // <span className="mx-2">{`Total ${options.totalRecords} records`}</span>
        <span className="mx-2">
          {" "}
          {t("total_records", { total_rec: totalRecords })}
        </span>
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
  return (
    <div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[5, 10, 20, 30]}
        onPageChange={onPageChange}
        template={template1}
        className="!bg-transparent !mt-1"
      />
    </div>
  );
}

export default CustomPaginator;
