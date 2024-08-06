import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import { useTranslation } from "react-i18next";
import { editUserProfile } from "../../../store/AsyncMethod/UserManagementMethod";

function UserProfileImg() {
  const { t } = useTranslation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const root = document.getElementsByTagName("html")[0];

  useEffect(() => {
    if (root.classList.value === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [root.classList, dialogVisible]);

  const onClose = () => {
    setCroppedImage(null);
    setDialogVisible(false);
  };

  const onCrop = (view) => {
    setCroppedImage(view);
  };

  const saveImage = (e) => {
    e.preventDefault();
    if (croppedImage) {
      const imageFile = dataURLtoFile(croppedImage, "profile.png");
      const formData = new FormData();
      formData.append("profile_photo", imageFile);
      dispatch(editUserProfile(formData));
      setDialogVisible(false);
      setCroppedImage(null);
    }
  };

  const dataURLtoFile = (dataURL, fileName) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div className="text-center">
      <div className="div">
        {user.profile_photo ? (
          <img
            className="w-40 h-40 p-1 rounded-full cursor-pointer shadow-md shadow-primary border-4 border-dashed border-primary"
            src={user.profile_photo}
            alt="Profile Pic"
            onClick={() => setDialogVisible(true)}
          />
        ) : (
          <div>
            <h1
              onClick={() => setDialogVisible(true)}
              className=" cursor-pointer rounded-full flex items-center justify-center w-40 h-40 shadow-primary  bg-gray-300 m-auto text-5xl border-primary border-dashed shadow-md border-4"
            >
              {user.first_name
                ?.split("")
                ?.splice(0, 1)
                ?.join("")
                ?.toUpperCase()}
            </h1>
          </div>
        )}
        <Dialog
          visible={dialogVisible}
          header={
            <p className="text-2xl font-bold text-color mr-6 text-primary dark:text-white">
              {t("update_profile")}
            </p>
          }
          onHide={() => setDialogVisible(false)}
          className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-3/12 mx-2"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mt-2 w-full">
              <Avatar
                width={300}
                height={200}
                onCrop={onCrop}
                onClose={onClose}
                label={t("choose_a_file")}
                labelStyle={{ color: isDarkMode ? "white" : "black" }}
              />
              <div className="flex justify-around w-full mt-4">
                <Button
                  onClick={saveImage}
                  label={t("save")}
                  icon="pi pi-check"
                  className="p-primary-btn dark:text-white dark:bg-primary"
                  pt={{
                    icon: { className: "rtl:mx-2" },
                  }}
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default UserProfileImg;
