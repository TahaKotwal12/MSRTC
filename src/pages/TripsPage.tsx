import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

// Trip interface
interface Trip {
    id: string;
    serviceNo: string;
    route: string;
    tripDate: string;
    scheduledStart: string;
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    assignmentStatus: string;
}

// Dummy trips data
const allTrips: Trip[] = [
    {
        id: 'T001',
        serviceNo: 'SVC-2401',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '06:30 AM',
        status: 'In Progress',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T002',
        serviceNo: 'SVC-2402',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '07:00 AM',
        status: 'Completed',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T003',
        serviceNo: 'SVC-2403',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '07:30 AM',
        status: 'In Progress',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T004',
        serviceNo: 'SVC-2404',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '08:00 AM',
        status: 'Scheduled',
        assignmentStatus: 'Missing Conductor',
    },
    {
        id: 'T005',
        serviceNo: 'SVC-2405',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '08:30 AM',
        status: 'Cancelled',
        assignmentStatus: 'Not Assigned',
    },
    {
        id: 'T006',
        serviceNo: 'SVC-2406',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '09:00 AM',
        status: 'Scheduled',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T007',
        serviceNo: 'SVC-2407',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '09:30 AM',
        status: 'Scheduled',
        assignmentStatus: 'Missing Driver',
    },
    {
        id: 'T008',
        serviceNo: 'SVC-2408',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '10:00 AM',
        status: 'In Progress',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T009',
        serviceNo: 'SVC-2409',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '10:30 AM',
        status: 'Scheduled',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T010',
        serviceNo: 'SVC-2410',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '11:00 AM',
        status: 'Scheduled',
        assignmentStatus: 'Missing Vehicle',
    },
    {
        id: 'T011',
        serviceNo: 'SVC-2411',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '11:30 AM',
        status: 'Scheduled',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T012',
        serviceNo: 'SVC-2412',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '12:00 PM',
        status: 'Completed',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T013',
        serviceNo: 'SVC-2413',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '12:30 PM',
        status: 'In Progress',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T014',
        serviceNo: 'SVC-2414',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        scheduledStart: '01:00 PM',
        status: 'Scheduled',
        assignmentStatus: 'Assigned',
    },
    {
        id: 'T015',
        serviceNo: 'SVC-2415',
        route: 'Mumbai - Nashik',
        tripDate: '2025-12-06',
        scheduledStart: '01:30 PM',
        status: 'Scheduled',
        assignmentStatus: 'Missing Conductor',
    },
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

// Helper function to get assignment status color
const getAssignmentStatusColor = (status: string) => {
    if (status === 'Assigned') {
        return 'bg-success-100 text-success-700';
    }
    return 'bg-warning-100 text-warning-700';
};

interface TripsPageProps {
    onLogout?: () => void;
}

export default function TripsPage({ onLogout }: TripsPageProps) {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('2025-12-06');
    const [selectedRoute, setSelectedRoute] = useState('All Routes');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>(allTrips);

    const handleApplyFilters = () => {
        let filtered = [...allTrips];

        // Filter by route
        if (selectedRoute !== 'All Routes') {
            filtered = filtered.filter((trip) => trip.route === selectedRoute);
        }

        // Filter by status
        if (selectedStatus !== 'All') {
            filtered = filtered.filter((trip) => trip.status === selectedStatus);
        }

        setFilteredTrips(filtered);
        console.log('Filters applied:', { selectedDate, selectedRoute, selectedStatus });
    };

    const handleViewTrip = (tripId: string) => {
        console.log('Navigating to trip:', tripId);
        navigate(`/trips/${tripId}`);
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">Trips</h1>
                <p className="text-secondary-600 mt-1">
                    Manage and monitor all trip schedules
                </p>
            </div>

            {/* Filters Bar */}
            <div className="card mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Date Picker */}
                    <div>
                        <label
                            htmlFor="tripDate"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Trip Date
                        </label>
                        <input
                            id="tripDate"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Route Dropdown */}
                    <div>
                        <label
                            htmlFor="route"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Route
                        </label>
                        <select
                            id="route"
                            value={selectedRoute}
                            onChange={(e) => setSelectedRoute(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option>All Routes</option>
                            <option>Pune - Mumbai</option>
                            <option>Mumbai - Nashik</option>
                        </select>
                    </div>

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
                            <option>Scheduled</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
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
                    Showing <span className="font-semibold text-secondary-900">{filteredTrips.length}</span> of{' '}
                    <span className="font-semibold text-secondary-900">{allTrips.length}</span> trips
                </p>
            </div>

            {/* Trips Table */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Trip ID
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Service No
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Route
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Trip Date
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Scheduled Start
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Assignment Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-secondary-500">
                                        No trips found matching the selected filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredTrips.map((trip) => (
                                    <tr
                                        key={trip.id}
                                        className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                            {trip.id}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {trip.serviceNo}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-900">
                                            {trip.route}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {trip.tripDate}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {trip.scheduledStart}
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
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getAssignmentStatusColor(
                                                    trip.assignmentStatus
                                                )}`}
                                            >
                                                {trip.assignmentStatus}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleViewTrip(trip.id)}
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
