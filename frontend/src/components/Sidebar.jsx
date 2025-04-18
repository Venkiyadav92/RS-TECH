import { Calendar, LayoutDashboard, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
    return (
      <aside className="w-64 h-screen bg-white border-r border-gray-300">
      <div className="p-6 text-xl font-bold text-blue-600 border-b border-gray-300 h-20">RS-TECH</div>
      <nav className="mt-6">
        <ul>
        {[
          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { path: "/employees", label: "Employees", icon: Users },
          { path: "/calendar", label: "Calendar", icon: Calendar },
          { path: "/messages", label: "Messages", icon: MessageSquare },
        ].map((item) => {
          const location = useLocation();
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
            return (
            <li key={item.path}>
            <Link
            to={item.path}
            className={`flex items-center px-6 py-2 ${
              isActive
              ? "bg-blue-500 text-white rounded-r-4xl mr-4"
              : "hover:bg-blue-100"
            } cursor-pointer`}
            >
            <IconComponent fill={`${
              isActive
              ? "white"
              : "lightgray"
            }`} className="w-5 h-5 mr-2 " />
            {item.label}
            </Link>
            </li>
            );
        })}
        </ul>
      </nav>
      </aside>
    );
  }
  