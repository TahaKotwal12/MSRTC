import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { allIncidents } from './IncidentsPage';

// Extended incident detail interface
interface IncidentDetail {
    id: string;
    time: string;
    category: string;
    severity: string;
    tripRoute: string;
    tripTime: string;
    depot: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Dismissed';
    reportedBy: string;
    description: string;
    latitude: number;
    longitude: number;
    attachments: string[];
    activity: Array<{
        timestamp: string;
        action: string;
        user: string;
    }>;
}

// Extended dummy data with full details
const incidentDetails: Record<string, IncidentDetail> = {
    INC001: {
        id: 'INC001',
        time: '08:15 AM',
        category: 'Delay',
        severity: 'Low',
        tripRoute: 'Pune - Mumbai',
        tripTime: '06:30 AM',
        depot: 'Pune Depot',
        status: 'Resolved',
        reportedBy: 'Rajesh Kumar (Driver)',
        description: 'Heavy traffic congestion at Lonavala due to road construction. Estimated delay of 30 minutes.',
        latitude: 18.7537,
        longitude: 73.4135,
        attachments: ['traffic_photo_1.jpg', 'traffic_photo_2.jpg'],
        activity: [
            { timestamp: '08:15 AM', action: 'Incident reported', user: 'Rajesh Kumar' },
            { timestamp: '08:20 AM', action: 'Marked as In Progress', user: 'Deepak Shinde (Manager)' },
            { timestamp: '09:00 AM', action: 'Marked as Resolved', user: 'Deepak Shinde (Manager)' },
        ],
    },
    INC002: {
        id: 'INC002',
        time: '09:30 AM',
        category: 'Breakdown',
        severity: 'High',
        tripRoute: 'Pune - Nashik',
        tripTime: '07:00 AM',
        depot: 'Pune Depot',
        status: 'In Progress',
        reportedBy: 'Suresh Desai (Driver)',
        description: 'Engine overheating issue. Vehicle stopped at Manmad. Mechanic dispatched to location.',
        latitude: 20.2528,
        longitude: 74.4386,
        attachments: ['engine_issue.jpg', 'diagnostic_report.pdf'],
        activity: [
            { timestamp: '09:30 AM', action: 'Incident reported', user: 'Suresh Desai' },
            { timestamp: '09:35 AM', action: 'Marked as In Progress', user: 'Deepak Shinde (Manager)' },
            { timestamp: '09:45 AM', action: 'Mechanic dispatched', user: 'Deepak Shinde (Manager)' },
        ],
    },
    INC003: {
        id: 'INC003',
        time: '10:45 AM',
        category: 'Accident',
        severity: 'Critical',
        tripRoute: 'Mumbai - Nashik',
        tripTime: '08:30 AM',
        depot: 'Mumbai Depot',
        status: 'Open',
        reportedBy: 'Vijay Jadhav (Driver)',
        description: 'Minor collision with a two-wheeler at Kasara Ghat. No major injuries reported. Police informed.',
        latitude: 19.4166,
        longitude: 73.4833,
        attachments: ['accident_scene_1.jpg', 'accident_scene_2.jpg', 'police_report.pdf'],
        activity: [
            { timestamp: '10:45 AM', action: 'Incident reported', user: 'Vijay Jadhav' },
            { timestamp: '10:50 AM', action: 'Police informed', user: 'Control Room' },
        ],
    },
};

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

interface IncidentDetailPageProps {
    onLogout?: () => void;
}

export default function IncidentDetailPage({ onLogout }: IncidentDetailPageProps) {
    const { id } = useParams<{ id: string }>();
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Get incident from detailed data or basic data
    const detailedIncident = id ? incidentDetails[id] : undefined;
    const basicIncident = id ? allIncidents.find((inc) => inc.id === id) : undefined;

    const [currentStatus, setCurrentStatus] = useState<string>(
        detailedIncident?.status || basicIncident?.status || 'Open'
    );

    if (!detailedIncident && !basicIncident) {
        return (
            <AppLayout onLogout={onLogout}>
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-secondary-900 mb-2">
                        Incident Not Found
                    </h1>
                    <p className="text-secondary-600 mb-6">
                        The incident with ID "{id}" could not be found.
                    </p>
                    <a
                        href="/incidents"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Back to Incidents
                    </a>
                </div>
            </AppLayout>
        );
    }

    const incident = detailedIncident || {
        ...basicIncident!,
        reportedBy: 'Unknown',
        description: 'No detailed description available.',
        latitude: 18.5204,
        longitude: 73.8567,
        attachments: [],
        activity: [
            { timestamp: basicIncident!.time, action: 'Incident reported', user: 'System' },
        ],
    };

    const handleStatusChange = (newStatus: 'In Progress' | 'Resolved' | 'Dismissed') => {
        setCurrentStatus(newStatus);
        showSuccessMessage(`Incident marked as ${newStatus}`);
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <AppLayout onLogout={onLogout}>
            {/* Success Message */}
            {successMessage && (
                <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg">
                    ✓ {successMessage}
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary-900">
                            Incident {incident.id}
                        </h1>
                        <p className="text-secondary-600 mt-1">{incident.category}</p>
                    </div>
                    <div className="flex gap-2">
                        <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                                incident.severity
                            )}`}
                        >
                            {incident.severity}
                        </span>
                        <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                currentStatus
                            )}`}
                        >
                            {currentStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Overview Card */}
            <div className="card mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Time</p>
                        <p className="text-secondary-900 font-medium">{incident.time}</p>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Depot</p>
                        <p className="text-secondary-900 font-medium">{incident.depot}</p>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Trip</p>
                        <p className="text-secondary-900 font-medium">
                            {incident.tripRoute} ({incident.tripTime})
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-secondary-600 mb-1">Reported By</p>
                        <p className="text-secondary-900 font-medium">{incident.reportedBy}</p>
                    </div>
                </div>
            </div>

            {/* Description Card */}
            <div className="card mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Description</h2>
                <p className="text-secondary-700">{incident.description}</p>
            </div>

            {/* Location Card */}
            <div className="card mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Location</h2>
                <div className="mb-4">
                    <p className="text-sm text-secondary-600">
                        Latitude: <span className="font-medium text-secondary-900">{incident.latitude}</span>
                        {' • '}
                        Longitude: <span className="font-medium text-secondary-900">{incident.longitude}</span>
                    </p>
                </div>
                <div className="bg-secondary-100 border-2 border-dashed border-secondary-300 rounded-lg p-12 text-center">
                    <p className="text-secondary-600 text-lg">📍 Map Placeholder</p>
                    <p className="text-secondary-500 text-sm mt-2">
                        Interactive map will be displayed here
                    </p>
                </div>
            </div>

            {/* Attachments Card */}
            <div className="card mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Attachments</h2>
                {incident.attachments.length === 0 ? (
                    <p className="text-secondary-500">No attachments</p>
                ) : (
                    <div className="space-y-2">
                        {incident.attachments.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                            >
                                <span className="text-2xl">📎</span>
                                <span className="text-secondary-900 font-medium">{file}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Activity Card */}
            <div className="card mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Activity</h2>
                <div className="space-y-3">
                    {incident.activity.map((event, index) => (
                        <div key={index} className="flex gap-4 pb-3 border-b border-secondary-100 last:border-0">
                            <div className="flex-shrink-0 w-20 text-sm text-secondary-600">
                                {event.timestamp}
                            </div>
                            <div className="flex-1">
                                <p className="text-secondary-900 font-medium">{event.action}</p>
                                <p className="text-sm text-secondary-600">{event.user}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleStatusChange('In Progress')}
                        disabled={currentStatus === 'In Progress'}
                        className="bg-info-600 hover:bg-info-700 disabled:bg-secondary-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Mark In Progress
                    </button>
                    <button
                        onClick={() => handleStatusChange('Resolved')}
                        disabled={currentStatus === 'Resolved'}
                        className="bg-success-600 hover:bg-success-700 disabled:bg-secondary-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Mark Resolved
                    </button>
                    <button
                        onClick={() => handleStatusChange('Dismissed')}
                        disabled={currentStatus === 'Dismissed'}
                        className="bg-secondary-600 hover:bg-secondary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
