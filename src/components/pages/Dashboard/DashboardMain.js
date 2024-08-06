import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { CgBox } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { PiCheckCircleBold } from "react-icons/pi";
import { RiAiGenerate } from "react-icons/ri";
import InLineChart from "./InLineChart";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getKeeperStats,
  getStats,
} from "../../../store/AsyncMethod/DashboardMethod";
import SkeletonDashboard from "../../Loader/SkeletonDashboard";

export default function DashboardMain() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.AuthReducer);
  const { stats } = useSelector((state) => state.DashboardReducer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role_id == 2 || user?.role_id == 3) {
      dispatch(getStats())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching stats:", error);
          setLoading(false);
        });
    } else if (user?.role_id == 10) {
      dispatch(getKeeperStats())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching keeperStats:", error);
          setLoading(false);
        });
    } else if (user?.role_id == 1) {
      dispatch(getKeeperStats())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching keeperStats:", error);
          setLoading(false);
        });
    } else if (user?.role_id == 8) {
      dispatch(getKeeperStats())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching keeperStats:", error);
          setLoading(false);
        });
    }
  }, []);

  // const getStatByStatus = (status) => {
  //   return stats.find((item) => item.status === status)?.count || 0;
  // };

  const getStatByStatus = (status) => {
    if (Array.isArray(stats)) {
      const matchingStat = stats.find((item) => item.status === status);

      if (matchingStat) {
        return matchingStat.count;
      }
    }

    return 0;
  };

  let array =
    user?.role_id == 3 || user?.role_id == 2
      ? [
          {
            amount: getStatByStatus("Total"),
            title: t("total_orders"),
            icon: <CgBox />,
          },
          {
            amount: getStatByStatus("Created"),
            title: t("order_created"),
            icon: <RiAiGenerate />,
          },
          {
            amount: getStatByStatus("Processing"),
            title: t("total_processing"),
            icon: <TbTruckDelivery />,
          },
          {
            amount: getStatByStatus("Cancel"),
            title: t("total_canceled"),
            icon: <MdOutlineCancel />,
          },
          {
            amount: getStatByStatus("Delivered"),
            title: t("total_delivered"),
            icon: <PiCheckCircleBold />,
          },
        ]
      : user?.role_id == 10
      ? [
          {
            amount: getStatByStatus("Total"),
            title: t("total_orders"),
            icon: <CgBox />,
          },
          {
            amount: getStatByStatus("Created"),
            title: t("order_created"),
            icon: <RiAiGenerate />,
          },
          {
            amount: getStatByStatus("Processing"),
            title: t("total_processing"),
            icon: <TbTruckDelivery />,
          },
          {
            amount: getStatByStatus("Cancel"),
            title: t("total_canceled"),
            icon: <MdOutlineCancel />,
          },
          {
            amount: getStatByStatus("Delivered"),
            title: t("total_delivered"),
            icon: <PiCheckCircleBold />,
          },
        ]
      : user?.role_id == 1
      ? [
          {
            amount: getStatByStatus("Total"),
            title: t("total_orders"),
            icon: <CgBox />,
          },
          {
            amount: getStatByStatus("Created"),
            title: t("order_created"),
            icon: <RiAiGenerate />,
          },
          {
            amount: getStatByStatus("Processing"),
            title: t("total_processing"),
            icon: <TbTruckDelivery />,
          },
          {
            amount: getStatByStatus("Cancel"),
            title: t("total_canceled"),
            icon: <MdOutlineCancel />,
          },
          {
            amount: getStatByStatus("Delivered"),
            title: t("total_delivered"),
            icon: <PiCheckCircleBold />,
          },
        ]
      : user?.role_id == 8
      ? [
          {
            amount: getStatByStatus("Total"),
            title: t("total_orders"),
            icon: <CgBox />,
          },
          {
            amount: getStatByStatus("Created"),
            title: t("order_created"),
            icon: <RiAiGenerate />,
          },
          {
            amount: getStatByStatus("Processing"),
            title: t("total_processing"),
            icon: <TbTruckDelivery />,
          },
          {
            amount: getStatByStatus("Cancel"),
            title: t("total_canceled"),
            icon: <MdOutlineCancel />,
          },
          {
            amount: getStatByStatus("Delivered"),
            title: t("total_delivered"),
            icon: <PiCheckCircleBold />,
          },
        ]
      : null;

  if (loading) {
    return (
      <>
        <SkeletonDashboard />
      </>
    );
  }

  return (
    <div className="px-2 mt-3">
      <Cards data={array} />
      <div className="mb-0">
        <InLineChart />
      </div>
    </div>
  );
}
