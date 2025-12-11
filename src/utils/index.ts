// Utility functions for the BusOps application

import { format, formatDistance, formatRelative, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, formatStr: string = 'PPP'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
}

/**
 * Format time to readable string
 */
export function formatTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'p');
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'PPp');
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
}

/**
 * Get relative date (e.g., "today at 3:00 PM")
 */
export function getRelativeDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatRelative(dateObj, new Date());
}

/**
 * Calculate duration between two dates in minutes
 */
export function calculateDuration(start: Date | string, end: Date | string): number {
    const startDate = typeof start === 'string' ? parseISO(start) : start;
    const endDate = typeof end === 'string' ? parseISO(end) : end;
    return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));
}

/**
 * Format currency (Indian Rupees)
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format number with Indian numbering system
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, total: number): string {
    return `${calculatePercentage(value, total)}%`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Generate random ID (for dummy data)
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
        active: 'text-success-600 bg-success-50',
        inactive: 'text-secondary-600 bg-secondary-50',
        completed: 'text-success-600 bg-success-50',
        'in-progress': 'text-primary-600 bg-primary-50',
        scheduled: 'text-primary-600 bg-primary-50',
        cancelled: 'text-danger-600 bg-danger-50',
        delayed: 'text-warning-600 bg-warning-50',
        pending: 'text-warning-600 bg-warning-50',
        confirmed: 'text-success-600 bg-success-50',
        maintenance: 'text-warning-600 bg-warning-50',
        breakdown: 'text-danger-600 bg-danger-50',
        present: 'text-success-600 bg-success-50',
        absent: 'text-danger-600 bg-danger-50',
        'on-leave': 'text-secondary-600 bg-secondary-50',
        reported: 'text-warning-600 bg-warning-50',
        resolved: 'text-success-600 bg-success-50',
        critical: 'text-danger-600 bg-danger-50',
        high: 'text-warning-600 bg-warning-50',
        medium: 'text-primary-600 bg-primary-50',
        low: 'text-secondary-600 bg-secondary-50',
    };

    return statusColors[status.toLowerCase()] || 'text-secondary-600 bg-secondary-50';
}

/**
 * Get severity color
 */
export function getSeverityColor(severity: string): string {
    const severityColors: Record<string, string> = {
        critical: 'text-danger-700 bg-danger-100',
        high: 'text-warning-700 bg-warning-100',
        medium: 'text-primary-700 bg-primary-100',
        low: 'text-secondary-700 bg-secondary-100',
    };

    return severityColors[severity.toLowerCase()] || 'text-secondary-700 bg-secondary-100';
}

/**
 * Validate phone number (Indian format)
 */
export function validatePhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
    }
    return phone;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Download data as JSON file
 */
export function downloadJSON(data: any, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Download data as CSV file
 */
export function downloadCSV(data: any[], filename: string): void {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map((row) =>
            headers.map((header) => JSON.stringify(row[header] || '')).join(',')
        ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
