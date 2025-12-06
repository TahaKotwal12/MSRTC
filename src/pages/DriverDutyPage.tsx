import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// TypeScript interfaces
interface Trip {
    id: string;
    route: string;
    startTime: string;
    vehicleRegNo: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    stops: string[];
}

// Dummy trips data
const driverTrips: Trip[] = [
    {
        id: 'T001',
        route: 'Pune - Mumbai',
        startTime: '06:30 AM',
        vehicleRegNo: 'MH-12-AB-1234',
        status: 'Completed',
        stops: ['Pune', 'Lonavala', 'Khopoli', 'Panvel', 'Mumbai'],
    },
    {
        id: 'T002',
        route: 'Mumbai - Pune',
        startTime: '12:00 PM',
        vehicleRegNo: 'MH-12-AB-1234',
        status: 'In Progress',
        stops: ['Mumbai', 'Panvel', 'Khopoli', 'Lonavala', 'Pune'],
    },
    {
        id: 'T003',
        route: 'Pune - Nashik',
        startTime: '06:00 PM',
        vehicleRegNo: 'MH-12-AB-1234',
        status: 'Not Started',
        stops: ['Pune', 'Manmad', 'Nashik'],
    },
];

// Helper function
const getStatusColor = (status: string) => {
    switch (status) {
        case 'In Progress':
            return 'bg-info-100 text-info-700';
        case 'Completed':
            return 'bg-success-100 text-success-700';
        case 'Not Started':
            return 'bg-secondary-100 text-secondary-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

interface DriverDutyPageProps {
    onLogout?: () => void;
}

export default function DriverDutyPage({ onLogout }: DriverDutyPageProps) {
    const [expandedTripId, setExpandedTripId] = useState<string | null>(null);
    const [punchStatus, setPunchStatus] = useState<'OUT' | 'IN'>('OUT');
    const [lastPunchTime, setLastPunchTime] = useState<string>('06:25 AM');
    const [showIncidentForm, setShowIncidentForm] = useState<string | null>(null);
    const [incidentCategory, setIncidentCategory] = useState('Breakdown');
    const [incidentDescription, setIncidentDescription] = useState('');

    const handleToggleExpand = (tripId: string) => {
        setExpandedTripId(expandedTripId === tripId ? null : tripId);
    };

    const handlePunch = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        if (punchStatus === 'OUT') {
            setPunchStatus('IN');
            setLastPunchTime(timeString);
            console.log('Punched IN at', timeString);
        } else {
            setPunchStatus('OUT');
            setLastPunchTime(timeString);
            console.log('Punched OUT at', timeString);
        }
    };

    const handleSubmitIncident = (tripId: string) => {
        console.log('Incident reported for trip:', tripId);
        console.log('Category:', incidentCategory);
        console.log('Description:', incidentDescription);

        // Reset form
        setIncidentCategory('Breakdown');
        setIncidentDescription('');
        setShowIncidentForm(null);

        alert('Incident reported successfully');
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title - Mobile Optimized */}
            <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                    Today's Duty
                </h1>
                <p className="text-sm sm:text-base text-secondary-600 mt-1">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Driver Info Card - Mobile Optimized */}
            <div className="card mb-4 bg-primary-50 border-primary-200">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                        DD
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg sm:text-xl font-semibold text-secondary-900">
                            Demo Driver
                        </h2>
                        <p className="text-sm text-secondary-700">Driver • Pune Depot</p>
                    </div>
                </div>
            </div>

            {/* Trips List - Mobile Optimized */}
            <div className="space-y-3">
                {driverTrips.map((trip) => (
                    <div key={trip.id} className="card">
                        {/* Trip Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                                    {trip.route}
                                </h3>
                                <div className="flex flex-wrap gap-2 text-sm text-secondary-600">
                                    <span>🕐 {trip.startTime}</span>
                                    <span>•</span>
                                    <span>🚌 {trip.vehicleRegNo}</span>
                                </div>
                            </div>
                            <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    trip.status
                                )}`}
                            >
                                {trip.status}
                            </span>
                        </div>

                        {/* View Details Button */}
                        <button
                            onClick={() => handleToggleExpand(trip.id)}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                        >
                            {expandedTripId === trip.id ? 'Hide Details' : 'View Details'}
                        </button>

                        {/* Expanded Details - Accordion */}
                        {expandedTripId === trip.id && (
                            <div className="mt-4 pt-4 border-t border-secondary-200 space-y-4">
                                {/* Stops List */}
                                <div>
                                    <h4 className="font-semibold text-secondary-900 mb-2 text-sm sm:text-base">
                                        Stops
                                    </h4>
                                    <div className="space-y-2">
                                        {trip.stops.map((stop, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm text-secondary-700"
                                            >
                                                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-xs font-semibold">
                                                    {index + 1}
                                                </div>
                                                <span>{stop}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Attendance Section */}
                                <div className="bg-secondary-50 rounded-lg p-3">
                                    <h4 className="font-semibold text-secondary-900 mb-3 text-sm sm:text-base">
                                        Attendance
                                    </h4>
                                    <div className="space-y-2 mb-3">
                                        <p className="text-sm text-secondary-700">
                                            Last Punch: <span className="font-medium">{lastPunchTime}</span>
                                        </p>
                                        <p className="text-sm text-secondary-700">
                                            Location: <span className="font-medium">Pune Depot</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handlePunch}
                                        className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base ${punchStatus === 'OUT'
                                                ? 'bg-success-600 hover:bg-success-700 text-white'
                                                : 'bg-danger-600 hover:bg-danger-700 text-white'
                                            }`}
                                    >
                                        Punch {punchStatus}
                                    </button>
                                </div>

                                {/* Report Incident Section */}
                                <div>
                                    {showIncidentForm !== trip.id ? (
                                        <button
                                            onClick={() => setShowIncidentForm(trip.id)}
                                            className="w-full bg-warning-600 hover:bg-warning-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                                        >
                                            Report Incident
                                        </button>
                                    ) : (
                                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 space-y-3">
                                            <h4 className="font-semibold text-warning-900 text-sm sm:text-base">
                                                Report Incident
                                            </h4>

                                            {/* Category Select */}
                                            <div>
                                                <label
                                                    htmlFor={`category-${trip.id}`}
                                                    className="block text-sm font-medium text-secondary-700 mb-1"
                                                >
                                                    Category
                                                </label>
                                                <select
                                                    id={`category-${trip.id}`}
                                                    value={incidentCategory}
                                                    onChange={(e) => setIncidentCategory(e.target.value)}
                                                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warning-500 text-sm"
                                                >
                                                    <option>Breakdown</option>
                                                    <option>Delay</option>
                                                    <option>Accident</option>
                                                    <option>Security</option>
                                                    <option>Passenger</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            {/* Description Textarea */}
                                            <div>
                                                <label
                                                    htmlFor={`description-${trip.id}`}
                                                    className="block text-sm font-medium text-secondary-700 mb-1"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id={`description-${trip.id}`}
                                                    value={incidentDescription}
                                                    onChange={(e) => setIncidentDescription(e.target.value)}
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warning-500 text-sm"
                                                    placeholder="Describe the incident..."
                                                />
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setShowIncidentForm(null)}
                                                    className="flex-1 bg-secondary-200 hover:bg-secondary-300 text-secondary-900 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSubmitIncident(trip.id)}
                                                    className="flex-1 bg-warning-600 hover:bg-warning-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Spacing for Mobile */}
            <div className="h-6"></div>
        </AppLayout>
    );
}
