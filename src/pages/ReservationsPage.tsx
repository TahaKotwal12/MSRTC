import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// TypeScript interface
interface Reservation {
    ticketId: string;
    pnr: string;
    passengerName: string;
    seatNo: string;
    boardingStop: string;
    status: 'Confirmed' | 'Cancelled' | 'No-Show' | 'Boarded';
    bookedAt: string;
}

// Dummy reservations data
const allReservations: Reservation[] = [
    {
        ticketId: 'TKT001',
        pnr: 'PNR12345',
        passengerName: 'Amit Sharma',
        seatNo: 'A1',
        boardingStop: 'Pune',
        status: 'Boarded',
        bookedAt: '2025-12-05 10:30 AM',
    },
    {
        ticketId: 'TKT002',
        pnr: 'PNR12346',
        passengerName: 'Priya Desai',
        seatNo: 'A2',
        boardingStop: 'Pune',
        status: 'Boarded',
        bookedAt: '2025-12-05 11:15 AM',
    },
    {
        ticketId: 'TKT003',
        pnr: 'PNR12347',
        passengerName: 'Rajesh Kumar',
        seatNo: 'A3',
        boardingStop: 'Pune',
        status: 'Confirmed',
        bookedAt: '2025-12-05 02:45 PM',
    },
    {
        ticketId: 'TKT004',
        pnr: 'PNR12348',
        passengerName: 'Sneha Patil',
        seatNo: 'A4',
        boardingStop: 'Lonavala',
        status: 'Confirmed',
        bookedAt: '2025-12-05 03:20 PM',
    },
    {
        ticketId: 'TKT005',
        pnr: 'PNR12349',
        passengerName: 'Vikram Rao',
        seatNo: 'B1',
        boardingStop: 'Pune',
        status: 'Boarded',
        bookedAt: '2025-12-05 04:00 PM',
    },
    {
        ticketId: 'TKT006',
        pnr: 'PNR12350',
        passengerName: 'Kavita Naik',
        seatNo: 'B2',
        boardingStop: 'Pune',
        status: 'Cancelled',
        bookedAt: '2025-12-04 09:30 AM',
    },
    {
        ticketId: 'TKT007',
        pnr: 'PNR12351',
        passengerName: 'Suresh Jadhav',
        seatNo: 'B3',
        boardingStop: 'Lonavala',
        status: 'Confirmed',
        bookedAt: '2025-12-05 05:15 PM',
    },
    {
        ticketId: 'TKT008',
        pnr: 'PNR12352',
        passengerName: 'Anita More',
        seatNo: 'B4',
        boardingStop: 'Pune',
        status: 'No-Show',
        bookedAt: '2025-12-05 06:00 PM',
    },
    {
        ticketId: 'TKT009',
        pnr: 'PNR12353',
        passengerName: 'Ganesh Pawar',
        seatNo: 'C1',
        boardingStop: 'Pune',
        status: 'Boarded',
        bookedAt: '2025-12-05 07:30 PM',
    },
    {
        ticketId: 'TKT010',
        pnr: 'PNR12354',
        passengerName: 'Sunita Bhosale',
        seatNo: 'C2',
        boardingStop: 'Lonavala',
        status: 'Confirmed',
        bookedAt: '2025-12-05 08:00 PM',
    },
    {
        ticketId: 'TKT011',
        pnr: 'PNR12355',
        passengerName: 'Prakash Rane',
        seatNo: 'C3',
        boardingStop: 'Pune',
        status: 'Boarded',
        bookedAt: '2025-12-05 08:45 PM',
    },
    {
        ticketId: 'TKT012',
        pnr: 'PNR12356',
        passengerName: 'Meera Kulkarni',
        seatNo: 'C4',
        boardingStop: 'Pune',
        status: 'Confirmed',
        bookedAt: '2025-12-05 09:15 PM',
    },
];

// Helper function to get status color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Boarded':
            return 'bg-success-100 text-success-700';
        case 'Confirmed':
            return 'bg-info-100 text-info-700';
        case 'Cancelled':
            return 'bg-danger-100 text-danger-700';
        case 'No-Show':
            return 'bg-warning-100 text-warning-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

interface ReservationsPageProps {
    onLogout?: () => void;
}

export default function ReservationsPage({ onLogout }: ReservationsPageProps) {
    // Hard-coded trip info
    const tripId = '1';
    const tripRoute = 'Pune - Mumbai';
    const totalSeats = 44;
    const bookedSeats = 36;
    const availableSeats = 8;

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>(allReservations);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredReservations(allReservations);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = allReservations.filter(
            (res) =>
                res.ticketId.toLowerCase().includes(query) ||
                res.pnr.toLowerCase().includes(query) ||
                res.passengerName.toLowerCase().includes(query)
        );
        setFilteredReservations(filtered);
    };

    const handleExportManifest = () => {
        console.log('Exporting manifest for Trip #' + tripId);
        console.log('Total reservations:', filteredReservations.length);
        console.log('Manifest data:', filteredReservations);
        alert('Manifest exported to console');
    };

    // Calculate stats based on filtered data
    const stats = {
        confirmed: filteredReservations.filter((r) => r.status === 'Confirmed').length,
        boarded: filteredReservations.filter((r) => r.status === 'Boarded').length,
        cancelled: filteredReservations.filter((r) => r.status === 'Cancelled').length,
        noShow: filteredReservations.filter((r) => r.status === 'No-Show').length,
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">
                    Reservations - Trip #{tripId}
                </h1>
                <p className="text-secondary-600 mt-1">{tripRoute}</p>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="card bg-secondary-50">
                    <p className="text-sm text-secondary-600 mb-1">Total Seats</p>
                    <p className="text-3xl font-bold text-secondary-900">{totalSeats}</p>
                </div>
                <div className="card bg-success-50">
                    <p className="text-sm text-success-700 mb-1">Booked</p>
                    <p className="text-3xl font-bold text-success-700">{bookedSeats}</p>
                </div>
                <div className="card bg-info-50">
                    <p className="text-sm text-info-700 mb-1">Available</p>
                    <p className="text-3xl font-bold text-info-700">{availableSeats}</p>
                </div>
            </div>

            {/* Search Bar and Export */}
            <div className="card mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search by Ticket ID, PNR, or Passenger Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                            Search
                        </button>
                    </div>
                    <button
                        onClick={handleExportManifest}
                        className="bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Export Manifest
                    </button>
                </div>
            </div>

            {/* Status Summary */}
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-info-100 text-info-700">
                        Confirmed
                    </span>
                    <span className="text-secondary-700">{stats.confirmed}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        Boarded
                    </span>
                    <span className="text-secondary-700">{stats.boarded}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-danger-100 text-danger-700">
                        Cancelled
                    </span>
                    <span className="text-secondary-700">{stats.cancelled}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700">
                        No-Show
                    </span>
                    <span className="text-secondary-700">{stats.noShow}</span>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-secondary-600">
                    Showing <span className="font-semibold text-secondary-900">{filteredReservations.length}</span> of{' '}
                    <span className="font-semibold text-secondary-900">{allReservations.length}</span> reservations
                </p>
            </div>

            {/* Reservations Table */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Ticket ID
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    PNR
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Passenger Name
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Seat No
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Boarding Stop
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Booked At
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-secondary-500">
                                        No reservations found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredReservations.map((reservation) => (
                                    <tr
                                        key={reservation.ticketId}
                                        className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                            {reservation.ticketId}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {reservation.pnr}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-900">
                                            {reservation.passengerName}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700 font-medium">
                                            {reservation.seatNo}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {reservation.boardingStop}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    reservation.status
                                                )}`}
                                            >
                                                {reservation.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {reservation.bookedAt}
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
