import { BookOpen, Bell, Calendar, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Cours inscrits', stat: '0', icon: BookOpen, color: 'text-primary-600', bgColor: 'bg-primary-50' },
  { name: 'Notifications', stat: '0', icon: Bell, color: 'text-red-600', bgColor: 'bg-red-50' },
  { name: 'Événements', stat: '0', icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50' },
  { name: 'Épreuves', stat: '-', icon: FileText, color: 'text-primary-600', bgColor: 'bg-primary-50' },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Bonjour, Sama <span className="text-3xl animate-bounce origin-bottom-right">👋</span>
        </h1>
        <p className="text-gray-500 mt-1">Tableau de bord étudiant — UPF-Connect</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-xl ${item.bgColor} ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
              <p className="text-sm font-medium text-gray-500">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mes cours Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col min-h-[250px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Mes cours</h2>
            <Link to="/courses" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            <p>Aucun cours inscrit. <Link to="/courses" className="text-primary-600 hover:underline">Explorer les cours</Link></p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col min-h-[250px]">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Notifications</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            <p>Aucune notification</p>
          </div>
        </div>
      </div>

      {/* Événements à venir Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col min-h-[150px]">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-600" /> Événements à venir
        </h2>
        <div className="flex items-center text-gray-500 text-sm">
          <p>Aucun événement à venir</p>
        </div>
      </div>
      
    </div>
  );
}
