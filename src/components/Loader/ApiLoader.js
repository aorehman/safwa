import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function ApiLoader() {
  const { loading } = useSelector((state) => state.AuthReducer);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        if (progress < 90) {
          setProgress((prevProgress) => prevProgress + 2);
        } else {
          setProgress(10);
        }
      }, 200);
    } else {
      interval = setInterval(() => {
        if (progress < 100) {
          setProgress((prevProgress) => prevProgress + 2);
        } else {
          clearInterval(interval);
        }
      }, 1);
    }

    return () => clearInterval(interval);
  }, [loading, progress]);

  return (
    <div>
      {/* <LoadingBar color="#f11946" progress={progress} /> */}
      <LoadingBar color="#98bdff" progress={progress} height={3} />
    </div>
  );
}
