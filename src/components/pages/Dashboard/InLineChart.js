import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useTranslation } from "react-i18next";
import {
  getKeeperStatsByMonths,
  getStatsByMonths,
} from "../../../store/AsyncMethod/DashboardMethod";
import { useDispatch, useSelector } from "react-redux";

export default function LineStylesDemo() {
  const { t } = useTranslation();
  // const [chartData, setChartData] = useState({});
  // const [chartOptions, setChartOptions] = useState({});
  // const [keeperChartData, setKeeperChartData] = useState({});
  // const [keeperChartOptions, setKeeperChartOptions] = useState({});
  const [statsChartData, setStatsChartData] = useState({});
  const [statsChartOptions, setStatsChartOptions] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const { keeperStatsByMonths, statsByMonths } = useSelector(
    (state) => state.DashboardReducer
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (document.body.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [document.body.classList]);

  useEffect(() => {
    if (user?.role_id == 2 || user?.role_id == 3) {
      dispatch(getStatsByMonths())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching stats:", error);
          setLoading(false);
        });
    } else if (user?.role_id == 10) {
      dispatch(getKeeperStatsByMonths())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching keeperStats:", error);
          setLoading(false);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (keeperStatsByMonths?.length > 0) {
  //     const documentStyle = getComputedStyle(document.documentElement);
  //     const textColor = documentStyle.getPropertyValue("--text-color");
  //     const textColorSecondary = documentStyle.getPropertyValue(
  //       "--text-color-secondary"
  //     );
  //     const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  //     const labels = keeperStatsByMonths.map((entry) => entry.month);
  //     const createdData = keeperStatsByMonths.map(
  //       (entry) => entry.stats.Created
  //     );
  //     const deliveredData = keeperStatsByMonths.map(
  //       (entry) => entry.stats.Delivered
  //     );
  //     const cancelData = keeperStatsByMonths.map((entry) => entry.stats.Cancel);
  //     const processingData = keeperStatsByMonths.map(
  //       (entry) => entry.stats.Processing
  //     );
  //     const totalData = keeperStatsByMonths.map((entry) => entry.stats.Total);

  //     const data = {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: t("total_orders"),
  //           data: totalData,
  //           fill: true,
  //           tension: 0.4,
  //           borderColor: documentStyle.getPropertyValue("--cyan-500"),
  //         },
  //         {
  //           label: t("order_created"),
  //           data: createdData,
  //           fill: true,
  //           tension: 0.4,
  //           borderColor: documentStyle.getPropertyValue("--blue-500"),
  //         },
  //         {
  //           label: t("processing_orders"),
  //           data: processingData,
  //           fill: true,
  //           borderColor: documentStyle.getPropertyValue("--purple-500"),
  //           tension: 0.4,
  //           backgroundColor: "rgba(255,167,38,0.2)",
  //         },
  //         {
  //           label: t("canceled_orders"),
  //           data: cancelData,
  //           fill: true,
  //           borderDash: [5, 5],
  //           tension: 0.4,
  //           borderColor: documentStyle.getPropertyValue("--red-500"),
  //         },
  //         {
  //           label: t("total_delivered"),
  //           data: deliveredData,
  //           fill: true,
  //           tension: 0.4,
  //           borderColor: documentStyle.getPropertyValue("--green-500"),
  //         },
  //       ],
  //     };

  //     const options = {
  //       maintainAspectRatio: false,
  //       aspectRatio: 0.6,
  //       plugins: {
  //         legend: {
  //           labels: {
  //             color: isDarkMode ? "white" : textColor,
  //           },
  //         },
  //       },
  //       scales: {
  //         x: {
  //           ticks: {
  //             color: textColorSecondary,
  //           },
  //           grid: {
  //             color: surfaceBorder,
  //           },
  //         },
  //         y: {
  //           ticks: {
  //             color: textColorSecondary,
  //           },
  //           grid: {
  //             color: surfaceBorder,
  //           },
  //         },
  //       },
  //     };

  //     setKeeperChartData(data);
  //     setKeeperChartOptions(options);
  //   }
  // }, [keeperStatsByMonths]);

  useEffect(() => {
    if (statsByMonths?.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      const labels = statsByMonths.map((entry) => entry.month);
      const createdData = statsByMonths.map((entry) => entry.stats.Created);
      const deliveredData = statsByMonths.map((entry) => entry.stats.Delivered);
      const cancelData = statsByMonths.map((entry) => entry.stats.Cancel);
      const processingData = statsByMonths.map(
        (entry) => entry.stats.Processing
      );
      const totalData = statsByMonths.map((entry) => entry.stats.Total);

      const data = {
        labels: labels,
        datasets: [
          {
            label: t("total_orders"),
            data: totalData,
            fill: true,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue("--cyan-500"),
          },
          {
            label: t("order_created"),
            data: createdData,
            fill: true,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
          },
          {
            label: t("processing_orders"),
            data: processingData,
            fill: true,
            borderColor: documentStyle.getPropertyValue("--purple-500"),
            tension: 0.4,
            backgroundColor: "rgba(255,167,38,0.2)",
          },
          {
            label: t("canceled_orders"),
            data: cancelData,
            fill: true,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue("--red-500"),
          },
          {
            label: t("total_delivered"),
            data: deliveredData,
            fill: true,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue("--green-500"),
          },
        ],
      };

      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: isDarkMode ? "white" : textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      setStatsChartData(data);
      setStatsChartOptions(options);
    }
  }, [statsByMonths]);

  // return (
  //   <div className="card mt-6 rounded-lg">
  //     <Chart
  //       type="line"
  //       height={370}
  //       data={chartData}
  //       options={chartOptions}
  //       pt={{
  //         canvas: { className: "dark:text-white" },
  //       }}
  //     />
  //   </div>
  // );

  return (
    <div>
      {user?.role_id == 2 || user?.role_id == 3 ? (
        <div className="card mt-6 rounded-lg">
          <Chart
            type="line"
            height={370}
            data={statsChartData}
            options={statsChartOptions}
            pt={{
              canvas: { className: "dark:text-white" },
            }}
          />
        </div>
      ) : null}

      {user?.role_id == 10 ? (
        <div className="card mt-6 rounded-lg">
          <Chart
            type="line"
            height={370}
            data={statsChartData}
            options={statsChartOptions}
            pt={{
              canvas: { className: "dark:text-white" },
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
