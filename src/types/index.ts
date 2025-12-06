// Core Entity Types for MSRTC Operations Automation System

export interface Depot {
    id: string;
    code: string;
    name: string;
    location: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contactNumber: string;
    email: string;
    managerName: string;
    managerId: string;
    capacity: number; // Number of buses
    activeVehicles: number;
    activeStaff: number;
    status: 'active' | 'inactive' | 'maintenance';
    createdAt: Date;
    updatedAt: Date;
}

export interface Route {
    id: string;
    routeNumber: string;
    name: string;
    origin: string;
    destination: string;
    distance: number; // in kilometers
    estimatedDuration: number; // in minutes
    stops: RouteStop[];
    fare: number;
    routeType: 'express' | 'ordinary' | 'semi-luxury' | 'luxury';
    status: 'active' | 'inactive' | 'suspended';
    depotId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RouteStop {
    id: string;
    stopName: string;
    stopOrder: number;
    distanceFromOrigin: number; // in kilometers
    estimatedArrivalTime: number; // minutes from start
    fare: number;
    isBoarding: boolean;
    isDropping: boolean;
}

export interface Vehicle {
    id: string;
    registrationNumber: string;
    vehicleNumber: string;
    make: string;
    model: string;
    year: number;
    capacity: number; // Number of seats
    vehicleType: 'express' | 'ordinary' | 'semi-luxury' | 'luxury' | 'ac' | 'non-ac';
    fuelType: 'diesel' | 'cng' | 'electric';
    depotId: string;
    status: 'available' | 'in-service' | 'maintenance' | 'breakdown' | 'retired';
    lastServiceDate: Date;
    nextServiceDate: Date;
    mileage: number; // in kilometers
    gpsDeviceId?: string;
    currentLocation?: Location;
    createdAt: Date;
    updatedAt: Date;
}

export interface Staff {
    id: string;
    employeeId: string;
    name: string;
    email: string;
    phone: string;
    role: 'driver' | 'conductor' | 'depot-manager' | 'inspector' | 'mechanic' | 'admin';
    depotId: string;
    licenseNumber?: string; // For drivers
    licenseExpiry?: Date;
    aadhaarNumber?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    dateOfJoining: Date;
    status: 'active' | 'on-leave' | 'suspended' | 'retired';
    shift?: 'morning' | 'afternoon' | 'night';
    createdAt: Date;
    updatedAt: Date;
}

export interface Trip {
    id: string;
    tripNumber: string;
    routeId: string;
    vehicleId: string;
    depotId: string;
    scheduledDepartureTime: Date;
    scheduledArrivalTime: Date;
    actualDepartureTime?: Date;
    actualArrivalTime?: Date;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'delayed';
    totalSeats: number;
    availableSeats: number;
    reservedSeats: number;
    fare: number;
    tripType: 'regular' | 'special' | 'charter';
    createdAt: Date;
    updatedAt: Date;
}

export interface Assignment {
    id: string;
    tripId: string;
    vehicleId: string;
    driverId: string;
    conductorId: string;
    depotId: string;
    assignmentDate: Date;
    shiftType: 'morning' | 'afternoon' | 'night';
    status: 'assigned' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    approvedBy?: string;
    approvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Reservation {
    id: string;
    bookingId: string;
    tripId: string;
    passengerName: string;
    passengerPhone: string;
    passengerEmail?: string;
    seatNumbers: string[];
    boardingPoint: string;
    droppingPoint: string;
    fare: number;
    bookingDate: Date;
    bookingStatus: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    paymentMethod?: 'cash' | 'card' | 'upi' | 'online';
    cancellationReason?: string;
    cancelledAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Attendance {
    id: string;
    staffId: string;
    depotId: string;
    date: Date;
    checkInTime?: Date;
    checkOutTime?: Date;
    status: 'present' | 'absent' | 'on-leave' | 'half-day' | 'late';
    checkInLocation?: Location;
    checkOutLocation?: Location;
    deviceId?: string;
    notes?: string;
    approvedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Incident {
    id: string;
    incidentNumber: string;
    tripId?: string;
    vehicleId?: string;
    routeId?: string;
    depotId: string;
    reportedBy: string; // Staff ID
    incidentType: 'breakdown' | 'accident' | 'delay' | 'passenger-issue' | 'safety' | 'infrastructure' | 'other';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    location?: Location;
    incidentDate: Date;
    reportedDate: Date;
    status: 'reported' | 'acknowledged' | 'in-progress' | 'resolved' | 'closed';
    photos?: string[]; // URLs or file paths
    resolvedBy?: string;
    resolvedAt?: Date;
    resolutionNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Supporting Types

export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
    timestamp?: Date;
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    role: 'admin' | 'depot-manager' | 'inspector' | 'staff';
    depotId?: string;
    permissions: Permission[];
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Permission {
    module: string;
    actions: ('create' | 'read' | 'update' | 'delete')[];
}

// Analytics & Dashboard Types

export interface DashboardStats {
    totalDepots: number;
    totalVehicles: number;
    activeVehicles: number;
    totalStaff: number;
    activeStaff: number;
    todayTrips: number;
    completedTrips: number;
    ongoingTrips: number;
    delayedTrips: number;
    cancelledTrips: number;
    totalReservations: number;
    occupancyRate: number;
    activeIncidents: number;
}

export interface RoutePerformance {
    routeId: string;
    routeName: string;
    totalTrips: number;
    completedTrips: number;
    onTimePercentage: number;
    averageOccupancy: number;
    revenue: number;
    incidents: number;
}

export interface VehicleUtilization {
    vehicleId: string;
    registrationNumber: string;
    totalTrips: number;
    totalDistance: number;
    utilizationPercentage: number;
    maintenanceDays: number;
    fuelConsumption: number;
}

export interface StaffPerformance {
    staffId: string;
    name: string;
    role: string;
    totalTrips: number;
    attendancePercentage: number;
    punctualityScore: number;
    incidents: number;
}

// API Response Types

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    timestamp: Date;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Filter & Search Types

export interface TripFilter {
    depotId?: string;
    routeId?: string;
    vehicleId?: string;
    status?: Trip['status'];
    dateFrom?: Date;
    dateTo?: Date;
}

export interface StaffFilter {
    depotId?: string;
    role?: Staff['role'];
    status?: Staff['status'];
    shift?: Staff['shift'];
}

export interface IncidentFilter {
    depotId?: string;
    incidentType?: Incident['incidentType'];
    severity?: Incident['severity'];
    status?: Incident['status'];
    dateFrom?: Date;
    dateTo?: Date;
}
