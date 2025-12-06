import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// TypeScript interface
interface AttendanceRecord {
    id: string;
    name: string;
    role: 'Driver' | 'Conductor' | 'Manager' | 'Clerk' | 'Inspector';
    firstInTime: string | null;
    lastOutTime: string | null;
    status: 'On Time' | 'Late' | 'Absent';
    anomalies: string[];
}

// Dummy attendance data
const allAttendance: AttendanceRecord[] = [
    {
        id: 'S001',
        name: 'Rajesh Kumar',
        role: 'Driver',
        firstInTime: '06:00 AM',
        lastOutTime: '02:30 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S002',
        name: 'Amit Patil',
        role: 'Conductor',
        firstInTime: '06:05 AM',
        lastOutTime: '02:35 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S003',
        name: 'Suresh Desai',
        role: 'Driver',
        firstInTime: '06:35 AM',
        lastOutTime: '03:00 PM',
        status: 'Late',
        anomalies: [],
    },
    {
        id: 'S004',
        name: 'Priya Sharma',
        role: 'Conductor',
        firstInTime: '06:10 AM',
        lastOutTime: null,
        status: 'On Time',
        anomalies: ['Missing OUT'],
    },
    {
        id: 'S005',
        name: 'Vijay Jadhav',
        role: 'Driver',
        firstInTime: '06:02 AM',
        lastOutTime: '02:45 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S006',
        name: 'Sneha More',
        role: 'Conductor',
        firstInTime: '06:40 AM',
        lastOutTime: '03:10 PM',
        status: 'Late',
        anomalies: [],
    },
    {
        id: 'S007',
        name: 'Prakash Rane',
        role: 'Driver',
        firstInTime: null,
        lastOutTime: null,
        status: 'Absent',
        anomalies: [],
    },
    {
        id: 'S008',
        name: 'Kavita Naik',
        role: 'Conductor',
        firstInTime: '06:15 AM',
        lastOutTime: '02:50 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S009',
        name: 'Ganesh Pawar',
        role: 'Driver',
        firstInTime: '06:08 AM',
        lastOutTime: '03:05 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S010',
        name: 'Sunita Bhosale',
        role: 'Conductor',
        firstInTime: '06:12 AM',
        lastOutTime: null,
        status: 'On Time',
        anomalies: ['Missing OUT'],
    },
    {
        id: 'S011',
        name: 'Anil Deshmukh',
        role: 'Driver',
        firstInTime: null,
        lastOutTime: null,
        status: 'Absent',
        anomalies: [],
    },
    {
        id: 'S012',
        name: 'Meera Kulkarni',
        role: 'Conductor',
        firstInTime: '06:20 AM',
        lastOutTime: '03:15 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S013',
        name: 'Ramesh Patil',
        role: 'Driver',
        firstInTime: '06:45 AM',
        lastOutTime: '03:20 PM',
        status: 'Late',
        anomalies: [],
    },
    {
        id: 'S014',
        name: 'Anita Joshi',
        role: 'Conductor',
        firstInTime: '06:18 AM',
        lastOutTime: '02:55 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S015',
        name: 'Santosh Yadav',
        role: 'Driver',
        firstInTime: null,
        lastOutTime: null,
        status: 'Absent',
        anomalies: [],
    },
    {
        id: 'S016',
        name: 'Deepak Shinde',
        role: 'Manager',
        firstInTime: '08:00 AM',
        lastOutTime: '05:30 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S017',
        name: 'Pooja Raut',
        role: 'Clerk',
        firstInTime: '08:05 AM',
        lastOutTime: '05:35 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S018',
        name: 'Mahesh Kale',
        role: 'Inspector',
        firstInTime: '07:00 AM',
        lastOutTime: '04:00 PM',
        status: 'On Time',
        anomalies: [],
    },
    {
        id: 'S019',
        name: 'Sanjay Pawar',
        role: 'Driver',
        firstInTime: null,
        lastOutTime: null,
        status: 'Absent',
        anomalies: [],
    },
    {
        id: 'S020',
        name: 'Rekha Sawant',
        role: 'Conductor',
        firstInTime: '06:25 AM',
        lastOutTime: null,
        status: 'On Time',
        anomalies: ['Missing OUT'],
    },
];

// Helper functions
const getStatusColor = (status: string) => {
    switch (status) {
        case 'On Time':
            return 'bg-success-100 text-success-700';
        case 'Late':
            return 'bg-warning-100 text-warning-700';
        case 'Absent':
            return 'bg-danger-100 text-danger-700';
        default:
            return 'bg-secondary-100 text-secondary-700';
    }
};

interface AttendancePageProps {
    onLogout?: () => void;
}

export default function AttendancePage({ onLogout }: AttendancePageProps) {
    const [selectedDate, setSelectedDate] = useState('2025-12-06');
    const [selectedRole, setSelectedRole] = useState('All');
    const [filteredAttendance, setFilteredAttendance] = useState<AttendanceRecord[]>(allAttendance);

    // Summary stats
    const expectedStaff = 52;
    const presentStaff = filteredAttendance.filter((a) => a.status !== 'Absent').length;
    const absentStaff = filteredAttendance.filter((a) => a.status === 'Absent').length;
    const latePunches = filteredAttendance.filter((a) => a.status === 'Late').length;

    const handleApplyFilters = () => {
        let filtered = [...allAttendance];

        // Filter by role
        if (selectedRole !== 'All') {
            filtered = filtered.filter((record) => record.role === selectedRole);
        }

        setFilteredAttendance(filtered);
        console.log('Filters applied:', { selectedDate, selectedRole });
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900">Attendance</h1>
                <p className="text-secondary-600 mt-1">
                    Monitor staff attendance and punch records
                </p>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Date Picker */}
                    <div>
                        <label
                            htmlFor="attendanceDate"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Date
                        </label>
                        <input
                            id="attendanceDate"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Role Dropdown */}
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-secondary-700 mb-2"
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option>All</option>
                            <option>Driver</option>
                            <option>Conductor</option>
                            <option>Manager</option>
                            <option>Clerk</option>
                            <option>Inspector</option>
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="card bg-secondary-50">
                    <p className="text-sm text-secondary-600 mb-1">Expected Staff</p>
                    <p className="text-3xl font-bold text-secondary-900">{expectedStaff}</p>
                </div>
                <div className="card bg-success-50">
                    <p className="text-sm text-success-700 mb-1">Present</p>
                    <p className="text-3xl font-bold text-success-700">{presentStaff}</p>
                </div>
                <div className="card bg-danger-50">
                    <p className="text-sm text-danger-700 mb-1">Absent</p>
                    <p className="text-3xl font-bold text-danger-700">{absentStaff}</p>
                </div>
                <div className="card bg-warning-50">
                    <p className="text-sm text-warning-700 mb-1">Late Punches</p>
                    <p className="text-3xl font-bold text-warning-700">{latePunches}</p>
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4">
                <p className="text-sm text-secondary-600">
                    Showing <span className="font-semibold text-secondary-900">{filteredAttendance.length}</span> of{' '}
                    <span className="font-semibold text-secondary-900">{allAttendance.length}</span> staff records
                </p>
            </div>

            {/* Attendance Table */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Name
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Role
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    First IN Time
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Last OUT Time
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Anomalies
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-secondary-500">
                                        No attendance records found matching the selected filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredAttendance.map((record) => (
                                    <tr
                                        key={record.id}
                                        className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                            {record.name}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700">
                                            {record.role}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700 font-medium">
                                            {record.firstInTime || '-'}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-secondary-700 font-medium">
                                            {record.lastOutTime || '-'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    record.status
                                                )}`}
                                            >
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {record.anomalies.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {record.anomalies.map((anomaly, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700"
                                                        >
                                                            {anomaly}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-secondary-500">-</span>
                                            )}
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
