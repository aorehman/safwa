import React from "react";
import Navigation from "../../../OtherComponents/Navigation";

function ManageUser() {
  const items = [
    { label: "Client", icon: "pi pi-list" },
    { label: "Keeper", icon: "pi pi-home" },
    { label: "Courier", icon: "pi pi-chart-line" },
    { label: "Customer Care", icon: "pi pi-chart-line" },
    { label: "Cashier", icon: "pi pi-chart-line" },
    { label: "Accountant", icon: "pi pi-chart-line" },
  ];
  return (
    <div>
      <Navigation array={items} />
    </div>
  );
}

export default ManageUser;
