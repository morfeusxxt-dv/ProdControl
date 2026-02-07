import React from 'react';
import { LayoutDashboard, Package, Box, ClipboardList, Settings, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Package, label: 'Produtos', path: '/products' },
        { icon: Box, label: 'Matérias-Primas', path: '/materials' },
        { icon: ClipboardList, label: 'Ordens', path: '/orders' },
    ];

    return (
        <div className={`fixed inset-y-0 left-0 bg-slate-900 text-white transition-all duration-300 z-30 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center justify-between p-4 border-b border-slate-700 h-16">
                <div className={`font-bold text-xl tracking-tight flex items-center gap-2 ${!isOpen && 'hidden'}`}>
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">PC</div>
                    <span>ProdControl</span>
                </div>
                <div className={`${isOpen ? 'hidden' : 'block'} w-full flex justify-center`}>
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">P</div>
                </div>
                <button onClick={toggle} className="p-1 rounded-md hover:bg-slate-800 lg:hidden">
                    <Menu size={20} />
                </button>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors group relative
                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                            <span className={`whitespace-nowrap transition-all duration-300 ${!isOpen && 'opacity-0 w-0 overflow-hidden'}`}>
                                {item.label}
                            </span>
                            {!isOpen && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-4 left-0 right-0 p-4">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer">
                    <Settings size={20} />
                    <span className={`whitespace-nowrap transition-all duration-300 ${!isOpen && 'opacity-0 w-0 overflow-hidden'}`}>
                        Configurações
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
