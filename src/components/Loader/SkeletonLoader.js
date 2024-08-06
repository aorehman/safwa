import React from "react";
import { Skeleton } from "primereact/skeleton";
import { RiMoonFill } from "react-icons/ri";
import { BreadCrumb } from "primereact/breadcrumb";

function SkeletonLoader() {
  const home = { icon: "pi pi-home" };
  return (
    <>
      <div className="flex">
        <div>
          <div className="lg:flex md:flex flex-col items-center gap-3 font-medium border-b border-slate-300  mr-3 hidden">
            <div className="text-2xl font-semibold whitespace-pre text-primary ">
              <Skeleton
                width="4rem"
                height="100vh"
                className=""
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
            </div>
          </div>
        </div>
        <div className=" w-full h-screen overflow-auto">
          <nav className=" sticky top-3 z-40 flex flex-row flex-wrap items-center justify-between gap-3 bg-white/10  backdrop-blur-xl p-2 dark:bg-[#0b14374d]">
            <div className="flex items-center">
              <Skeleton
                width="10rem"
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
            </div>
            <div className="flex gap-5 items-center card p-2 shadow-lg rounded-full px-6">
              <div className="cursor-pointer flex items-center">
                <i className="pi pi-globe text-2xl text-gray-500 dark:text-white mx-2"></i>
                <RiMoonFill className="text-2xl mx-2" />
              </div>
              <div>
                <Skeleton
                  shape="circle"
                  size="2.5rem"
                  className="mr-2"
                  pt={{
                    root: {
                      className:
                        "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                    },
                  }}
                ></Skeleton>
              </div>
            </div>
          </nav>
          <div className="pt-6 mx-auto p-2 md:pr-2 ">
            <div className="flex justify-evenly gap-2 mt-10 flex-col lg:flex-row w-11/12 mx-auto">
              <Skeleton
                // width="15rem"
                height="6rem"
                borderRadius="16px"
                className="hidden lg:block lg:w-10"
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
              <Skeleton
                // width="15rem"
                height="6rem"
                borderRadius="16px"
                className="hidden lg:block lg:w-10"
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
              <Skeleton
                // width="15rem"
                height="6rem"
                borderRadius="16px"
                className="w-full lg:w-10"
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
              <Skeleton
                // width="15rem"
                height="6rem"
                borderRadius="16px"
                className="w-full lg:w-10"
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
              <Skeleton
                // width="15rem"
                height="6rem"
                borderRadius="16px"
                className="w-full lg:w-10"
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
              ></Skeleton>
            </div>
            <div className="w-11/12 mx-auto m-10">
              <Skeleton
                pt={{
                  root: {
                    className:
                      "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                  },
                }}
                width="100%"
                height="20rem"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonLoader;
