import "./styles.css";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineDeliveryDining } from "react-icons/md";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HeaderBanner() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  console.log(error);
  return (
    <div className="bg-secondary/10 flex justify-center items-center h-screen  w-full">
      {/* bannerImage bg-center bg-no-repeat bg-cover relative */}
      <div className="flex  flex-col-reverse  lg:flex-row md:px-16 px-2 py-12 lg:py-5 w-full gap-8 lg:gap-0">
        <div className="w-full lg:w-7/12 px-8">
          <h1 className="text-5xl hidden md:block text-primary font-bold dark:text-white">
            {t("safwa")}
          </h1>
          <h3 className="text-slate-500 text-xl sm:text-2xl dark:text-white">
            {t("where_reliability_meets_convenience")}
          </h3>

          <div className="mt-20">
            {/* <h3 className="text-primary text-2xl font-bold">
                  {" "}
                  Track you shippment
                </h3> */}
            <div className="mt-2 w-full flex !flex-col sm:!flex-row card rounded-md px-2 py-2 gap-3 sm:gap-0 items-center">
              <LiaShippingFastSolid className="text-primary text-5xl my-auto hidden sm:inline-block" />

              <span className="p-float-label w-full mt-2 sm:mt-0">
                <InputText
                  id="tracking"
                  value={value === null ? "" : value}
                  keyfilter="int"
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full text-xl p-primary-input !pt-5 sm:!p-2.5  "
                  autoFocus={false}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (value === "") {
                        setError(true);
                        return;
                      } else {
                        navigate("/order-track/" + value);
                        setValue(null);
                      }
                    }
                  }}
                  pt={{
                    root: {
                      className:
                        "border-none !shadow-none focus:!shadow-none dark:bg-inherit",
                    },
                  }}
                  // onKeyDown={() => {
                  //   navigate("/order-track/" + value);
                  // }}
                />
                <label htmlFor="track" className="dark:text-white">
                  Type tracking number here
                </label>
              </span>

              <div className="w-full sm:w-40">
                <Button
                  type="submit"
                  label={t("track_order")}
                  className="p-primary-btn !w-full sm:!w-40 dark:text-white dark:bg-primary  "
                  onClick={() => {
                    if (value === "") {
                      setError(true);
                      return false;
                    } else navigate("/order-track/" + value);
                    setValue(null);
                  }}
                />
              </div>
            </div>
          </div>
          {error && value === "" ? (
            <p className="mt-2 text-red-500">Tracking code is required</p>
          ) : null}
        </div>

        <div className="w-full mt-5  lg:w-5/12">
          <div className="flex justify-center items-center">
            <img
              src="/images/logistics.png"
              className="h-48 w-48 md:h-64 md:w-64 rtl-flip rtl:-scale-x-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBanner;
