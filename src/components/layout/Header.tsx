import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-primary-600 text-white flex items-center justify-between px-6 shadow-sm z-20">
      
      {/* Search Bar (Centered) */}
      <div className="flex-1 max-w-xl mx-auto hidden md:flex">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-primary-200" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-primary-500/50 text-white placeholder-primary-200 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:ring-0 sm:text-sm transition-colors duration-200"
            placeholder="Rechercher..."
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-primary-100 hover:text-white hover:bg-primary-500 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-primary-600"></span>
        </button>
        
        <button className="w-8 h-8 rounded-full bg-white text-primary-600 flex items-center justify-center font-bold text-sm shadow-sm hover:bg-gray-50 transition-colors">
          SL
        </button>
      </div>
    </header>
  );
}
