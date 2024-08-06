import { Skeleton } from "primereact/skeleton";
import React from "react";

function SkeletonDashboard() {
  return (
    <div className="pt-6 mx-auto p-2 md:pr-2 ">
      <div className="flex justify-evenly gap-2 mt-10 flex-col lg:flex-row w-11/12 mx-auto">
        <Skeleton
          height="6rem"
          borderRadius="16px"
          className="hidden lg:block lg:w-10"
          pt={{
            root: {
              className:
                "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-300 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
            },
          }}
        ></Skeleton>
        <Skeleton
          height="6rem"
          borderRadius="16px"
          className="hidden lg:block lg:w-10"
          pt={{
            root: {
              className:
                "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-300 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
            },
          }}
        ></Skeleton>
        <Skeleton
          height="6rem"
          borderRadius="16px"
          className="w-full lg:w-10"
          pt={{
            root: {
              className:
                "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-300 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
            },
          }}
        ></Skeleton>
        <Skeleton
          height="6rem"
          borderRadius="16px"
          className="w-full lg:w-10"
          pt={{
            root: {
              className:
                "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-300 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
            },
          }}
        ></Skeleton>
        <Skeleton
          height="6rem"
          borderRadius="16px"
          className="w-full lg:w-10"
          pt={{
            root: {
              className:
                "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-300 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
            },
          }}
        ></Skeleton>
      </div>
      <div className="w-11/12 mx-auto m-10">
        <Skeleton
          pt={{
            root: {
              className:
                "overflow-hidden !mb-2 bg-gray-300 dark:bg-gray-800 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-slate-300 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
            },
          }}
          width="100%"
          height="20rem"
        />
      </div>
    </div>
  );
}

export default SkeletonDashboard;
