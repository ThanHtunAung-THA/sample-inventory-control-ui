import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from "@coreui/react";

// sidebar nav config
import getNavigation  from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  // State to hold the user code
  const [userCode, setUserCode] = useState(localStorage.getItem('user-code') || '');
  const [userName, setUserName] = useState(localStorage.getItem('user-name') || '');

  // Effect to update userCode when the component mounts
  useEffect(() => {
    const handleStorageChange = () => {
      setUserCode(localStorage.getItem('user-code'));
      setUserName(localStorage.getItem('user-name'));
    };

    // Update userCode when Local Storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/admin/dashboard">
        <CImg
          src={"/image/Inven.jpg"}
          className="img-fluid rounded-circle mr-2"
          alt="admin@bootstrapmaster.com"
          style={{width:"3rem"}}
        />
        IVEN - inventory control
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={getNavigation(userCode, userName)}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
            
          }}
        />
      </CSidebarNav>

      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
