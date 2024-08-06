import { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { ScrollPanel } from "primereact/scrollpanel";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { AiOutlineApartment, AiOutlineAppstore } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import { MdFreeCancellation, MdOutlineStorefront } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { TbPackages } from "react-icons/tb";
import { BsFillHouseDownFill, BsHouses } from "react-icons/bs";
import { GiBoxUnpacking } from "react-icons/gi";
import { FaShop, FaCity } from "react-icons/fa6";
import { FaTruckArrowRight } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { LuPackageSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RiFilePaper2Line } from "react-icons/ri";
import { Toast } from "primereact/toast";
import {
  RESET_ERROR,
  RESET_SUCCESS,
  RESET_VALIDATE_ERROR,
} from "../../../store/Types/AuthTypes";
import { TiKeyOutline } from "react-icons/ti";
import { GiReceiveMoney } from "react-icons/gi";
import { LiaUserCogSolid } from "react-icons/lia";
import { GrMapLocation } from "react-icons/gr";

function RootLayout({ children }) {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const [arrow, setArrow] = useState(false);
  const elementRef = useRef(null);
  const element = elementRef.current;

  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { success, error, validateErrors, user } = useSelector(
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
    sidebarItems?.length > 8 ? setArrow(true) : setArrow(false);
    const element = elementRef.current;

    if (element?.clientHeight - element?.scrollHeight === 0) {
      setArrow(false);
    }
  }, []);
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

  const sidebarItems =
    user?.role_id == 3 || user?.role_id == 2
      ? [
          {
            name: t("dashboard"),
            path: "/client/dashboard",
            icon: AiOutlineAppstore,
            showInSidebar: true,
          },
          {
            name: t("list_shipment"),
            path: "/client/shipment-all",
            icon: LiaShippingFastSolid,
            showInSidebar: true,
          },
          {
            name: t("add_shipment"),
            path: "/client/add-shipment",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("list_shipment")],
          },
          {
            name: t("shipment_detail"),
            path: "/client/shipment-detail",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("list_shipment")],
          },

          {
            name: t("user_profile"),
            path: "/client/user-profile",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [],
          },
          {
            name: t("order_tracking"),
            path: "/client/track-order",
            icon: LuPackageSearch,
            showInSidebar: true,
          },
        ]
      : user?.role_id == 10
      ? [
          {
            name: t("dashboard"),
            path: "/keeper/dashboard",
            icon: AiOutlineAppstore,
            showInSidebar: true,
          },
          {
            name: t("Keeper Profile"),
            path: "/keeper/user-profile",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [],
          },

          // {
          //   name: t("list_shipment"),
          //   path: "/all-store-orders",
          //   icon: GiBoxUnpacking,
          //   showInSidebar: true,
          // },
          {
            name: t("list_shipment"),
            path: "/keeper/shipment-all",
            icon: GiBoxUnpacking,
            showInSidebar: true,
          },
          {
            name: t("add_shipment"),
            path: "/keeper/client/add-shipment",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("list_shipment")],
          },

          {
            name: t("shipment_detail"),
            path: "/keeper/shipment-detail",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("list_shipment")],
          },
          {
            name: t("assign_for_pickup"),
            path: "/keeper/assign-courier",
            icon: FaPeopleCarryBox,
            showInSidebar: true,
          },
          {
            name: t("receive_bound"),
            path: "/keeper/receive-orders",
            icon: FaShop,
            showInSidebar: true,
          },

          {
            name: t("assign_for_deliverd"),
            path: "/keeper/courier-deliverd",
            icon: MdShoppingCartCheckout,
            showInSidebar: true,
          },
          {
            name: t("assign_for_return"),
            path: "/keeper/courier-return",
            icon: MdFreeCancellation,
            showInSidebar: true,
          },

          {
            name: t("return_to_warehouse"),
            path: "/keeper/return-to-warehouse",
            icon: BsFillHouseDownFill,
            showInSidebar: true,
          },

          {
            name: t("transit_destination"),
            path: "/keeper/transit-destination",
            icon: FaTruckArrowRight,
            showInSidebar: true,
          },
          {
            name: t("transit_origin"),
            path: "/keeper/transit-origin",
            icon: TbTruckReturn,
            showInSidebar: true,
          },
        ]
      : user?.role_id == 1
      ? [
          {
            name: t("dashboard"),
            path: "/admin/dashboard",
            icon: AiOutlineAppstore,
            showInSidebar: true,
          },
          {
            name: t("Admin Profile"),
            path: "/admin/user-profile",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [],
          },

          {
            name: t("list_shipment"),
            path: "/admin/shipment-all",
            icon: LiaShippingFastSolid,
            showInSidebar: true,
            parents: [],
          },
          {
            name: "Manage User",
            path: "/admin/manage-user",
            icon: LiaUserCogSolid,
            showInSidebar: true,
          },
          {
            name: t("add_shipment"),
            path: "/admin/add-shipment",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("list_shipment")],
          },

          {
            name: t("Manage Keeper"),
            path: "/admin/manage-keeper",
            icon: LiaUserCogSolid,
            showInSidebar: false,
          },
          {
            name: t("Add Keeper"),
            path: "/admin/add-keeper",
            icon: LiaUserCogSolid,
            showInSidebar: false,
            parents: [t("Manage Keeper")],
          },
          {
            name: t("Edit Keeper"),
            path: "/admin-edit-keeper",
            icon: LiaUserCogSolid,
            showInSidebar: false,
            parents: [t("Manage Keeper")],
          },
          {
            name: t("Manage Collection Fee"),
            path: "/admin/collection-charges",
            icon: GiReceiveMoney,
            showInSidebar: true,
          },
          {
            name: t("Edit Collection Charges"),
            path: "/edit-collection-charges",
            icon: GiReceiveMoney,
            showInSidebar: false,
            parents: [t("Manage Collection Fee")],
          },

          {
            name: t("Manage Package Types"),
            path: "/admin/manage-package-types",
            icon: TbPackages,
            showInSidebar: true,
          },

          {
            name: t("Edit Package Type"),
            path: "/edit-package",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Package Types")],
          },
          {
            name: t("Add Package Type"),
            path: "/admin/create-package",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Package Types")],
          },

          {
            name: t("Manage OTP"),
            path: "/admin/search-otp",
            icon: TiKeyOutline,
            showInSidebar: true,
          },
          {
            name: t("Manage Store"),
            path: "/admin/manage-store",
            icon: MdOutlineStorefront,
            showInSidebar: true,
          },
          {
            name: t("Edit Store"),
            path: "/admin-edit-store",
            icon: MdOutlineStorefront,
            showInSidebar: false,
            parents: [t("Manage Store")],
          },
          {
            name: t("Add Store"),
            path: "/admin/add-store",
            icon: MdOutlineStorefront,
            showInSidebar: false,
            parents: [t("Manage Store")],
          },

          {
            name: t("Manage Provinces"),
            path: "/admin/manage-provinces",
            icon: AiOutlineApartment,
            showInSidebar: true,
          },
          {
            name: t("Edit Provinces"),
            path: "/edit-provinces",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Provinces")],
          },
          {
            name: t("Add Province"),
            path: "/admin/add-provinces",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Provinces")],
          },

          {
            name: t("Manage Zones"),
            path: "/admin/manage-zones",
            icon: GrMapLocation,
            showInSidebar: true,
          },
          {
            name: t("Edit Zones"),
            path: "/edit-zones",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Zones")],
          },
          {
            name: t("Add Zone"),
            path: "/admin/add-zones",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Zones")],
          },

          {
            name: t("Manage Cities"),
            path: "/admin/manage-city",
            icon: FaCity,
            showInSidebar: true,
          },
          {
            name: t("Edit City"),
            path: "/admin-edit-city",
            icon: FaCity,
            showInSidebar: false,
            parents: [t("Manage Cities")],
          },
          {
            name: t("Add City"),
            path: "/admin/add-city",
            icon: FaCity,
            showInSidebar: false,
            parents: [t("Manage Cities")],
          },

          {
            name: t("Manage Neighborhoods"),
            path: "/admin/manage-neighborhood",
            icon: BsHouses,
            showInSidebar: true,
          },
          {
            name: t("Edit Neighborhood"),
            path: "/admin-edit-neighborhood",
            icon: BsHouses,
            showInSidebar: false,
            parents: [t("Manage Neighborhoods")],
          },
          {
            name: t("Add Neighborhood"),
            path: "/admin/add-neighborhood",
            icon: BsHouses,
            showInSidebar: false,
            parents: [t("Manage Neighborhoods")],
          },
          {
            name: t("Manage Courier"),
            path: "/admin/Courier",
            icon: FaTruckFast,
            showInSidebar: false,
          },

          {
            name: t("Manage Clients"),
            path: "/admin/manage-clients",
            icon: GrMapLocation,
            showInSidebar: false,
          },
          {
            name: t("Edit Clients"),
            path: "/edit-clients",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Clients")],
          },
          {
            name: t("Add Client"),
            path: "/admin/add-clients",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("Manage Clients")],
          },
          {
            name: t("shipment_detail"),
            path: "/admin/shipment-detail",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("list_shipment")],
          },
          {
            name: t("Agreement(BTC)"),
            path: "/admin/agreement",
            icon: RiFilePaper2Line,
            showInSidebar: true,
          },
        ]
      : user?.role_id == 8
      ? [
          {
            name: t("dashboard"),
            path: "/customer-care/dashboard",
            icon: AiOutlineAppstore,
            showInSidebar: true,
          },
          {
            name: t("Customer Care Profile"),
            path: "/customer-care/user-profile",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [],
          },
          {
            name: "Manage User",
            path: "/customer-care/manage-user",
            icon: LiaUserCogSolid,
            showInSidebar: true,
          },

          {
            name: t("Manage OTP"),
            path: "/customer-care/search-otp",
            icon: TiKeyOutline,
            showInSidebar: true,
          },
          {
            name: t("shipment_detail"),
            path: "/customer-care/shipment-detail",
            icon: LiaShippingFastSolid,
            showInSidebar: false,
            parents: [t("keeper_list_shipment")],
          },
        ]
      : [
          {
            name: t("dashboard"),
            path: "/cashier/dashboard",
            icon: AiOutlineAppstore,
            showInSidebar: true,
          },
        ];

  useEffect(() => {
    if (isTabletMid) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div className="flex">
      <Sidebar
        open={open}
        Nav_animation={Nav_animation}
        sidebarRef={sidebarRef}
        setOpen={(value) => setOpen(value)}
        pathname={pathname}
        isTabletMid={isTabletMid}
        sidebarItems={sidebarItems}
        Arrow={arrow}
        setArrow={setArrow}
        elementRef={elementRef}
      />
      <div className="w-full h-screen overflow-auto">
        {/* Main Content */}
        <Navbar
          setOpen={(value) => setOpen(value)}
          sidebarItems={sidebarItems}
        />
        {/* <ScrollPanel
          className="flex-grow overflow-y-auto"
          pt={{
            barY: {
              className: "bg-secondary",
            },
          }}
        > */}
        <div className="pt-1 mx-auto p-2 md:pr-2 ">{children}</div>
        {/*  add space for scrollpanel */}
        {/* <div className="footer py-10 my-8"></div> */}
        {/* </ScrollPanel> */}
      </div>
      <Toast position="bottom-right" ref={toast} />
    </div>
  );
}

export default RootLayout;
