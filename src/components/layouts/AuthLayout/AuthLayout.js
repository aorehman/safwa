import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_ERROR,
  RESET_SUCCESS,
  RESET_VALIDATE_ERROR,
} from "../../../store/Types/AuthTypes";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

function AuthLayout({ children }) {
  const dispatch = useDispatch();
  const { success, error, validateErrors } = useSelector(
    (state) => state.AuthReducer
  );
  const toast = useRef(null);
  useEffect(() => {
    if (success) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: success,
        life: 3000,
      });
      setTimeout(() => {
        dispatch({ type: RESET_SUCCESS });
      }, 1000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
      dispatch({ type: RESET_ERROR });
    }
  }, [error]);

  useEffect(() => {
    if (validateErrors) {
      Object.keys(validateErrors).forEach((field) => {
        const errorMessage = validateErrors[field][0]; // Take the first error message for simplicity

        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: errorMessage,
          life: 3000,
        });
      });

      setTimeout(() => {
        dispatch({ type: RESET_VALIDATE_ERROR });
      }, 5000);
    }
  }, [validateErrors]);

  return (
    <div className="flex">
      <div className="w-full h-screen overflow-auto">
        {/* Main Content */}
        <Navbar />
        {/* <ScrollPanel
          className="flex-grow overflow-y-auto"
          pt={{
            barY: {
              className: "bg-secondary",
            },
          }}
        > */}
        <div className="mx-auto">{children}</div>
        {/* </ScrollPanel> */}
      </div>
      <Toast position="bottom-right" ref={toast} />
    </div>
  );
}

export default AuthLayout;
