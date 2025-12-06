import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

// TypeScript interfaces
interface Assignment {
    vehicleRegNo: string;
    vehicleType: string;
    driverName: string;
    conductorName: string;
    status: 'Draft' | 'Approved';
}

interface Schedule {
    scheduledStart: string;
    scheduledEnd: string;
    actualStart: string | null;
    actualEnd: string | null;
}

interface ReservationSummary {
    totalSeats: number;
    bookedSeats: number;
    availableSeats: number;
}

interface Incident {
    id: string;
    time: string;
    category: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
}

interface TripDetail {
    id: string;
    serviceNo: string;
    route: string;
    tripDate: string;
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    depot: string;
    assignment: Assignment;
    schedule: Schedule;
    reservations: ReservationSummary;
    incidents: Incident[];
}

// Dummy trips data
const tripsData: Record<string, TripDetail> = {
    T001: {
        id: 'T001',
        serviceNo: 'SVC-2401',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        status: 'In Progress',
        depot: 'Pune Depot',
        assignment: {
            vehicleRegNo: 'MH-12-AB-1234',
            vehicleType: 'AC Sleeper',
            driverName: 'Rajesh Kumar',
            conductorName: 'Amit Patil',
            status: 'Approved',
        },
        schedule: {
            scheduledStart: '06:30 AM',
            scheduledEnd: '11:30 AM',
            actualStart: '06:35 AM',
            actualEnd: null,
        },
        reservations: {
            totalSeats: 45,
            bookedSeats: 38,
            availableSeats: 7,
        },
        incidents: [
            {
                id: 'INC001',
                time: '08:15 AM',
                category: 'Delay',
                severity: 'Low',
                description: 'Traffic congestion at Lonavala',
            },
        ],
    },
    T002: {
        id: 'T002',
        serviceNo: 'SVC-2402',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        status: 'Completed',
        depot: 'Pune Depot',
        assignment: {
            vehicleRegNo: 'MH-12-CD-5678',
            vehicleType: 'Semi-Luxury',
            driverName: 'Suresh Desai',
            conductorName: 'Priya Sharma',
            status: 'Approved',
        },
        schedule: {
            scheduledStart: '07:00 AM',
            scheduledEnd: '12:00 PM',
            actualStart: '07:02 AM',
            actualEnd: '11:58 AM',
        },
        reservations: {
            totalSeats: 40,
            bookedSeats: 35,
            availableSeats: 5,
        },
        incidents: [],
    },
    T004: {
        id: 'T004',
        serviceNo: 'SVC-2404',
        route: 'Pune - Mumbai',
        tripDate: '2025-12-06',
        status: 'Scheduled',
        depot: 'Pune Depot',
        assignment: {
            vehicleRegNo: 'MH-12-GH-3456',
            vehicleType: 'Express',
            driverName: 'Prakash Rane',
            conductorName: 'Not Assigned',
            status: 'Draft',
        },
        schedule: {
            scheduledStart: '08:00 AM',
            scheduledEnd: '01:00 PM',
            actualStart: null,
            actualEnd: null,
        },
        reservations: {
            totalSeats: 50,
            bookedSeats: 28,
            availableSeats: 22,
        },
        incidents: [],
    },
};

// Helper functions
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

const getAssignmentStatusColor = (status: string) => {
    return status === 'Approved'
        ? 'bg-success-100 text-success-700'
        : 'bg-warning-100 text-warning-700';
};

interface TripDetailPageProps {
    onLogout?: () => void;
}

export default function TripDetailPage({ onLogout }: TripDetailPageProps) {
    const { tripId } = useParams<{ tripId: string }>();

    // Find trip by ID
    const trip = tripId ? tripsData[tripId] : undefined;

    // Handle trip not found
    if (!trip) {
        return (
            <AppLayout onLogout={onLogout}>
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚌</div>
                    <h1 className="text-2xl font-bold text-secondary-900 mb-2">
                        Trip Not Found
                    </h1>
                    <p className="text-secondary-600 mb-6">
                        The trip with ID "{tripId}" could not be found.
                    </p>
                    <a
                        href="/trips"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Back to Trips
                    </a>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout onLogout={onLogout}>
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary-900">
                            {trip.route}
                        </h1>
                        <p className="text-secondary-600 mt-1">
                            Service No: {trip.serviceNo} • Date: {trip.tripDate}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
                            {trip.status}
                        </span>
                        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                            {trip.depot}
                        </span>
                    </div>
                </div>
            </div>

            {/* Assignment Card */}
            <div className="card mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-secondary-900">Assignment</h2>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm hover:underline">
                        Edit Assignment
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Vehicle</p>
                        <p className="text-secondary-900 font-medium">
                            {trip.assignment.vehicleRegNo}
                        </p>
                        <p className="text-sm text-secondary-600">{trip.assignment.vehicleType}</p>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Assignment Status</p>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getAssignmentStatusColor(trip.assignment.status)}`}>
                            {trip.assignment.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Driver</p>
                        <p className="text-secondary-900 font-medium">{trip.assignment.driverName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Conductor</p>
                        <p className="text-secondary-900 font-medium">{trip.assignment.conductorName}</p>
                    </div>
                </div>
            </div>

            {/* Schedule Card */}
            <div className="card mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Schedule</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Type
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Start Time
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    End Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-secondary-100">
                                <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                    Scheduled
                                </td>
                                <td className="py-3 px-4 text-sm text-secondary-700">
                                    {trip.schedule.scheduledStart}
                                </td>
                                <td className="py-3 px-4 text-sm text-secondary-700">
                                    {trip.schedule.scheduledEnd}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                    Actual
                                </td>
                                <td className="py-3 px-4 text-sm text-secondary-700">
                                    {trip.schedule.actualStart || '-'}
                                </td>
                                <td className="py-3 px-4 text-sm text-secondary-700">
                                    {trip.schedule.actualEnd || '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reservations Summary Card */}
            <div className="card mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-secondary-900">Reservations Summary</h2>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors">
                        View Reservations for this Trip
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-secondary-50 rounded-lg p-4">
                        <p className="text-sm text-secondary-600 mb-1">Total Seats</p>
                        <p className="text-3xl font-bold text-secondary-900">
                            {trip.reservations.totalSeats}
                        </p>
                    </div>
                    <div className="bg-success-50 rounded-lg p-4">
                        <p className="text-sm text-success-700 mb-1">Booked Seats</p>
                        <p className="text-3xl font-bold text-success-700">
                            {trip.reservations.bookedSeats}
                        </p>
                    </div>
                    <div className="bg-info-50 rounded-lg p-4">
                        <p className="text-sm text-info-700 mb-1">Available Seats</p>
                        <p className="text-3xl font-bold text-info-700">
                            {trip.reservations.availableSeats}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 bg-secondary-200 rounded-full h-3">
                            <div
                                className="bg-success-600 h-3 rounded-full"
                                style={{
                                    width: `${(trip.reservations.bookedSeats / trip.reservations.totalSeats) * 100}%`
                                }}
                            />
                        </div>
                        <span className="text-sm font-semibold text-secondary-900 min-w-[4rem]">
                            {Math.round((trip.reservations.bookedSeats / trip.reservations.totalSeats) * 100)}% Full
                        </span>
                    </div>
                </div>
            </div>

            {/* Incidents Card */}
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-secondary-900">Incidents</h2>
                    <button className="bg-danger-600 hover:bg-danger-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors">
                        Report New Incident
                    </button>
                </div>
                {trip.incidents.length === 0 ? (
                    <div className="text-center py-8 text-secondary-500">
                        <p>No incidents reported for this trip.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {trip.incidents.map((incident) => (
                            <div
                                key={incident.id}
                                className="border border-secondary-200 rounded-lg p-4 hover:bg-secondary-50 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-secondary-900">
                                            {incident.time}
                                        </span>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                                            {incident.severity}
                                        </span>
                                    </div>
                                    <span className="text-sm text-secondary-600">{incident.category}</span>
                                </div>
                                <p className="text-secondary-700">{incident.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
