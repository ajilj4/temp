/**
 * ModuleNav.jsx
 * AxonAI One — Horizontal module tab bar
 *
 * Sits directly below the TopHeader, showing the primary ERPNext modules
 * as horizontal pill/tab links.  Clicking a tab routes via Frappe router
 * and highlights the active tab synced with the current URL.
 *
 * Industrial standard ref: SAP Fiori launchpad tabs, Salesforce NavBar tabs.
 */

import React from 'react';
import { MENU } from '../../data/menuConfig.js';
import { useRoute } from '../../hooks/useRoute.js';

// Only show module-level items in the tab bar (not tools/copilot/etc.)
const MODULE_TABS = MENU.filter(
  (item) => !['copilot', 'automation', 'reports', 'files', 'calendar', 'calls'].includes(item.id)
);

export default function ModuleNav() {
  const { activeModule, navigate } = useRoute();

  const handleClick = (e, item) => {
    e.preventDefault();
    navigate(item.url);
  };

  return (
    <nav className="ax-module-nav" aria-label="Module navigation">
      <div className="ax-module-nav-inner">
        {MODULE_TABS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <a
              key={item.id}
              href={item.url}
              className={`ax-module-tab${isActive ? ' ax-module-tab--active' : ''}`}
              onClick={(e) => handleClick(e, item)}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
            >
              <span className="ax-module-tab-icon">
                <Icon size={15} />
              </span>
              <span className="ax-module-tab-label">{item.label}</span>
              {isActive && <span className="ax-module-tab-indicator" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
