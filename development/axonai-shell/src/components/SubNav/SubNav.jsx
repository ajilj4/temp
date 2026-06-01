/**
 * SubNav.jsx
 * AxonAI One — Contextual vertical sub-navigation panel
 *
 * Appears as a narrow secondary left panel to the right of the main
 * Sidebar, showing grouped links for the currently active module.
 * Collapses automatically when the active module has no sub-nav groups.
 *
 * Industrial standard ref: VS Code Explorer panel, GitHub Docs sidebar,
 * Notion workspace left pane.
 */

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SUB_NAV } from '../../data/subNavConfig.js';
import { useRoute } from '../../hooks/useRoute.js';

function SubNavGroup({ group, activeUrl, onNavigate }) {
  const [expanded, setExpanded] = useState(true);

  const hasActive = group.items.some((item) =>
    window.location.pathname.startsWith(item.url.split('?')[0])
  );

  return (
    <div className={`ax-subnav-group${hasActive ? ' ax-subnav-group--has-active' : ''}`}>
      {group.title && (
        <button
          className="ax-subnav-group-header"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          <span className="ax-subnav-group-title">{group.title}</span>
          <span className="ax-subnav-group-chevron">
            {expanded
              ? <ChevronDown size={13} />
              : <ChevronRight size={13} />
            }
          </span>
        </button>
      )}

      {expanded && (
        <ul className="ax-subnav-items" role="list">
          {group.items.map((item) => {
            const urlBase = item.url.split('?')[0];
            const isActive = window.location.pathname.startsWith(urlBase);
            return (
              <li key={item.url}>
                <a
                  href={item.url}
                  className={`ax-subnav-item${isActive ? ' ax-subnav-item--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.url);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="ax-subnav-item-dot" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function SubNav() {
  const { activeModule, navigate } = useRoute();
  const config = SUB_NAV[activeModule];
  const hasSubNav = !!(config && config.groups && config.groups.length > 0);

  useEffect(() => {
    document.body.classList.toggle('ax-has-subnav', hasSubNav);
    return () => {
      document.body.classList.remove('ax-has-subnav');
    };
  }, [hasSubNav]);

  // Don't render if no config or no groups defined
  if (!hasSubNav) {
    return null;
  }

  return (
    <aside className="ax-subnav" id="ax-subnav" aria-label={`${config.label} navigation`}>
      {/* Module label header */}
      <div className="ax-subnav-header">
        <span className="ax-subnav-module-label">{config.label}</span>
      </div>

      {/* Scrollable group list */}
      <div className="ax-subnav-body">
        {config.groups.map((group, idx) => (
          <SubNavGroup
            key={group.title || idx}
            group={group}
            activeUrl={window.location.pathname}
            onNavigate={navigate}
          />
        ))}
      </div>
    </aside>
  );
}
