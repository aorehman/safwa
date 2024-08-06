import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import i18next from "i18next";
import { MdCreateNewFolder } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiSquareCheck } from "react-icons/ci";
import { Dialog } from "primereact/dialog";
import { useLocation } from "react-router-dom";
import { RESET_TRACK_ORDER } from "../../store/Types/ShipmentTypes";
import { FaArrowRightToCity } from "react-icons/fa6";
import { FaCheckSquare, FaUserCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";

function OrderTimeLine({ trackOrder }) {
  const [orderdetail, setOrderdetail] = useState({});
  const [visiblegiver, setVisibleGiver] = useState(false);
  const [visibletacker, setVisibleTacker] = useState(false);
  console.log(orderdetail);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (visibletacker || visiblegiver) {
        if (
          event.target.closest(".p-dialog-content") === null &&
          event.target.closest(".p-dialog") === null
        ) {
          setVisibleTacker(false);
          setVisibleGiver(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visibletacker, visiblegiver]);

  const showGiver = () => {
    setVisibleGiver(true);
  };

  const showTaker = () => {
    setVisibleTacker(true);
  };

  return (
    <>
      <div className="App relative">
        <Dialog
          header="Taker Information"
          visible={visibletacker}
          className="card w-full lg:w-4/12 sm:w-9/12 text-xl !mx-2"
          onHide={() => setVisibleTacker(false)}
        >
          <div className="flex justify-between w-full">
            <div className="font-bold">
              <h1 className="text-primary">Name</h1>
            </div>
            <div className="text-grey-600 font-bold">
              <h1> {orderdetail?.taker?.name}</h1>
            </div>
          </div>
        </Dialog>
        <Dialog
          header="Giver Information"
          visible={visiblegiver}
          className="card w-full lg:w-4/12 sm:w-9/12 text-xl !mx-2"
          onHide={() => setVisibleGiver(false)}
        >
          <div className="text-center text-lg ">
            <div className="flex justify-between w-full">
              <div className="font-bold">
                <h1 className="text-primary">Name</h1>
              </div>
              <div className="text-grey-600 font-bold">
                <h1> {orderdetail?.giver?.name}</h1>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="font-bold">
                <h1 className="text-primary">Neighborhood</h1>
              </div>
              <div className="text-grey-600 font-bold">
                <h1>
                  {" "}
                  {i18next.language === "en"
                    ? orderdetail?.giver?.neighborhood?.name_en
                    : orderdetail?.giver?.neighborhood?.name_ar}
                </h1>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="font-bold">
                <h1 className="text-primary">City</h1>
              </div>
              <div className="text-grey-600 font-bold">
                <h1>
                  {" "}
                  {i18next.language === "en"
                    ? orderdetail?.giver?.city?.name_en
                    : orderdetail?.giver?.city?.name_ar}
                </h1>
              </div>
            </div>
          </div>
        </Dialog>

        <VerticalTimeline lineColor="grey">
          {trackOrder?.Tracking.map((tracking, i) => {
            const icon = (id) => {
              switch (id) {
                case 2: //pickup
                  return <CiSquareCheck />;
                case 3: //receive in bound
                  return <TbBuildingWarehouse />;
                case 4: // out delivery
                  return <TbTruckDelivery />;
                case 5: //delevired
                  return <CiSquareCheck />;
                case 7: //transit destination
                  return <FaArrowRightToCity />;
                case 8: //trans origin
                  return <TbBuildingWarehouse />;
                case 9: //created
                  return <MdCreateNewFolder />;
                case 14: //canceled
                  return <CiSquareCheck />;
                case 17: //postpone
                  return <CiSquareCheck />;
                case 20: //return to client
                  return <FaUserCheck />;
                case 21: //ready to return
                  return <FaCheckSquare />;
                case 30: //returtning
                  return <CiSquareCheck />;
                case 31: //going for pickup
                  return <TbTruckDelivery />;

                default:
                  break;
              }
            };

            const contentStyle =
              trackOrder?.order_status?.id === tracking?.order_status?.id
                ? tracking?.order_status?.id === 14
                  ? {
                      background: "rgb(239 68 68)",
                      color: "white",
                      padding: "4px ",
                      boxShadow: "none",
                    }
                  : tracking?.order_status?.id === 5
                  ? {
                      background: "rgb(34 197 94)",
                      color: "white",
                      padding: "4px ",
                      boxShadow: "none",
                    }
                  : tracking?.order_status?.id === 17
                  ? {
                      background: "rgb(234 179 8)",
                      color: "white",
                      padding: "4px ",
                      boxShadow: "none",
                    }
                  : {
                      background: "#4b49ac",
                      color: "white",
                      padding: "4px ",
                      boxShadow: "none",
                    }
                : {
                    background: "#f5f7ff",
                    color: "#4b49ac",
                    padding: "4px ",
                    boxShadow: "none",
                  };

            const arrowStyle =
              trackOrder?.order_status?.id === tracking?.order_status?.id
                ? tracking?.order_status?.id === 14
                  ? {
                      borderRight: "15px solid rgb(239 68 68)",
                    }
                  : tracking?.order_status?.id === 5
                  ? {
                      borderRight: "15px solid rgb(34 197 94)",
                    }
                  : tracking?.order_status?.id === 17
                  ? {
                      borderRight: "15px solid rgb(234 179 8)",
                    }
                  : {
                      borderRight: "15px solid #4b49ac",
                    }
                : { borderRight: "15px solid #f5f7ff" };

            const iconStyle =
              // check like date class
              trackOrder?.order_status?.id === tracking?.order_status?.id
                ? tracking?.order_status?.id === 14
                  ? {
                      background: "rgb(239 68 68)",
                      color: "#fff",
                      fontSize: "20px",
                      border: "2px solid #fff",
                      outline: "rgb(239 68 68) solid 3px",
                      boxShadow: "none",
                      translate: "0px",
                    }
                  : tracking?.order_status?.id === 5
                  ? {
                      background: "rgb(34 197 94)",
                      color: "#fff",
                      fontSize: "20px",
                      border: "2px solid #fff",
                      outline: "rgb(34 197 94) solid 3px",
                      boxShadow: "none",
                      translate: "0px",
                    }
                  : tracking?.order_status?.id === 17
                  ? {
                      background: "rgb(234 179 8)",
                      color: "#fff",
                      fontSize: "20px",
                      border: "2px solid #fff",
                      outline: "rgb(234 179 8) solid 3px",
                      boxShadow: "none",
                    }
                  : {
                      background: "#4b49ac",
                      color: "#fff",
                      fontSize: "20px",
                      border: "2px solid #fff",
                      outline: "#4b49ac solid 3px",
                      boxShadow: "none",
                    }
                : {
                    background: "#f5f7ff",
                    color: "#4b49ac",
                    fontSize: "20px",
                    border: "2px solid #fff",
                    outline: "#4b49ac solid 3px",
                    boxShadow: "none",
                    translate: "0px",
                  };

            return (
              <VerticalTimelineElement
                key={i}
                className="vertical-timeline-element--work text-xl "
                contentStyle={contentStyle}
                contentArrowStyle={arrowStyle}
                date={
                  // i18next.language === "en"
                  //   ? tracking.order_status.name_en
                  //   : tracking.order_status.name_ar
                  <>
                    {i18next.language === "en"
                      ? tracking.order_status.name_en
                      : tracking.order_status.name_ar}
                    <br />
                    {new Date(tracking.created_at).toLocaleString()}
                  </>
                }
                dateClassName={
                  trackOrder?.order_status?.id === tracking?.order_status?.id
                    ? tracking?.order_status?.id === 5
                      ? "text-green-500"
                      : tracking?.order_status?.id === 14
                      ? "text-red-500"
                      : tracking?.order_status?.id === 17
                      ? "text-yellow-500"
                      : "text-primary"
                    : "text-primary"
                }
                icon={icon(tracking?.order_status?.id)}
                iconStyle={iconStyle}
              >
                <div className="   w-full flex flex-col sm:text-lg text-base">
                  <div className="text-primary p-2 rounded-lg ">
                    {tracking?.giver ? (
                      <div className=" text-lg">
                        <div className="flex items-center">
                          {tracking.order_status.name_en ===
                          trackOrder?.order_status.name_en ? (
                            <>
                              <h1 className="text-white text-base sm:text-lg">
                                <span className=" font-semibold sm:font-bold ">
                                  {`Giver: ${tracking?.giver?.name}`}
                                </span>{" "}
                              </h1>
                              <IoMdInformationCircleOutline
                                className="text-2xl text-white mx-2 !p-0  cursor-pointer"
                                onMouseEnter={() => setOrderdetail(tracking)}
                                onClick={() => {
                                  showGiver();
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <h1>
                                <span className="font-bold">{`Giver: ${tracking?.giver?.name}`}</span>
                              </h1>
                              <IoMdInformationCircleOutline
                                className="text-2xl mx-2  cursor-pointer"
                                onMouseEnter={() => setOrderdetail(tracking)}
                                onClick={() => {
                                  showGiver();
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {tracking?.taker ? (
                    <>
                      <div
                        className=" text-primary p-2 rounded-lg text-base sm:text-lg
                       "
                      >
                        <div className="flex items-center">
                          {tracking.order_status.name_en ===
                          trackOrder?.order_status.name_en ? (
                            <>
                              <h1 className="text-white text-base sm:text-lg">
                                <span className="sm:font-bold font-semibold">
                                  {`Taker: ${tracking?.taker?.name}`}
                                </span>{" "}
                              </h1>
                              <IoMdInformationCircleOutline
                                className="text-2xl mx-2 text-white cursor-pointer"
                                onMouseEnter={() => setOrderdetail(tracking)}
                                onClick={() => {
                                  showTaker();
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <h1>
                                <span className="font-bold">{`Taker:${tracking?.taker?.name}`}</span>
                              </h1>
                              <IoMdInformationCircleOutline
                                className="text-2xl mx-2  cursor-pointer"
                                onMouseEnter={() => setOrderdetail(tracking)}
                                onClick={() => {
                                  showTaker();
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                {tracking?.comment ? (
                  <div className="p-2 rounded-lg">
                    <h1 className="vertical-timeline-element-subtitle text-base sm:text-lg">
                      <span className="font-semibold sm:font-bold">
                        {`Comment: ${tracking?.comment}`}
                      </span>
                    </h1>
                  </div>
                ) : null}
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default OrderTimeLine;
