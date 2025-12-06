import AppLayout from '../layouts/AppLayout';

// Report card interface
interface ReportCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    stat: string;
    icon: string;
}

// Dummy report cards data
const reportCards: ReportCard[] = [
    {
        id: 'on-time-performance',
        title: 'On-time Performance',
        subtitle: 'Delays by route and date',
        description: 'Track trip punctuality and identify delay patterns across routes and time periods.',
        stat: 'Today: 82% on-time',
        icon: '⏱️',
    },
    {
        id: 'occupancy-by-route',
        title: 'Occupancy by Route',
        subtitle: 'Seat utilization analysis',
        description: 'Analyze passenger load factors and optimize route capacity allocation.',
        stat: 'Avg: 78% occupied',
        icon: '🚌',
    },
    {
        id: 'staff-punctuality',
        title: 'Staff Punctuality',
        subtitle: 'Attendance and late arrivals',
        description: 'Monitor staff attendance patterns and identify punctuality trends.',
        stat: 'This week: 91% on-time',
        icon: '👥',
    },
    {
        id: 'vehicle-utilization',
        title: 'Vehicle Utilization',
        subtitle: 'Fleet efficiency metrics',
        description: 'Track vehicle usage, idle time, and maintenance schedules for optimal fleet management.',
        stat: 'Active: 42/50 vehicles',
        icon: '🔧',
    },
    {
        id: 'incident-summary',
        title: 'Incident Summary',
        subtitle: 'Safety and operational issues',
        description: 'Review incident trends, response times, and resolution rates across categories.',
        stat: 'This month: 23 incidents',
        icon: '⚠️',
    },
    {
        id: 'revenue-analysis',
        title: 'Revenue Analysis',
        subtitle: 'Ticket sales and collections',
        description: 'Analyze revenue trends, booking patterns, and financial performance by route.',
        stat: 'Today: ₹1.2L collected',
        icon: '💰',
    },
];

interface ReportsPageProps {
    onLogout?: () => void;
}

export default function ReportsPage({ onLogout }: ReportsPageProps) {
    const handleViewReport = (reportId: string) => {
        console.log('View report:', reportId);
        // Future: navigate to specific report page
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">Reports</h1>
                <p className="text-secondary-600 mt-1">
                    Analytics and insights for operations management
                </p>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {reportCards.map((report) => (
                    <div
                        key={report.id}
                        className="card hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        {/* Icon and Title */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-4xl">{report.icon}</div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-secondary-900 mb-1">
                                    {report.title}
                                </h2>
                                <p className="text-sm text-secondary-600">{report.subtitle}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-secondary-700 mb-4">{report.description}</p>

                        {/* Stat */}
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
                            <p className="text-primary-700 font-semibold">{report.stat}</p>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => handleViewReport(report.id)}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            View Report
                        </button>
                    </div>
                ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-info-50 border border-info-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">ℹ️</span>
                    <div>
                        <p className="text-info-900 font-semibold mb-1">
                            Custom Reports Available
                        </p>
                        <p className="text-info-700 text-sm">
                            Need a specific report? Contact the admin team to request custom analytics and data exports.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
