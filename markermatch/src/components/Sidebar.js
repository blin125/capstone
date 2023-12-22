import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getSideLinks } from '../helperFunctions/CheckUser';

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarFooter,
    CDBSidebarMenuItem,
    
  } from 'cdbreact';
  import { useNavigate, useLocation } from 'react-router-dom';
  
  function Sidebar(){
    const { user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate(); 
    const location = useLocation();
    const isPathActive = (path) => location.pathname.includes(path);
    const pathRoutes = getSideLinks(user);
      return (
        <>
          <div className="sidebox">
            <CDBSidebar maxWidth="220px" minWidth="80px" id="CDBSidebar">
              <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <p id="Menu">Menu</p>
              </CDBSidebarHeader>
              <CDBSidebarContent className="sidebar-content">
                  {pathRoutes.map((link, index) =>
                    link.show === undefined || link.show ? (
                      <CDBSidebarMenuItem
                        key={index}
                        icon={link.icon}
                        onClick={() => {                  
                             
                            navigate(link.path);
                          
                        }}
                        className={isPathActive(link.path) ? 'activeClicked' : ''}
                        disabled={isPathActive(link.path)}
                      >
                        {link.label}
                      </CDBSidebarMenuItem>
                    ) : null
                  )}
              </CDBSidebarContent>
              <CDBSidebarFooter id="CDBSidebarFooter">
                <div className="sidebar-btn-wrapper"> Team 12 - 2023 </div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>
        </>
      );
    }
    
    export default Sidebar;