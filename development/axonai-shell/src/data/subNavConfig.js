/**
 * subNavConfig.js
 * AxonAI One — Per-module sub-navigation definitions
 *
 * Each module maps to an array of sub-nav groups, each group has a title
 * and an array of links.  Industrial standard: grouped sidebar links like
 * VS Code's activity bar → Explorer panels, or Notion sidebar.
 */

export const SUB_NAV = {

  erp: {
    label: 'ERP Suite',
    groups: [
      {
        title: 'Overview',
        items: [
          { label: 'Home Dashboard',   url: '/app/home' },
          { label: 'Workspace',        url: '/app/workspace' },
        ],
      },
      {
        title: 'Buying',
        items: [
          { label: 'Purchase Order',   url: '/app/purchase-order' },
          { label: 'Purchase Invoice', url: '/app/purchase-invoice' },
          { label: 'Supplier',         url: '/app/supplier' },
          { label: 'Request for Quotation', url: '/app/request-for-quotation' },
        ],
      },
      {
        title: 'Selling',
        items: [
          { label: 'Sales Order',      url: '/app/sales-order' },
          { label: 'Sales Invoice',    url: '/app/sales-invoice' },
          { label: 'Customer',         url: '/app/customer' },
          { label: 'Quotation',        url: '/app/quotation' },
        ],
      },
      {
        title: 'Inventory',
        items: [
          { label: 'Items',            url: '/app/item' },
          { label: 'Stock Entry',      url: '/app/stock-entry' },
          { label: 'Warehouses',       url: '/app/warehouse' },
          { label: 'Delivery Note',    url: '/app/delivery-note' },
        ],
      },
      {
        title: 'Accounts',
        items: [
          { label: 'Chart of Accounts', url: '/app/account' },
          { label: 'Journal Entry',    url: '/app/journal-entry' },
          { label: 'Payment Entry',    url: '/app/payment-entry' },
          { label: 'Tax Rules',        url: '/app/tax-rule' },
        ],
      },
    ],
  },

  crm: {
    label: 'CRM',
    groups: [
      {
        title: 'Pipeline',
        items: [
          { label: 'Leads',            url: '/app/crm-lead' },
          { label: 'Opportunities',    url: '/app/crm-deal' },
          { label: 'Contacts',         url: '/app/contact' },
          { label: 'Customers',        url: '/app/customer' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { label: 'Calls',            url: '/app/crm-call-log' },
          { label: 'Notes',            url: '/app/crm-note' },
          { label: 'Tasks',            url: '/app/crm-task' },
        ],
      },
      {
        title: 'Analytics',
        items: [
          { label: 'Sales Funnel',     url: '/app/crm-analytics' },
          { label: 'Win / Loss',       url: '/app/crm-analytics' },
        ],
      },
    ],
  },

  hrms: {
    label: 'HR & Payroll',
    groups: [
      {
        title: 'Employees',
        items: [
          { label: 'Employees',        url: '/app/employee' },
          { label: 'Departments',      url: '/app/department' },
          { label: 'Designations',     url: '/app/designation' },
        ],
      },
      {
        title: 'Attendance',
        items: [
          { label: 'Attendance',       url: '/app/attendance' },
          { label: 'Leave Applications', url: '/app/leave-application' },
          { label: 'Shifts',           url: '/app/shift-type' },
        ],
      },
      {
        title: 'Payroll',
        items: [
          { label: 'Payroll Entry',    url: '/app/payroll-entry' },
          { label: 'Salary Slip',      url: '/app/salary-slip' },
          { label: 'Salary Structure', url: '/app/salary-structure' },
        ],
      },
    ],
  },

  pos: {
    label: 'Point of Sale',
    groups: [
      {
        title: 'Operations',
        items: [
          { label: 'POS Opening',      url: '/app/pos-opening-entry' },
          { label: 'POS Closing',      url: '/app/pos-closing-entry' },
          { label: 'POS Invoices',     url: '/app/pos-invoice' },
        ],
      },
      {
        title: 'Configuration',
        items: [
          { label: 'POS Profiles',     url: '/app/pos-profile' },
          { label: 'Price Lists',      url: '/app/price-list' },
        ],
      },
    ],
  },

  projects: {
    label: 'Projects',
    groups: [
      {
        title: 'Work',
        items: [
          { label: 'Projects',         url: '/app/project' },
          { label: 'Tasks',            url: '/app/task' },
          { label: 'Timesheets',       url: '/app/timesheet' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { label: 'Milestones',       url: '/app/project-milestone' },
          { label: 'Expenses',         url: '/app/expense-claim' },
        ],
      },
    ],
  },

  automation: {
    label: 'Automation',
    groups: [
      {
        title: 'Rules',
        items: [
          { label: 'Assignment Rules', url: '/app/assignment-rule' },
          { label: 'Auto Repeat',      url: '/app/auto-repeat' },
          { label: 'Milestone Tracker', url: '/app/milestone-tracker' },
        ],
      },
      {
        title: 'Workflows',
        items: [
          { label: 'Workflows',        url: '/app/workflow' },
          { label: 'Workflow Actions', url: '/app/workflow-action' },
          { label: 'Notifications',    url: '/app/notification' },
        ],
      },
    ],
  },

  reports: {
    label: 'Reports',
    groups: [
      {
        title: 'Query Reports',
        items: [
          { label: 'Query Report',     url: '/app/query-report' },
          { label: 'Report Builder',   url: '/app/report' },
        ],
      },
      {
        title: 'Dashboards',
        items: [
          { label: 'Dashboards',       url: '/app/dashboard' },
          { label: 'Dashboard Charts', url: '/app/dashboard-chart' },
        ],
      },
    ],
  },

  files: {
    label: 'Files',
    groups: [
      {
        title: 'File Manager',
        items: [
          { label: 'All Files',        url: '/app/file' },
          { label: 'My Files',         url: '/app/file?owner=me' },
          { label: 'Attachments',      url: '/app/file?attached_to_doctype=not+null' },
        ],
      },
    ],
  },

  calendar: {
    label: 'Calendar',
    groups: [
      {
        title: 'Events',
        items: [
          { label: 'My Events',        url: '/app/event' },
          { label: 'All Events',       url: '/app/event' },
        ],
      },
      {
        title: 'Tasks',
        items: [
          { label: 'My Tasks',         url: '/app/task' },
          { label: 'Task Calendar',    url: '/app/task?view=Calendar' },
        ],
      },
    ],
  },

  calls: {
    label: 'Calls',
    groups: [
      {
        title: 'Call Logs',
        items: [
          { label: 'All Calls',        url: '/app/call-log' },
          { label: 'Missed Calls',     url: '/app/call-log?status=Missed' },
          { label: 'Received Calls',   url: '/app/call-log?status=Completed' },
        ],
      },
    ],
  },

  settings: {
    label: 'Settings',
    groups: [
      {
        title: 'System',
        items: [
          { label: 'System Settings',  url: '/app/system-settings' },
          { label: 'Users',            url: '/app/user' },
          { label: 'Roles',            url: '/app/role' },
          { label: 'Role Permissions', url: '/app/role-permission-manager' },
        ],
      },
      {
        title: 'Customization',
        items: [
          { label: 'Custom Fields',    url: '/app/custom-field' },
          { label: 'Customize Form',   url: '/app/customize-form' },
          { label: 'Print Formats',    url: '/app/print-format' },
          { label: 'Email Templates',  url: '/app/email-template' },
        ],
      },
      {
        title: 'Data',
        items: [
          { label: 'Data Import',      url: '/app/data-import' },
          { label: 'Backup',           url: '/app/backup' },
        ],
      },
    ],
  },

  // copilot and automation share the same catch-all
  copilot: { label: 'AI Copilot', groups: [] },
};
