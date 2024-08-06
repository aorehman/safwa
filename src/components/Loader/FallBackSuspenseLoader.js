import React from "react";
import SkeletonLoader from "./SkeletonLoader";

export default function FallBackSuspenseLoader() {
  return (
    <div>
      <SkeletonLoader />
    </div>
  );
}
