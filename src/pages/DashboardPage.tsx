import AppLayout from '../layouts/AppLayout';

// Dummy data
const summaryStats = [
    { label: 'Trips Today', value: 132, color: 'bg-primary-50 text-primary-700' },
    { label: 'In Progress', value: 18, color: 'bg-info-50 text-info-700' },
    { label: 'Completed', value: 96, color: 'bg-success-50 text-success-700' },
    { label: 'Cancelled', value: 6, color: 'bg-danger-50 text-danger-700' },
];

const todaysTrips = [
    {
        time: '06:30 AM',
        route: 'Pune - Mumbai',
        status: 'In Progress',
        vehicle: 'MH-12-AB-1234',
        driver: 'Rajesh Kumar',
        conductor: 'Amit Patil',
    },
    {
        time: '07:00 AM',
        route: 'Pune - Nashik',
        status: 'Completed',
        vehicle: 'MH-12-CD-5678',
        driver: 'Suresh Desai',
        conductor: 'Priya Sharma',
    },
    {
        time: '07:30 AM',
        route: 'Pune - Satara',
        status: 'In Progress',
        vehicle: 'MH-12-EF-9012',
        driver: 'Vijay Jadhav',
        conductor: 'Sneha More',
    },
    {
        time: '08:00 AM',
        route: 'Pune - Kolhapur',
        status: 'Scheduled',
        vehicle: 'MH-12-GH-3456',
        driver: 'Prakash Rane',
        conductor: 'Kavita Naik',
    },
    {
        time: '08:30 AM',
        route: 'Pune - Solapur',
        status: 'Cancelled',
        vehicle: '-',
        driver: '-',
        conductor: '-',
    },
    {
        time: '09:00 AM',
        route: 'Pune - Aurangabad',
        status: 'Scheduled',
        vehicle: 'MH-12-IJ-7890',
        driver: 'Ganesh Pawar',
        conductor: 'Sunita Bhosale',
    },
];

const alerts = [
    { id: 1, message: '3 trips without assigned vehicle', severity: 'warning' },
    { id: 2, message: '2 drivers missing attendance punch', severity: 'warning' },
    { id: 3, message: '1 breakdown reported', severity: 'danger' },
];

const occupancyData = [
    { route: 'Pune - Mumbai', tripsToday: 24, avgOccupancy: 87 },
    { route: 'Pune - Nashik', tripsToday: 18, avgOccupancy: 72 },
    { route: 'Pune - Satara', tripsToday: 16, avgOccupancy: 65 },
    { route: 'Pune - Kolhapur', tripsToday: 12, avgOccupancy: 78 },
    { route: 'Pune - Solapur', tripsToday: 14, avgOccupancy: 68 },
];

// Helper function to get status badge color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'In Progress':
            return 'bg-info-100 text-info-700';
        case 'Completed':
            return 'bg-success-100 text-success-700';
        case 'Scheduled':
            return 'bg-secondary-100 text-secondary-700';
        case 'Cancelled':
            return 'bg-danger-100 text-danger-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

// Helper function to get alert icon and color
const getAlertStyle = (severity: string) => {
    switch (severity) {
        case 'danger':
            return { icon: '🚨', color: 'border-l-danger-500 bg-danger-50' };
        case 'warning':
            return { icon: '⚠️', color: 'border-l-warning-500 bg-warning-50' };
        default:
            return { icon: 'ℹ️', color: 'border-l-info-500 bg-info-50' };
    }
};

interface DashboardPageProps {
    onLogout?: () => void;
}

export default function DashboardPage({ onLogout }: DashboardPageProps) {
    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">
                    Depot Operations Dashboard
                </h1>
                <p className="text-secondary-600 mt-1">
                    Real-time overview of depot operations
                </p>
            </div>

            {/* Summary Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {summaryStats.map((stat) => (
                    <div key={stat.label} className="card">
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${stat.color}`}>
                            {stat.label}
                        </div>
                        <p className="text-4xl font-bold text-secondary-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Column - Today's Trips */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                            Today's Trips by Status
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-secondary-200">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                            Time
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                            Route
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                            Vehicle
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                            Driver
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                            Conductor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todaysTrips.map((trip, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                        >
                                            <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                                {trip.time}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-secondary-900">
                                                {trip.route}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        trip.status
                                                    )}`}
                                                >
                                                    {trip.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-secondary-700">
                                                {trip.vehicle}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-secondary-700">
                                                {trip.driver}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-secondary-700">
                                                {trip.conductor}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Alerts */}
                <div className="lg:col-span-1">
                    <div className="card">
                        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                            Alerts
                        </h2>
                        <div className="space-y-3">
                            {alerts.map((alert) => {
                                const style = getAlertStyle(alert.severity);
                                return (
                                    <div
                                        key={alert.id}
                                        className={`p-3 border-l-4 rounded ${style.color}`}
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="text-lg">{style.icon}</span>
                                            <p className="text-sm text-secondary-900 font-medium">
                                                {alert.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Occupancy Snapshot */}
            <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                    Occupancy Snapshot
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Route
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Trips Today
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Average Occupancy (%)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {occupancyData.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                >
                                    <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                        {row.route}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-secondary-700">
                                        {row.tripsToday}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-secondary-200 rounded-full h-2 max-w-xs">
                                                <div
                                                    className="bg-primary-600 h-2 rounded-full"
                                                    style={{ width: `${row.avgOccupancy}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-secondary-900 min-w-[3rem]">
                                                {row.avgOccupancy}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
