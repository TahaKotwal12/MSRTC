import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// TypeScript interfaces
interface User {
    id: string;
    username: string;
    linkedStaffName: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastLogin: string;
}

interface Staff {
    id: string;
    name: string;
}

// Dummy staff data
const staffList: Staff[] = [
    { id: 'S001', name: 'Rajesh Kumar' },
    { id: 'S002', name: 'Amit Patil' },
    { id: 'S003', name: 'Suresh Desai' },
    { id: 'S004', name: 'Priya Sharma' },
    { id: 'S005', name: 'Vijay Jadhav' },
    { id: 'S006', name: 'Sneha More' },
    { id: 'S007', name: 'Prakash Rane' },
    { id: 'S008', name: 'Kavita Naik' },
    { id: 'S009', name: 'Deepak Shinde' },
    { id: 'S010', name: 'Pooja Raut' },
];

// Dummy users data
const initialUsers: User[] = [
    {
        id: 'U001',
        username: 'admin',
        linkedStaffName: 'Deepak Shinde',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2025-12-06 09:30 AM',
    },
    {
        id: 'U002',
        username: 'rajesh.kumar',
        linkedStaffName: 'Rajesh Kumar',
        role: 'Driver',
        status: 'Active',
        lastLogin: '2025-12-06 06:15 AM',
    },
    {
        id: 'U003',
        username: 'amit.patil',
        linkedStaffName: 'Amit Patil',
        role: 'Conductor',
        status: 'Active',
        lastLogin: '2025-12-06 06:20 AM',
    },
    {
        id: 'U004',
        username: 'suresh.desai',
        linkedStaffName: 'Suresh Desai',
        role: 'Driver',
        status: 'Active',
        lastLogin: '2025-12-05 02:45 PM',
    },
    {
        id: 'U005',
        username: 'priya.sharma',
        linkedStaffName: 'Priya Sharma',
        role: 'Conductor',
        status: 'Inactive',
        lastLogin: '2025-12-03 11:20 AM',
    },
    {
        id: 'U006',
        username: 'depot.manager',
        linkedStaffName: 'Pooja Raut',
        role: 'Depot Manager',
        status: 'Active',
        lastLogin: '2025-12-06 08:00 AM',
    },
];

// Helper function
const getStatusColor = (status: string) => {
    return status === 'Active'
        ? 'bg-success-100 text-success-700'
        : 'bg-secondary-100 text-secondary-700';
};

interface AdminUsersPageProps {
    onLogout?: () => void;
}

export default function AdminUsersPage({ onLogout }: AdminUsersPageProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Form state
    const [newUsername, setNewUsername] = useState('');
    const [newRole, setNewRole] = useState('Driver');
    const [newLinkedStaff, setNewLinkedStaff] = useState('');

    const handleResetPassword = (userId: string) => {
        console.log('Reset password for user:', userId);
        showSuccessMessage('Password reset email sent');
    };

    const handleToggleStatus = (userId: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId
                    ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                    : user
            )
        );
        const user = users.find((u) => u.id === userId);
        showSuccessMessage(`User ${user?.status === 'Active' ? 'deactivated' : 'activated'} successfully`);
    };

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newUsername || !newLinkedStaff) {
            alert('Please fill in all fields');
            return;
        }

        const staffName = staffList.find((s) => s.id === newLinkedStaff)?.name || 'Unknown';

        const newUser: User = {
            id: `U${String(users.length + 1).padStart(3, '0')}`,
            username: newUsername,
            linkedStaffName: staffName,
            role: newRole,
            status: 'Active',
            lastLogin: 'Never',
        };

        setUsers((prev) => [...prev, newUser]);
        showSuccessMessage('User created successfully');

        // Reset form and close modal
        setNewUsername('');
        setNewRole('Driver');
        setNewLinkedStaff('');
        setIsModalOpen(false);
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

            {/* Page Title */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-secondary-900">User Management</h1>
                    <p className="text-secondary-600 mt-1">
                        Manage system users and access permissions
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    Create User
                </button>
            </div>

            {/* Users Table */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-secondary-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Username
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Linked Staff Name
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Role
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Last Login
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-secondary-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors"
                                >
                                    <td className="py-3 px-4 text-sm text-secondary-900 font-medium">
                                        {user.username}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-secondary-700">
                                        {user.linkedStaffName}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-secondary-900">
                                        {user.role}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                user.status
                                            )}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-secondary-700">
                                        {user.lastLogin}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleResetPassword(user.id)}
                                                className="text-info-600 hover:text-info-700 font-medium text-sm hover:underline"
                                            >
                                                Reset Password
                                            </button>
                                            <span className="text-secondary-300">|</span>
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`font-medium text-sm hover:underline ${user.status === 'Active'
                                                        ? 'text-danger-600 hover:text-danger-700'
                                                        : 'text-success-600 hover:text-success-700'
                                                    }`}
                                            >
                                                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        {/* Modal Header */}
                        <div className="border-b border-secondary-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-secondary-900">
                                Create New User
                            </h2>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleCreateUser}>
                            <div className="px-6 py-4 space-y-4">
                                {/* Username */}
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-secondary-700 mb-2"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>

                                {/* Role */}
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-secondary-700 mb-2"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option>Admin</option>
                                        <option>Depot Manager</option>
                                        <option>Driver</option>
                                        <option>Conductor</option>
                                        <option>Clerk</option>
                                        <option>Inspector</option>
                                    </select>
                                </div>

                                {/* Linked Staff */}
                                <div>
                                    <label
                                        htmlFor="linkedStaff"
                                        className="block text-sm font-medium text-secondary-700 mb-2"
                                    >
                                        Linked Staff
                                    </label>
                                    <select
                                        id="linkedStaff"
                                        value={newLinkedStaff}
                                        onChange={(e) => setNewLinkedStaff(e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select staff member</option>
                                        {staffList.map((staff) => (
                                            <option key={staff.id} value={staff.id}>
                                                {staff.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="border-t border-secondary-200 px-6 py-4 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-secondary-200 hover:bg-secondary-300 text-secondary-900 font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
