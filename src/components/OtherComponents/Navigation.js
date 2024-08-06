import React, { useState } from "react";
import Courier from "../pages/Admin/Courier/Courier";
import KeeperListMain from "../pages/Admin/KeeperList/KeeperListMain";
import ClientsMain from "../pages/Admin/ManageClient/ClientsMain";
import CustomerCare from "../pages/Admin/CustomerCare/CustomerCare";
import CashierMain from "../pages/Admin/Cashier/CashierMain";
import AccountantMain from "../pages/Admin/Accountant/AccountantMain";
function Navigation({ array }) {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <ul
          className={`grid grid-flow-col text-center text-primary bg-primary/10 shadow-inner shadow-primary/30 border border-gray-300 my-3 rounded-lg p-1 overflow-x-auto`}
        >
          {array.map((item, index) => (
            <li
              key={index}
              style={{ minWidth: "120px" }} 
              onClick={() => handleClick(index)}
            >
              <a
                href={`#-Manage-${item.label}`}
                className={`flex justify-center py-2 font-semibold ${
                  index === selectedItem
                    ? "bg-primary rounded-lg shadow text-white"
                    : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {selectedItem === 0 ? <ClientsMain /> : null}
        {selectedItem === 1 ? <KeeperListMain /> : null}
        {selectedItem === 2 ? <Courier /> : null}
        {selectedItem === 3 ? <CustomerCare /> : null}
        {selectedItem === 4 ? <CashierMain /> : null}
        {selectedItem === 5 ? <AccountantMain /> : null}
      </div>
    </>
  );
}

export default Navigation;
