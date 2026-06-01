/* ═══════════════════════════════════════════════════════════════════
   axonai-sidebar.js
   AxonAI One — Sidebar DOM Builder
   Builds the full left sidebar and injects it into the Frappe body
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────
  // MENU CONFIGURATION — 12 items matching the design spec
  // ─────────────────────────────────────────────────────────────────
  var MENU = [
    // ── ERP Suite ───────────────────────────────────────
    { id: 'erp',        label: 'ERP',         icon: 'layers',       url: '/app/home',            section: null        },
    { id: 'crm',        label: 'CRM',         icon: 'users',        url: '/app/crm',             section: null        },
    { id: 'hrms',       label: 'HRMS',        icon: 'briefcase',    url: '/app/hr',              section: null        },
    { id: 'pos',        label: 'POS',         icon: 'shopping-bag', url: '/app/point-of-sale',   section: null        },
    { id: 'projects',   label: 'Projects',    icon: 'folder',       url: '/app/project',         section: null,  dividerAfter: true },

    // ── Tools & AI ──────────────────────────────────────
    { id: 'copilot',    label: 'AI Copilot',  icon: 'sparkles',     url: '#copilot',             section: 'Tools'     },
    { id: 'automation', label: 'Automation',  icon: 'cpu',          url: '/app/automation',      section: null        },
    { id: 'reports',    label: 'Reports',     icon: 'bar-chart-2',  url: '/app/query-report',    section: null        },
    { id: 'files',      label: 'Files',       icon: 'file-text',    url: '/app/file',            section: null,  dividerAfter: true },

    // ── Communication ────────────────────────────────────
    { id: 'calendar',   label: 'Calendar',    icon: 'calendar',     url: '/app/event',           section: null        },
    { id: 'calls',      label: 'Calls',       icon: 'phone',        url: '/app/call-log',        section: null,  dividerAfter: true },

    // ── System ──────────────────────────────────────────
    { id: 'settings',   label: 'Settings',    icon: 'settings',     url: '/app/system-settings', section: null        },
  ];

  // ─────────────────────────────────────────────────────────────────
  // BUILD SIDEBAR DOM
  // ─────────────────────────────────────────────────────────────────
  function buildSidebar() {
    // Don't double-build
    if (document.getElementById('ax-sidebar')) return;

    var AX = window.AxonAI;
    if (!AX) return;

    // Read user session from Frappe
    var user     = (frappe.session && frappe.session.user_fullname) || (frappe.session && frappe.session.user) || 'User';
    var initial  = user.charAt(0).toUpperCase();

    // ── Build nav items HTML ───────────────────────────────────
    var navHTML = '';
    var lastSection = null;

    MENU.forEach(function (item) {
      // Section label
      if (item.section && item.section !== lastSection) {
        navHTML += '<div class="ax-section-label">' + item.section + '</div>';
        lastSection = item.section;
      }

      var isActive = AX.state.activeModule === item.id ? ' ax-nav-active' : '';
      navHTML += (
        '<a href="' + item.url + '" class="ax-nav-item' + isActive + '" data-id="' + item.id + '" title="' + item.label + '">' +
          '<span class="ax-nav-icon">' + (AX.ICONS[item.icon] || '') + '</span>' +
          '<span class="ax-nav-label">' + item.label + '</span>' +
        '</a>'
      );

      // Divider after this item
      if (item.dividerAfter) {
        navHTML += '<div class="ax-sidebar-divider"></div>';
      }
    });

    // ── Build full sidebar HTML ────────────────────────────────
    var sidebarHTML = (
      '<div id="ax-sidebar">' +

        // Logo row
        '<div class="ax-sidebar-logo">' +
          '<div class="ax-logo-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" fill="white" fill-opacity="0.15" stroke="white" stroke-opacity="0.5" stroke-width="1"/>' +
              '<text x="12" y="15.5" text-anchor="middle" fill="white" font-size="7.5" font-weight="700" font-family="Inter,sans-serif" letter-spacing="-0.5">AX</text>' +
            '</svg>' +
          '</div>' +
          '<div class="ax-logo-name">' +
            'AxonAI One' +
            '<span class="ax-logo-subtitle">Enterprise Suite</span>' +
          '</div>' +
          '<button class="ax-collapse-btn" id="ax-collapse-btn" title="Collapse sidebar">' +
            AX.ICONS['chevrons-left'] +
          '</button>' +
        '</div>' +

        // Navigation
        '<nav class="ax-sidebar-nav" id="ax-sidebar-nav">' +
          navHTML +
        '</nav>' +

        // Footer
        '<div class="ax-sidebar-footer">' +
          '<a href="/app/user" class="ax-nav-item ax-footer-help" title="Help & Docs" data-id="help">' +
            '<span class="ax-nav-icon">' + AX.ICONS['help-circle'] + '</span>' +
            '<span class="ax-nav-label">Help</span>' +
          '</a>' +
          '<div class="ax-user-row" id="ax-user-row">' +
            '<div class="ax-user-avatar">' + initial + '</div>' +
            '<div class="ax-user-info">' +
              '<span class="ax-user-name">' + user + '</span>' +
              '<span class="ax-user-status"><span class="ax-online-dot"></span>Online</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>'
    );

    // ── Inject into DOM ────────────────────────────────────────
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // ── Bind Events ────────────────────────────────────────────
    _bindSidebarEvents();
  }

  // ─────────────────────────────────────────────────────────────────
  // EVENT BINDING
  // ─────────────────────────────────────────────────────────────────
  function _bindSidebarEvents() {
    var AX = window.AxonAI;

    // Collapse toggle button
    var collapseBtn = document.getElementById('ax-collapse-btn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        AX.toggleSidebar();
      });
    }

    // AI Copilot intercept
    var copilotItem = document.querySelector('.ax-nav-item[data-id="copilot"]');
    if (copilotItem) {
      copilotItem.addEventListener('click', function (e) {
        e.preventDefault();
        AX.toggleCopilot();
      });
    }

    // Highlight active item on click (instant feedback)
    var navItems = document.querySelectorAll('.ax-nav-item[data-id]');
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var id = this.dataset.id;
        if (id && id !== 'copilot' && id !== 'help') {
          navItems.forEach(function (i) { i.classList.remove('ax-nav-active'); });
          this.classList.add('ax-nav-active');
          window.AxonAI.state.activeModule = id;
        }
      }.bind(item));
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // REGISTER with global AX object
  // ─────────────────────────────────────────────────────────────────
  window.AxonAISidebar = {
    build: buildSidebar,
  };

  // If axonai-shell.js already ran and initialized but sidebar is missing, build it now
  if (window.AxonAI && window.AxonAI.state && window.AxonAI.state.initialized) {
    buildSidebar();
  }

})();
