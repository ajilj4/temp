/* ═══════════════════════════════════════════════════════════════════
   axonai-shell.js
   AxonAI One — Main Shell Init + State Management
   Loaded via hooks.py app_include_js into every Frappe Desk page
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────
  // GLOBAL STATE  (simple object — no Zustand, no Redux)
  // ─────────────────────────────────────────────────────────────────
  var AX = {
    version: '1.0.0',

    state: {
      sidebarCollapsed: false,
      activeModule: 'erp',
      initialized: false,
    },

    // ── Called once when Frappe Desk is fully ready ──────────────
    init: function () {
      // Only mount when the Frappe desk main section exists
      // The .main-section div is always present on the desk app
      if (!document.querySelector('.main-section')) {
        return;
      }

      // Prevent double-init on Frappe SPA route changes
      if (AX.state.initialized) {
        AX.setActiveModuleFromRoute();
        AX.updateActiveNavItem();
        return;
      }

      AX.state.initialized = true;
      AX.setActiveModuleFromRoute();

      // Build sidebar (defined in axonai-sidebar.js)
      if (window.AxonAISidebar && window.AxonAISidebar.build) {
        window.AxonAISidebar.build();
      }

      // Listen for Frappe route changes (SPA navigation)
      if (frappe && frappe.router) {
        frappe.router.on('change', function () {
          AX.setActiveModuleFromRoute();
          AX.updateActiveNavItem();
        });
      }

      console.log('%c[AxonAI One] Shell v' + AX.version + ' loaded ✓', 'color:#4F46E5;font-weight:700;font-size:13px;');
    },

    // ── No JS sidebar hide needed — CSS in axonai-theme.css handles it
    // .layout-side-section { display: none !important; }
    // div.main-section gets margin-left: var(--ax-sidebar-width)
    hideFrappeSidebar: function () {
      // Intentionally empty — handled purely in CSS for instant application
      // before JS runs, preventing layout flash.
    },

    // ── Determine active module from current URL ─────────────────
    setActiveModuleFromRoute: function () {
      var path = window.location.pathname;
      var moduleMap = {
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

      AX.state.activeModule = 'erp'; // default
      for (var route in moduleMap) {
        if (path.startsWith(route)) {
          AX.state.activeModule = moduleMap[route];
          break;
        }
      }
    },

    // ── Update the active nav item highlight ─────────────────────
    updateActiveNavItem: function () {
      var items = document.querySelectorAll('.ax-nav-item');
      items.forEach(function (item) {
        item.classList.remove('ax-nav-active');
        if (item.dataset.id === AX.state.activeModule) {
          item.classList.add('ax-nav-active');
        }
      });
    },

    // ── Toggle sidebar collapse ───────────────────────────────────
    toggleSidebar: function () {
      AX.state.sidebarCollapsed = !AX.state.sidebarCollapsed;
      document.body.classList.toggle('ax-sidebar-collapsed', AX.state.sidebarCollapsed);

      // Flip chevron direction
      var btn = document.getElementById('ax-collapse-btn');
      if (btn) {
        btn.innerHTML = AX.state.sidebarCollapsed
          ? AX.ICONS['chevrons-right']
          : AX.ICONS['chevrons-left'];
        btn.title = AX.state.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
      }
    },

    // ── Toggle AI Copilot panel ───────────────────────────────────
    toggleCopilot: function () {
      // Placeholder — Phase 6 will build the full drawer
      var panel = document.getElementById('ax-copilot-panel');
      if (panel) {
        panel.classList.toggle('ax-copilot-open');
      }
    },

    // ── Inline SVG icons (Lucide-style, no CDN needed) ───────────
    ICONS: {
      'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      'briefcase': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      'shopping-bag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
      'folder': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
      'sparkles': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z"/><path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z"/></svg>',
      'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
      'bar-chart-2': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
      'help-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      'chevrons-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>',
      'chevrons-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>',
    },
  };

  // ─────────────────────────────────────────────────────────────────
  // BOOT — Reliable init for Frappe v15
  //
  // Problem: frappe.after_ajax() = $(document).ajaxComplete() which
  // only fires AFTER jQuery AJAX calls, NOT on the initial page load.
  //
  // Fix: Poll every 100ms until frappe.boot is set AND the desk DOM
  // is ready (.main-section present), then init once and stop.
  // Also hook frappe.router for SPA navigation re-runs.
  // ─────────────────────────────────────────────────────────────────

  var _bootAttempts = 0;

  function _tryBoot() {
    _bootAttempts++;

    // Safety: give up after 15 seconds (150 attempts × 100ms)
    if (_bootAttempts > 150) {
      console.warn('[AxonAI] Could not detect Frappe desk after 15s. Giving up.');
      return;
    }

    // Wait for:
    //  1. frappe global to exist (it's defined inline in app.html)
    //  2. frappe.boot to be set (confirms desk has booted, not login page)
    //  3. .main-section to exist in DOM (Frappe desk wrapper element)
    //  4. axonai-sidebar.js to be loaded (window.AxonAISidebar exists)
    var frappReady   = typeof frappe !== 'undefined' && frappe.boot && frappe.boot.user;
    var domReady     = !!document.querySelector('.main-section');
    var sidebarReady = typeof window.AxonAISidebar !== 'undefined';

    if (frappReady && domReady && sidebarReady) {
      AX.init();

      // Hook SPA route changes ONCE after successful init
      if (frappe.router && frappe.router.on) {
        frappe.router.on('change', function () {
          AX.setActiveModuleFromRoute();
          AX.updateActiveNavItem();
        });
      }
    } else {
      // Not ready yet — retry
      setTimeout(_tryBoot, 100);
    }
  }

  // Start polling as soon as this script executes
  // (scripts load synchronously, DOM may still be loading)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _tryBoot);
  } else {
    _tryBoot();
  }

  // Expose globally so sidebar.js and future modules can access it
  window.AxonAI = AX;

})();

