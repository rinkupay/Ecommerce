import React, { Fragment } from "react";
import "./DashboardSideNav.css";
import { Link, NavLink } from "react-router-dom";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const DashboardSideNav = () => {
  const menus = [
    { name: "Dashboard", link: "/admin/dashboard" },
    // { name: "Add Product", link: "/admin/product/new" },
    { name: "Products", link: "/admin/products" },
    { name: "Orders", link: "/admin/orders" },
    { name: "Users", link: "/admin/users" },
  ];

  return (
    <Fragment>
      <div className="sidebar-container">
        {menus.map((item, index) => (
          <div className="menu" key={index}>
            <NavLink
              className="nav-menu-item"
              to={item.link}
              // activeClassName="active"
            >
              {item.name}
            </NavLink>
          </div>
        ))}
        
      </div>
    </Fragment>
  );
};

export default DashboardSideNav;
