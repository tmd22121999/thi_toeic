import './styles.css';
// import { Grid, Card, Text } from "@nextui-org/react";
import { Sidebar,SidebarHeader, Menu, MenuItem,useProSidebar } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';

function SidebarComponent() {
  const { collapseSidebar } = useProSidebar();
  return (
    <>
    <Sidebar className='Sidebar'>
      <SidebarHeader>
    <main>
      <button id='SidebarCollapse' onClick={() => collapseSidebar()}>Collapse</button>
    </main>

      </SidebarHeader>
      <Menu>
        <MenuItem routerLink={<Link to="/HomeView" />}> Home </MenuItem>
        <MenuItem routerLink={<Link to="/ExamView" />}> ExamView </MenuItem>
      </Menu>
    </Sidebar>
      <Outlet />
    </>
  )
}

export default SidebarComponent;
