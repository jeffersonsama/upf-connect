import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  BookOpen, 
  FileText, 
  Users, 
  MessageCircle, 
  Calendar, 
  Search, 
  ShieldAlert,
  LogOut
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Tableau de bord', to: '/dashboard', icon: LayoutDashboard },
  { name: "Fil d'actualité", to: '/feed', icon: Newspaper },
  { name: 'Cours', to: '/courses', icon: BookOpen },
  { name: 'Épreuves', to: '/exams', icon: FileText },
  { name: 'Groupes', to: '/groups', icon: Users },
  { name: 'Messages', to: '/messages', icon: MessageCircle },
  { name: 'Calendrier', to: '/calendar', icon: Calendar },
  { name: 'Recherche', to: '/search', icon: Search },
  { name: 'Administration', to: '/admin', icon: ShieldAlert },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm z-10">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
            UPF
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">UPF-Connect</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                  : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile Area (Bottom) */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border-2 border-primary-200">
            SL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Sama Larry</p>
            <p className="text-xs text-gray-500 truncate">Étudiant</p>
          </div>
          <LogOut className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
