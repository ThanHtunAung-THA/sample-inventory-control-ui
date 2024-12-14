const getNavigation = (userCode, userName) => [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    className: "dashboard"
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Sale',
    route: '/admin/sale',
    className: "sale-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Sale',
        to: '/admin/sale',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '+ New Sale',
        to: '/admin/sale-new',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Purchase',
    route: '/admin/purchase',
    className: "purchase-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'purchase',
        to: '/admin/purchase',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '+ New Purchase',
        to: '/admin/purchase-new',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Adjust / Convert',
    route: '/admin/adjust-convert',
    className: "adjust-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Adjust',
        to: '/admin/adjust',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Convert',
        to: '/admin/convert',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Stock Status',
    route: '/admin/stock',
    className: "stock-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Stock Status',
        to: '/admin/stock',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '+ New Stock',
        // to: 'admin/stock-new',
        to: '',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Price / Discount',
    route: '/admin/stock',
    className: "stock-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Price',
        to: '/admin/price',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Discount',
        to: '/admin/discount',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Outstanding',
    route: '/admin/outstanding',
    className: "outstanding-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Outstanding',
        to: '/admin/outstanding',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '+ New Sale',
        to: '/admin/outstanding-new',
        to: '',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Cash / Bank',
    route: '/admin/cash-bank',
    className: "cash-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Cash',
        to: '/admin/cash',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Bank',
        to: '/admin/bank',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'G-Ledger',
    route: '/admin/gledger',
    className: "ledger-svg",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'G-Ledger',
        to: '/admin/gledger',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '+ New G-Ledger',
        // to: '/admin/gledger-new',
        to: '',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDivider',
    name: '',
    to: '#',
    className: "custom-divider"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User  Settings',
    to: '/admin/user-list', 
    className: "user-svg"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin Settings',
    to: '/admin/admin-list',
    className: "admin-svg"
  },
  {
    _tag: 'CSidebarNavDivider',
    name: '',
    to: '#',
    className: "custom-divider"
  },
  {
    _tag: 'CSidebarNavItem',
    name: userCode ? `Admin : ${userName}` : 'Profile',
    to: '/admin/profile',
    className: "profile"
  },
  {
    _tag: 'CSidebarNavItem',  
    name: 'Logout',
    to: '/admin/logout',
    className: "logout"
  },
  {
    _tag: 'CSidebarNavDivider',
    name: '',
    to: '#',
    className: "transparent-divider"
  },
];

export default getNavigation;
