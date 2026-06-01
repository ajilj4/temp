import React, { useState, useEffect } from 'react';
import SidebarLogo from './SidebarLogo.jsx';
import SidebarItem from './SidebarItem.jsx';
import SidebarFooter from './SidebarFooter.jsx';
import { MENU } from '../../data/menuConfig.js';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('erp');

  const toggleCollapse = () => {
    const nextCollapsed = !collapsed;
    setCollapsed(nextCollapsed);
    document.body.classList.toggle('ax-sidebar-collapsed', nextCollapsed);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const moduleMap = {
        '/app/home':          'erp',
        '/app/buying':        'erp',
        '/app/selling':       'erp',
        '/app/stock':         'erp',
        '/app/accounts':      'erp',
        '/app/crm':           'crm',
        '/app/hr':            'hrms',
        '/app/payroll':       'hrms',
        '/app/point-of-sale': 'pos',
        '/app/project':       'projects',
        '/app/task':          'projects',
        '/app/automation':    'automation',
        '/app/query-report':  'reports',
        '/app/file':          'files',
        '/app/event':         'calendar',
        '/app/call-log':      'calls',
        '/app/system-settings': 'settings',
        '/app/user':          'settings',
      };

      let active = 'erp';
      for (const route in moduleMap) {
        if (path.startsWith(route)) {
          active = moduleMap[route];
          break;
        }
      }
      setActiveModule(active);
    };

    handleRouteChange();

    if (window.frappe && window.frappe.router) {
      window.frappe.router.on('change', handleRouteChange);
    }
    return () => {
      if (window.frappe && window.frappe.router) {
        if (typeof window.frappe.router.off === 'function') {
          window.frappe.router.off('change', handleRouteChange);
        }
      }
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.url === '#copilot') {
      const panel = document.getElementById('ax-copilot-panel');
      if (panel) {
        panel.classList.toggle('ax-copilot-open');
      }
    } else {
      setActiveModule(item.id);
    }
  };

  let lastSection = null;

  return (
    <div id="ax-sidebar">
      <SidebarLogo collapsed={collapsed} onToggleCollapse={toggleCollapse} />
      
      <nav className="ax-sidebar-nav">
        {MENU.map((item, idx) => {
          const showSectionLabel = item.section && item.section !== lastSection;
          if (showSectionLabel) {
            lastSection = item.section;
          }
          
          return (
            <React.Fragment key={item.id || idx}>
              {showSectionLabel && !collapsed && (
                <div className="ax-section-label">{item.section}</div>
              )}
              <SidebarItem 
                item={item} 
                collapsed={collapsed} 
                isActive={activeModule === item.id} 
                onClick={handleItemClick}
              />
              {item.dividerAfter && <div className="ax-sidebar-divider" />}
            </React.Fragment>
          );
        })}
      </nav>

      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}
