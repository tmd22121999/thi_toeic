import React, { useState } from "react";
import Header from "./Header";
import { useIntl } from "react-intl";
import Aside from "./Aside";

function Layout(props) {
  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [collapse,setCollapse]=React.useState(false);
  const intl = useIntl();

  const handleRtlChange = (checked) => {
    setRtl(checked);
    //setLocale(checked ? "ar" : "en");
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const handleCollapseSidebar = (value) => {
    setCollapse(value);
  };

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <Aside
        id={"Sidebar"}
        rtl={rtl}
        toggled={toggled}
        collapse={collapse}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapseSidebar={handleCollapseSidebar}
      />
      <main className={`main ${collapse ? "main-collapse" : "non-collapse"}`}>
        <Header title={props.title} handleToggleSidebar={handleToggleSidebar} />
        <div className="app-content">{props.children}</div>
      </main>
    </div>
  );
}

export default Layout;
