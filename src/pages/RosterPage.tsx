import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// TypeScript interfaces
interface TripAssignment {
    id: string;
    time: string;
    route: string;
    vehicleId: string | null;
    driverId: string | null;
    conductorId: string | null;
    status: 'Unassigned' | 'Draft' | 'Approved';
}

interface Vehicle {
    id: string;
    regNo: string;
    type: string;
}

interface Staff {
    id: string;
    name: string;
}

// Dummy data
const availableVehicles: Vehicle[] = [
    { id: 'V001', regNo: 'MH-12-AB-1234', type: 'AC Sleeper' },
    { id: 'V002', regNo: 'MH-12-CD-5678', type: 'Semi-Luxury' },
    { id: 'V003', regNo: 'MH-12-EF-9012', type: 'Express' },
    { id: 'V004', regNo: 'MH-12-GH-3456', type: 'AC Sleeper' },
    { id: 'V005', regNo: 'MH-12-IJ-7890', type: 'Semi-Luxury' },
];

const availableDrivers: Staff[] = [
    { id: 'D001', name: 'Rajesh Kumar' },
    { id: 'D002', name: 'Suresh Desai' },
    { id: 'D003', name: 'Vijay Jadhav' },
    { id: 'D004', name: 'Prakash Rane' },
    { id: 'D005', name: 'Ganesh Pawar' },
];

const availableConductors: Staff[] = [
    { id: 'C001', name: 'Amit Patil' },
    { id: 'C002', name: 'Priya Sharma' },
    { id: 'C003', name: 'Sneha More' },
    { id: 'C004', name: 'Kavita Naik' },
    { id: 'C005', name: 'Sunita Bhosale' },
];

const initialTrips: TripAssignment[] = [
    {
        id: 'T001',
        time: '06:30 AM',
        route: 'Pune - Mumbai',
        vehicleId: 'V001',
        driverId: 'D001',
        conductorId: 'C001',
        status: 'Approved',
    },
    {
        id: 'T002',
        time: '07:00 AM',
        route: 'Pune - Nashik',
        vehicleId: 'V002',
        driverId: 'D002',
        conductorId: 'C002',
        status: 'Approved',
    },
    {
        id: 'T003',
        time: '07:30 AM',
        route: 'Pune - Satara',
        vehicleId: null,
        driverId: null,
        conductorId: null,
        status: 'Unassigned',
    },
    {
        id: 'T004',
        time: '08:00 AM',
        route: 'Pune - Kolhapur',
        vehicleId: 'V003',
        driverId: 'D003',
        conductorId: null,
        status: 'Draft',
    },
    {
        id: 'T005',
        time: '08:30 AM',
        route: 'Pune - Solapur',
        vehicleId: null,
        driverId: null,
        conductorId: null,
        status: 'Unassigned',
    },
    {
        id: 'T006',
        time: '09:00 AM',
        route: 'Pune - Aurangabad',
        vehicleId: 'V004',
        driverId: 'D004',
        conductorId: 'C003',
        status: 'Draft',
    },
];

// Helper functions
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'bg-success-100 text-success-700';
        case 'Draft':
            return 'bg-warning-100 text-warning-700';
        case 'Unassigned':
            return 'bg-danger-100 text-danger-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

interface RosterPageProps {
    onLogout?: () => void;
}

export default function RosterPage({ onLogout }: RosterPageProps) {
    const [selectedDate, setSelectedDate] = useState('2025-12-06');
    const [trips, setTrips] = useState<TripAssignment[]>(initialTrips);
    const [selectedTripId, setSelectedTripId] = useState<string | null>(trips[0]?.id || null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Get selected trip
    const selectedTrip = trips.find((t) => t.id === selectedTripId);

    // Handle assignment changes
    const handleVehicleChange = (vehicleId: string) => {
        if (!selectedTripId) return;
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === selectedTripId ? { ...trip, vehicleId: vehicleId || null } : trip
            )
        );
    };

    const handleDriverChange = (driverId: string) => {
        if (!selectedTripId) return;
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === selectedTripId ? { ...trip, driverId: driverId || null } : trip
            )
        );
    };

    const handleConductorChange = (conductorId: string) => {
        if (!selectedTripId) return;
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === selectedTripId ? { ...trip, conductorId: conductorId || null } : trip
            )
        );
    };

    const handleSaveAsDraft = () => {
        if (!selectedTripId) return;
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === selectedTripId ? { ...trip, status: 'Draft' } : trip
            )
        );
        showSuccessMessage('Assignment saved as draft');
    };

    const handleApproveAssignment = () => {
        if (!selectedTripId) return;
        const trip = trips.find((t) => t.id === selectedTripId);
        if (!trip?.vehicleId || !trip?.driverId || !trip?.conductorId) {
            alert('Please assign vehicle, driver, and conductor before approving');
            return;
        }
        setTrips((prev) =>
            prev.map((t) =>
                t.id === selectedTripId ? { ...t, status: 'Approved' } : t
            )
        );
        showSuccessMessage('Assignment approved successfully');
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Get assignment summary for a trip
    const getAssignmentSummary = (trip: TripAssignment) => {
        if (trip.status === 'Unassigned') {
            return 'Unassigned';
        }
        const vehicle = availableVehicles.find((v) => v.id === trip.vehicleId);
        const driver = availableDrivers.find((d) => d.id === trip.driverId);
        const conductor = availableConductors.find((c) => c.id === trip.conductorId);

        const parts = [];
        if (vehicle) parts.push(vehicle.regNo);
        if (driver) parts.push(driver.name);
        if (conductor) parts.push(conductor.name);

        return parts.length > 0 ? parts.join(' • ') : 'Partially Assigned';
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">Daily Roster</h1>
                <p className="text-secondary-600 mt-1">
                    Manage trip assignments and crew scheduling
                </p>
            </div>

            {/* Date Selector */}
            <div className="mb-6">
                <label
                    htmlFor="rosterDate"
                    className="block text-sm font-medium text-secondary-700 mb-2"
                >
                    Select Date
                </label>
                <input
                    id="rosterDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg">
                    ✓ {successMessage}
                </div>
            )}

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Trips List */}
                <div className="lg:col-span-1">
                    <div className="card">
                        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                            Trips for {selectedDate}
                        </h2>
                        <div className="space-y-2">
                            {trips.map((trip) => (
                                <button
                                    key={trip.id}
                                    onClick={() => setSelectedTripId(trip.id)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedTripId === trip.id
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-secondary-900">{trip.time}</p>
                                            <p className="text-sm text-secondary-700">{trip.route}</p>
                                        </div>
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                trip.status
                                            )}`}
                                        >
                                            {trip.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-secondary-600 mt-2">
                                        {getAssignmentSummary(trip)}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Assignment Editor */}
                <div className="lg:col-span-2">
                    {selectedTrip ? (
                        <div className="card">
                            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                                Assignment Editor
                            </h2>

                            {/* Trip Info */}
                            <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-secondary-600">Trip</p>
                                        <p className="text-lg font-semibold text-secondary-900">
                                            {selectedTrip.time} - {selectedTrip.route}
                                        </p>
                                    </div>
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            selectedTrip.status
                                        )}`}
                                    >
                                        {selectedTrip.status}
                                    </span>
                                </div>
                            </div>

                            {/* Assignment Form */}
                            <div className="space-y-4 mb-6">
                                {/* Vehicle Dropdown */}
                                <div>
                                    <label
                                        htmlFor="vehicle"
                                        className="block text-sm font-medium text-secondary-700 mb-2"
                                    >
                                        Vehicle
                                    </label>
                                    <select
                                        id="vehicle"
                                        value={selectedTrip.vehicleId || ''}
                                        onChange={(e) => handleVehicleChange(e.target.value)}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">Select Vehicle</option>
                                        {availableVehicles.map((vehicle) => (
                                            <option key={vehicle.id} value={vehicle.id}>
                                                {vehicle.regNo} - {vehicle.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Driver Dropdown */}
                                <div>
                                    <label
                                        htmlFor="driver"
                                        className="block text-sm font-medium text-secondary-700 mb-2"
                                    >
                                        Driver
                                    </label>
                                    <select
                                        id="driver"
                                        value={selectedTrip.driverId || ''}
                                        onChange={(e) => handleDriverChange(e.target.value)}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">Select Driver</option>
                                        {availableDrivers.map((driver) => (
                                            <option key={driver.id} value={driver.id}>
                                                {driver.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Conductor Dropdown */}
                                <div>
                                    <label
                                        htmlFor="conductor"
                                        className="block text-sm font-medium text-secondary-700 mb-2"
                                    >
                                        Conductor
                                    </label>
                                    <select
                                        id="conductor"
                                        value={selectedTrip.conductorId || ''}
                                        onChange={(e) => handleConductorChange(e.target.value)}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">Select Conductor</option>
                                        {availableConductors.map((conductor) => (
                                            <option key={conductor.id} value={conductor.id}>
                                                {conductor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSaveAsDraft}
                                    className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                >
                                    Save as Draft
                                </button>
                                <button
                                    onClick={handleApproveAssignment}
                                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                >
                                    Approve Assignment
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="card text-center py-12">
                            <p className="text-secondary-600">
                                Select a trip from the left to edit its assignment
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
