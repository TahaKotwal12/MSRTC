import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Bus,
    Users,
    Route,
    Calendar,
    UserCheck,
    Ticket,
    AlertTriangle,
    FileText,
    Settings,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';
import { format } from 'date-fns';

interface AppLayoutProps {
    children: ReactNode;
    onLogout?: () => void;
}

interface NavItem {
    name: string;
    path: string;
    icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Trips', path: '/trips', icon: Bus },
    { name: 'Roster', path: '/roster', icon: Calendar },
    { name: 'Routes', path: '/routes', icon: Route },
    { name: 'Vehicles', path: '/vehicles', icon: Bus },
    { name: 'Staff', path: '/staff', icon: Users },
    { name: 'Reservations', path: '/reservations', icon: Ticket },
    { name: 'Attendance', path: '/attendance', icon: UserCheck },
    { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Admin', path: '/admin', icon: Settings },
];

export default function AppLayout({ children, onLogout }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const currentDate = format(new Date(), 'd MMM yyyy');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <div className="min-h-screen bg-secondary-50 flex">
            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-secondary-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Bus size={18} className="text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-primary-700">BusOps</h1>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={closeSidebar}
                        className="lg:hidden text-secondary-600 hover:text-secondary-900"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary-50 text-primary-700 font-semibold'
                                        : 'text-secondary-700 hover:bg-secondary-100'
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-white border-b border-secondary-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    {/* Left side - Mobile menu button + Depot info */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-secondary-600 hover:text-secondary-900"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Depot and Date */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block">
                                <p className="text-sm text-secondary-600">Current Depot</p>
                                <p className="font-semibold text-secondary-900">Pune Depot</p>
                            </div>
                            <div className="hidden md:block h-8 w-px bg-secondary-300" />
                            <div className="hidden md:block">
                                <p className="text-sm text-secondary-600">Today</p>
                                <p className="font-semibold text-secondary-900">{currentDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - User menu */}
                    <div className="relative">
                        <button
                            onClick={toggleUserMenu}
                            className="flex items-center gap-2 hover:bg-secondary-100 rounded-lg px-3 py-2 transition-colors"
                        >
                            <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">DM</span>
                            </div>
                            <span className="hidden sm:inline text-secondary-900 font-medium">
                                Depot Manager
                            </span>
                            <ChevronDown
                                size={16}
                                className={`text-secondary-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* User Dropdown Menu */}
                        {isUserMenuOpen && (
                            <>
                                {/* Backdrop to close dropdown */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsUserMenuOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-1 z-50">
                                    <button
                                        onClick={() => {
                                            setIsUserMenuOpen(false);
                                            // Navigate to profile (placeholder)
                                            console.log('Navigate to profile');
                                        }}
                                        className="w-full text-left px-4 py-2 text-secondary-700 hover:bg-secondary-100 transition-colors"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsUserMenuOpen(false);
                                            // Navigate to settings (placeholder)
                                            console.log('Navigate to settings');
                                        }}
                                        className="w-full text-left px-4 py-2 text-secondary-700 hover:bg-secondary-100 transition-colors"
                                    >
                                        Settings
                                    </button>
                                    <hr className="my-1 border-secondary-200" />
                                    <button
                                        onClick={() => {
                                            setIsUserMenuOpen(false);
                                            if (onLogout) {
                                                onLogout();
                                            }
                                        }}
                                        className="w-full text-left px-4 py-2 text-danger-600 hover:bg-danger-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
