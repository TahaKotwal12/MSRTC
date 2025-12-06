import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

// TypeScript interface
interface Incident {
    id: string;
    time: string;
    category: 'Breakdown' | 'Delay' | 'Accident' | 'Security' | 'Passenger' | 'Other';
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    tripRoute: string;
    tripTime: string;
    depot: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Dismissed';
}

// Dummy incidents data
export const allIncidents: Incident[] = [
    {
        id: 'INC001',
        time: '08:15 AM',
        category: 'Delay',
        severity: 'Low',
        tripRoute: 'Pune - Mumbai',
        tripTime: '06:30 AM',
        depot: 'Pune Depot',
        status: 'Resolved',
    },
    {
        id: 'INC002',
        time: '09:30 AM',
        category: 'Breakdown',
        severity: 'High',
        tripRoute: 'Pune - Nashik',
        tripTime: '07:00 AM',
        depot: 'Pune Depot',
        status: 'In Progress',
    },
    {
        id: 'INC003',
        time: '10:45 AM',
        category: 'Accident',
        severity: 'Critical',
        tripRoute: 'Mumbai - Nashik',
        tripTime: '08:30 AM',
        depot: 'Mumbai Depot',
        status: 'Open',
    },
    {
        id: 'INC004',
        time: '11:20 AM',
        category: 'Passenger',
        severity: 'Medium',
        tripRoute: 'Pune - Satara',
        tripTime: '09:00 AM',
        depot: 'Pune Depot',
        status: 'Resolved',
    },
    {
        id: 'INC005',
        time: '12:00 PM',
        category: 'Security',
        severity: 'High',
        tripRoute: 'Pune - Kolhapur',
        tripTime: '10:30 AM',
        depot: 'Pune Depot',
        status: 'In Progress',
    },
    {
        id: 'INC006',
        time: '01:15 PM',
        category: 'Delay',
        severity: 'Low',
        tripRoute: 'Pune - Solapur',
        tripTime: '11:00 AM',
        depot: 'Pune Depot',
        status: 'Dismissed',
    },
    {
        id: 'INC007',
        time: '02:30 PM',
        category: 'Breakdown',
        severity: 'Critical',
        tripRoute: 'Pune - Aurangabad',
        tripTime: '12:30 PM',
        depot: 'Pune Depot',
        status: 'Open',
    },
    {
        id: 'INC008',
        time: '03:45 PM',
        category: 'Other',
        severity: 'Medium',
        tripRoute: 'Mumbai - Nashik',
        tripTime: '01:00 PM',
        depot: 'Mumbai Depot',
        status: 'Resolved',
    },
];

// Helper functions
const getSeverityColor = (severity: string) => {
    switch (severity) {
        case 'Critical':
            return 'bg-danger-100 text-danger-700';
        case 'High':
            return 'bg-warning-100 text-warning-700';
        case 'Medium':
            return 'bg-info-100 text-info-700';
        case 'Low':
            return 'bg-secondary-100 text-secondary-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Open':
            return 'bg-danger-100 text-danger-700';
        case 'In Progress':
            return 'bg-info-100 text-info-700';
        case 'Resolved':
            return 'bg-success-100 text-success-700';
        case 'Dismissed':
            return 'bg-secondary-100 text-secondary-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

interface IncidentsPageProps {
    onLogout?: () => void;
}

export default function IncidentsPage({ onLogout }: IncidentsPageProps) {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [startDate, setStartDate] = useState('2025-12-06');
    const [endDate, setEndDate] = useState('2025-12-06');
    const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(allIncidents);

    const handleApplyFilters = () => {
        let filtered = [...allIncidents];

        // Filter by status
        if (selectedStatus !== 'All') {
            filtered = filtered.filter((incident) => incident.status === selectedStatus);
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((incident) => incident.category === selectedCategory);
        }

        setFilteredIncidents(filtered);
        console.log('Filters applied:', { selectedStatus, selectedCategory, startDate, endDate });
    };

    const handleViewIncident = (incidentId: string) => {
        navigate(`/incidents/${incidentId}`);
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">Incidents</h1>
                <p className="text-secondary-600 mt-1">
                    Track and manage operational incidents
                </p>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Status Dropdown */}
                    <div>
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option>All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Dismissed</option>
                        </select>
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option>All</option>
                            <option>Breakdown</option>
                            <option>Delay</option>
                            <option>Accident</option>
                            <option>Security</option>
                            <option>Passenger</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label
                            htmlFor="startDate"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Start Date
                        </label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label
                            htmlFor="endDate"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            End Date
                        </label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Apply Button */}
                    <div className="flex items-end">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4">
                <p className="text-sm text-secondary-600">
                    Showing <span className="font-semibold text-secondary-900">{filteredIncidents.length}</span> of{' '}
                    <span className="font-semibold text-secondary-900">{allIncidents.length}</span> incidents
                </p>
            </div>

            {/* Incidents Table */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Incident ID
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Time
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Category
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Severity
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Trip
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Depot
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIncidents.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-secondary-500">
                                        No incidents found matching the selected filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredIncidents.map((incident) => (
                                    <tr
                                        key={incident.id}
                                        className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                            {incident.id}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {incident.time}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-900">
                                            {incident.category}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                                    incident.severity
                                                )}`}
                                            >
                                                {incident.severity}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            <div>{incident.tripRoute}</div>
                                            <div className="text-xs text-secondary-500">{incident.tripTime}</div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {incident.depot}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    incident.status
                                                )}`}
                                            >
                                                {incident.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleViewIncident(incident.id)}
                                                className="text-primary-600 hover:text-primary-700 font-medium text-sm hover:underline"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
