// API Service Layer
// This directory will contain API integration services

import { ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Generic API request handler
export async function apiRequest<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'An error occurred',
                timestamp: new Date(),
            };
        }

        return {
            success: true,
            data,
            timestamp: new Date(),
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Network error',
            timestamp: new Date(),
        };
    }
}

// Export service modules (to be created)
export * from './depotService';
export * from './routeService';
export * from './vehicleService';
export * from './staffService';
export * from './tripService';
export * from './reservationService';
export * from './attendanceService';
export * from './incidentService';
