/**
 * useRoute.js
 * AxonAI One — Shared routing hook
 *
 * Tracks the active module (sidebar item id) by watching:
 *  1. window.location on mount
 *  2. frappe.router 'change' events (Frappe SPA navigation)
 *  3. browser popstate (back/forward buttons)
 */

import { useState, useEffect, useCallback } from 'react';

/** Map of URL path prefixes → module ids (longest match wins) */
const PATH_MODULE_MAP = [
  // Ordered longest-first so startsWith picks the most specific match
  { prefix: '/app/point-of-sale', id: 'pos' },
  { prefix: '/app/query-report',  id: 'reports' },
  { prefix: '/app/call-log',      id: 'calls' },
  { prefix: '/app/system-settings', id: 'settings' },
  { prefix: '/app/buying',        id: 'erp' },
  { prefix: '/app/selling',       id: 'erp' },
  { prefix: '/app/stock',         id: 'erp' },
  { prefix: '/app/accounts',      id: 'erp' },
  { prefix: '/app/payroll',       id: 'hrms' },
  { prefix: '/app/project',       id: 'projects' },
  { prefix: '/app/task',          id: 'projects' },
  { prefix: '/app/crm',           id: 'crm' },
  { prefix: '/app/hr',            id: 'hrms' },
  { prefix: '/app/automation',    id: 'automation' },
  { prefix: '/app/file',          id: 'files' },
  { prefix: '/app/event',         id: 'calendar' },
  { prefix: '/app/user',          id: 'settings' },
  { prefix: '/app/home',          id: 'erp' },
  { prefix: '/app/',              id: 'erp' },   // catch-all for /app/*
];

function resolveModule(pathname) {
  for (const { prefix, id } of PATH_MODULE_MAP) {
    if (pathname.startsWith(prefix)) return id;
  }
  return 'erp';
}

export function useRoute() {
  const [activeModule, setActiveModule] = useState(() =>
    resolveModule(window.location.pathname)
  );

  const sync = useCallback(() => {
    setActiveModule(resolveModule(window.location.pathname));
  }, []);

  useEffect(() => {
    // Frappe SPA router (hash-based) fires 'change' on route transitions
    if (window.frappe && window.frappe.router) {
      window.frappe.router.on('change', sync);
    }

    // Standard browser back/forward button support
    window.addEventListener('popstate', sync);

    // Initial sync
    sync();

    return () => {
      if (window.frappe && window.frappe.router) {
        if (typeof window.frappe.router.off === 'function') {
          window.frappe.router.off('change', sync);
        }
      }
      window.removeEventListener('popstate', sync);
    };
  }, [sync]);

  /**
   * Navigate to a Frappe route.
   * Uses frappe.set_route() when available, falls back to href.
   * @param {string} url  e.g. '/app/selling'
   */
  const navigate = useCallback((url) => {
    if (!url || url === '#') return;
    if (url === '#copilot') {
      const panel = document.getElementById('ax-copilot-panel');
      if (panel) panel.classList.toggle('ax-copilot-open');
      return;
    }
    if (window.frappe && window.frappe.set_route) {
      const segments = url.replace(/^\/app\//, '').split('/');
      window.frappe.set_route(segments);
    } else {
      window.location.href = url;
    }
    sync();
  }, [sync]);

  return { activeModule, setActiveModule, navigate };
}
