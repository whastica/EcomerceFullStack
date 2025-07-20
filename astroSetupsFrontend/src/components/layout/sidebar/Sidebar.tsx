import { SidebarProps } from './SidebarTypes';
import CatalogSidebar from './CatalogSidebar';
import AdminSidebar from './AdminSidebar';

export default function Sidebar(props: SidebarProps) {
  if (props.type === 'admin') return <AdminSidebar isOpen={props.isOpen} />;
  return <CatalogSidebar {...props} />;
}