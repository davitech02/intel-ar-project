// components/dashboard/layout/DashboardSidebar.tsx
'use client';

import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaFolder, FaComments, FaUserCog } from 'react-icons/fa';

const DashboardSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: FaTachometerAlt, label: 'Overview' },
    { href: '/dashboard/projects', icon: FaFolder, label: 'Projects' },
    { href: '/dashboard/chat-history', icon: FaComments, label: 'Chat History' },
    { href: '/dashboard/settings', icon: FaUserCog, label: 'Settings' },
  ];

  return (
    <Nav className="flex-column bg-light p-3" style={{ height: '100%' }}>
      {navItems.map((item) => (
        <Nav.Item key={item.href}>
          <Nav.Link 
            as={Link} 
            href={item.href} 
            active={pathname === item.href}
            className="d-flex align-items-center"
          >
            <item.icon className="me-2" />
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default DashboardSidebar;