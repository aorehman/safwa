import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./scss/index.scss";
import Store from "./store";
import { Provider } from "react-redux";
import ApiLoader from "./components/Loader/ApiLoader";
import FallBackSuspenseLoader from "./components/Loader/FallBackSuspenseLoader";
import TrackOrderMain from "./components/pages/OrderTracking/TrackOrderMain";
import ShipmentDetailMain from "./components/pages/ListShipment/ShipmentDetail/ShipmentDetailMain";
import CashierRoutes from "./protectedRoutes/CashierRoutes";
import AssignForReturnMain from "./components/pages/Keeper/AssignForReturn/AssignForReturnMain";
import Home from "./components/LandingPage/home/Home";
import Track from "./components/LandingPage/TrackOrder";
import HomeLayout from "./components/layouts/HomeLayout/HomeLayout";
import ReturnToWarehouseMain from "./components/pages/Keeper/ReturnToWareHouse/ReturnToWarehouseMain";
import AdminRoutes from "./protectedRoutes/AdminRoutes";
import KeeperListMain from "./components/pages/Admin/KeeperList/KeeperListMain";
import PackageTypesMain from "./components/pages/Admin/ManagePackageTypes/PackageTypesMain";
import CreatePackage from "./components/pages/Admin/ManagePackageTypes/CreatePackage";
import CollectionChargesMain from "./components/pages/Admin/CollectionCharges/CollectionChargesMain";
import AddCollectionCharges from "./components/pages/Admin/CollectionCharges/AddCollectionCharges";
import SearchOtpMain from "./components/pages/Admin/ManageOtp/SearchOtpMain";
import StoreMain from "./components/pages/Admin/ManageStore/StoreMain";
import AddStore from "./components/pages/Admin/ManageStore/AddStore";
import AddKeeper from "./components/pages/Admin/KeeperList/AddKeeper";
import CitiesMain from "./components/pages/Admin/ManageCities/CitiesMain";
import AddCity from "./components/pages/Admin/ManageCities/AddCity";
import ManageNeighborhoodMain from "./components/pages/Admin/ManageNeighborhood/ManageNeighborhoodMain";
import AddNeighborhood from "./components/pages/Admin/ManageNeighborhood/AddNeighborhood";
import ProvincesMain from "./components/pages/Admin/ManageProvinces/ProvincesMain";
import AddProvince from "./components/pages/Admin/ManageProvinces/AddProvince";
import ZonesMain from "./components/pages/Admin/ManageZones/ZonesMain";
import AddZone from "./components/pages/Admin/ManageZones/AddZone";
import Courier from "../src/components/pages/Admin/Courier/Courier";
import ClientsMain from "./components/pages/Admin/ManageClient/ClientsMain";
import AddClient from "./components/pages/Admin/ManageClient/AddClient";
import ManageUser from "./components/pages/Admin/ManageUser/ManageUser";
import CustomerCareRoutes from "./protectedRoutes/CustomerCareRoutes";
import Agreement from "./components/pages/Admin/(BTC)Agreement/Agreement";
import DashNotFound from "./components/PageNotFound/DashNotFound";
import NoDashRoute from "./protectedRoutes/NoDash";

const Registration = lazy(() =>
  import("./components/Authentication/Registration/RegistrationMain")
);
const ResetForm = lazy(() =>
  import("./components/Authentication/ForgotPassword/ResetForm")
);
const LoginMain = lazy(() =>
  import("./components/Authentication/Login/LoginMain")
);
const ForgotPass = lazy(() =>
  import("./components/Authentication/ForgotPassword/ForgotPass")
);
const AuthRoutes = lazy(() => import("./protectedRoutes/AuthRoutes"));
const ClientRoutes = lazy(() => import("./protectedRoutes/ClientRoutes"));
const KeeperRoutes = lazy(() => import("./protectedRoutes/KeeperRoutes"));
const AllStoreOrdersMain = lazy(() =>
  import("./components/pages/Keeper/AllStoreOrders/AllStoreOrdersMain")
);
const ReceiveInBoundOrdersMain = lazy(() =>
  import(
    "./components/pages/Keeper/ReceiveInBoundOrders/ReceiveInBoundOrdersMain"
  )
);
const Verification = lazy(() =>
  import("../src/components/Authentication/Registration/Verification")
);
const TransitDestinationMain = lazy(() =>
  import(
    "./components/pages/Keeper/TransitToDistination/TransitDestinationMain"
  )
);
const TransitOriginMain = lazy(() =>
  import("./components/pages/Keeper/TransitToOrigin/TransitOriginMain")
);
const AssignForPickupMain = lazy(() =>
  import("./components/pages/Keeper/AssignForPickup/AssignForPickupMain")
);
const AssignForDeliverMain = lazy(() =>
  import("./components/pages/Keeper/AssignForDeliver/AssignForDeliverMain")
);

const DashboardMain = lazy(() =>
  import("./components/pages/Dashboard/DashboardMain")
);
const LishShipmentMain = lazy(() =>
  import("./components/pages/ListShipment/LishShipmentMain")
);
const NotFound = lazy(() => import("./components/PageNotFound/NotFound"));
const AddNewShipment = lazy(() =>
  import("./components/pages/ListShipment/AddNewShipment/AddNewShipment")
);
const UserProfileMain = lazy(() =>
  import("./components/pages/UserManagement/UserProfileMain")
);
const AuthLayout = lazy(() =>
  import("./components/layouts/AuthLayout/AuthLayout")
);
const RootLayout = lazy(() =>
  import("./components/layouts/RootLayout/RootLayout")
);

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<HomeLayout />}>
            <Route path="/order-track/:id" element={<Track />} />
          </Route>

          <Route
            path="/client"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <RootLayout>
                  <ClientRoutes />
                </RootLayout>
              </Suspense>
            }
          >
            <Route path="dashboard" exact element={<DashboardMain />} />
            <Route path="shipment-all" exact element={<LishShipmentMain />} />
            <Route path="add-shipment" exact element={<AddNewShipment />} />
            <Route path="user-profile" exact element={<UserProfileMain />} />
            <Route path="track-order" exact element={<TrackOrderMain />} />
            <Route
              path="shipment-detail/:id"
              exact
              element={<ShipmentDetailMain />}
            />
          </Route>
          <Route
            path="/cashier"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <RootLayout>
                  <CashierRoutes />
                </RootLayout>
              </Suspense>
            }
          >
            <Route path="dashboard" exact element={<DashboardMain />} />
          </Route>

          <Route
            path="/customer-care"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <RootLayout>
                  <CustomerCareRoutes />
                </RootLayout>
              </Suspense>
            }
          >
            <Route path="dashboard" exact element={<DashboardMain />} />
            <Route path="user-profile" exact element={<UserProfileMain />} />
            <Route path="manage-user" exact element={<ManageUser />} />
            <Route path="search-otp" exact element={<SearchOtpMain />} />
            <Route
              path="shipment-detail/:id"
              exact
              element={<ShipmentDetailMain />}
            />
          </Route>

          <Route
            path="/admin"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <RootLayout>
                  <AdminRoutes />
                </RootLayout>
              </Suspense>
            }
          >
            <Route path="dashboard" exact element={<DashboardMain />} />
            <Route path="user-profile" exact element={<UserProfileMain />} />
            <Route path="shipment-all" exact element={<LishShipmentMain />} />
            <Route path="add-shipment" exact element={<AddNewShipment />} />
            <Route
              path="shipment-detail/:id"
              exact
              element={<ShipmentDetailMain />}
            />
            <Route path="manage-keeper" exact element={<KeeperListMain />} />
            <Route path="add-keeper" exact element={<AddKeeper />} />
            <Route path="edit-keeper/:keeperId" exact element={<AddKeeper />} />

            <Route
              path="collection-charges"
              exact
              element={<CollectionChargesMain />}
            />
            <Route
              path="edit-collection-charges/:collectionChargesId"
              exact
              element={<AddCollectionCharges />}
            />
            <Route
              path="manage-package-types"
              exact
              element={<PackageTypesMain />}
            />
            <Route path="create-package" exact element={<CreatePackage />} />

            <Route
              path="edit-package/:packageId"
              exact
              element={<CreatePackage />}
            />

            <Route path="manage-provinces" exact element={<ProvincesMain />} />
            <Route path="add-provinces" exact element={<AddProvince />} />

            <Route
              path="edit-provinces/:provinceId"
              exact
              element={<AddProvince />}
            />

            <Route path="manage-zones" exact element={<ZonesMain />} />
            <Route path="add-zones" exact element={<AddZone />} />

            <Route path="edit-zones/:zoneId" exact element={<AddZone />} />

            <Route path="manage-clients" exact element={<ClientsMain />} />
            <Route path="add-clients" exact element={<AddClient />} />

            <Route
              path="edit-clients/:clientId"
              exact
              element={<AddClient />}
            />

            <Route
              path="collection-charges"
              exact
              element={<CollectionChargesMain />}
            />
            <Route
              path="edit-collection-charges/:collectionChargesId"
              exact
              element={<AddCollectionCharges />}
            />

            <Route path="search-otp" exact element={<SearchOtpMain />} />

            <Route path="manage-store" exact element={<StoreMain />} />
            <Route path="add-store" exact element={<AddStore />} />
            <Route path="store/:storeId" exact element={<AddStore />} />

            <Route path="manage-city" exact element={<CitiesMain />} />
            <Route path="add-city" exact element={<AddCity />} />
            <Route path="edit-city/:cityId" exact element={<AddCity />} />

            <Route
              path="manage-neighborhood"
              exact
              element={<ManageNeighborhoodMain />}
            />
            <Route
              path="add-neighborhood"
              exact
              element={<AddNeighborhood />}
            />
            <Route
              path="edit-neighborhood/:neighborhoodId"
              exact
              element={<AddNeighborhood />}
            />
            <Route path="Courier" exact element={<Courier />} />
            <Route path="manage-user" exact element={<ManageUser />} />
            <Route path="agreement" exact element={<Agreement />} />
          </Route>
          <Route
            path="/keeper"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <RootLayout>
                  <KeeperRoutes />
                </RootLayout>
              </Suspense>
            }
          >
            <Route path="dashboard" exact element={<DashboardMain />} />

            <Route path="user-profile" exact element={<UserProfileMain />} />
            <Route
              path="courier-return"
              exact
              element={<AssignForReturnMain />}
            />

            {/* <Route
              path="/all-store-orders"
              exact
              element={<AllStoreOrdersMain />}
            /> */}

            <Route path="shipment-all" exact element={<LishShipmentMain />} />

            <Route path="add-shipment" exact element={<AddNewShipment />} />

            {/* <Route
              path="/all-store-orders"
              exact
              element={<LishShipmentMain />}
            /> */}

            <Route
              path="shipment-detail/:id"
              exact
              element={<ShipmentDetailMain />}
            />
            <Route
              path="receive-orders"
              exact
              element={<ReceiveInBoundOrdersMain />}
            />

            <Route
              path="return-to-warehouse"
              exact
              element={<ReturnToWarehouseMain />}
            />

            <Route
              path="assign-courier"
              exact
              element={<AssignForPickupMain />}
            />
            <Route
              path="courier-deliverd"
              exact
              element={<AssignForDeliverMain />}
            />
            <Route
              path="transit-destination"
              exact
              element={<TransitDestinationMain />}
            />
            <Route
              path="transit-origin"
              exact
              element={<TransitOriginMain />}
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <AuthLayout>
                  <AuthRoutes />
                </AuthLayout>
              </Suspense>
            }
          >
            <Route path="/sign-up" exact element={<Registration />} />

            <Route path="/login" exact element={<LoginMain />} />
            <Route path="/verification" exact element={<Verification />} />
            <Route path="/forgot" exact element={<ForgotPass />} />
            <Route exact path="/reset" element={<ResetForm />} />
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path="/not-authorized"
            element={
              <Suspense fallback={<FallBackSuspenseLoader />}>
                <NoDashRoute/>
              </Suspense>
            }
          >
            <Route index element={<DashNotFound />} />
          </Route>
        </Routes>
        <ApiLoader />
      </Router>
    </Provider>
  );
}

export default App;
