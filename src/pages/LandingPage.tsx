import { useEffect, useState } from 'react';
import { Bus, Users, MapPin, BarChart3, Shield, Zap, Clock, TrendingUp, CheckCircle, ArrowRight, Github, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-secondary-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                                <Bus className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-primary-900">BusOps</h1>
                                <p className="text-xs text-secondary-600">Open Source</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-secondary-700 hover:text-primary-600 transition-colors">Features</a>
                            <a href="#benefits" className="text-secondary-700 hover:text-primary-600 transition-colors">Benefits</a>
                            <a href="#stats" className="text-secondary-700 hover:text-primary-600 transition-colors">Stats</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary-700 hover:text-primary-600 transition-colors">
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                            <Link to="/dashboard" className="btn btn-primary">
                                Get Started
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full mb-6 animate-fade-in">
                            <Star className="w-4 h-4" />
                            <span className="text-sm font-medium">Open Source • Free Forever</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
                            Modern Bus Operations
                            <br />
                            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                Management System
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-secondary-600 mb-12 max-w-3xl mx-auto">
                            Complete digital solution for bus transport companies. Manage fleet, staff, routes, and operations from a single, powerful platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline text-lg px-8 py-4">
                                <Github className="w-5 h-5" />
                                View on GitHub
                            </a>
                        </div>

                        {/* Floating Cards Animation */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                { icon: Bus, label: 'Fleet Management', delay: '0ms' },
                                { icon: Users, label: 'Staff Rostering', delay: '200ms' },
                                { icon: BarChart3, label: 'Real-time Analytics', delay: '400ms' },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="card card-hover p-6 animate-slide-in"
                                    style={{ animationDelay: item.delay }}
                                >
                                    <item.icon className="w-12 h-12 text-primary-600 mb-4 mx-auto" />
                                    <h3 className="text-lg font-semibold text-secondary-900">{item.label}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                            Comprehensive features designed for modern bus transport operations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group card card-hover p-8 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-secondary-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                                Why Choose BusOps?
                            </h2>
                            <p className="text-xl text-secondary-600 mb-8">
                                Built by transport professionals, for transport professionals. Open source and completely free.
                            </p>

                            <div className="space-y-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                                        <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-6 h-6 text-success-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-secondary-600">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="card p-8 shadow-strong">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                                        <span className="text-secondary-700 font-medium">Active Vehicles</span>
                                        <span className="text-2xl font-bold text-primary-600">142</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                                        <span className="text-secondary-700 font-medium">Today's Trips</span>
                                        <span className="text-2xl font-bold text-success-600">89</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-warning-50 rounded-lg">
                                        <span className="text-secondary-700 font-medium">Staff On Duty</span>
                                        <span className="text-2xl font-bold text-warning-600">256</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                                        <span className="text-secondary-700 font-medium">Occupancy Rate</span>
                                        <span className="text-2xl font-bold text-secondary-600">87%</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-2xl animate-pulse-slow"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-200 rounded-full opacity-50 blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Trusted by Transport Companies
                        </h2>
                        <p className="text-xl text-primary-100">
                            Join the growing community of modern bus operators
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                                <div className="text-primary-100 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                        Ready to Transform Your Operations?
                    </h2>
                    <p className="text-xl text-secondary-600 mb-12">
                        Start using BusOps today. No credit card required. Open source and free forever.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                            Get Started Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline text-lg px-8 py-4">
                            <Github className="w-5 h-5" />
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-secondary-900 text-secondary-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <Bus className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">BusOps</span>
                            </div>
                            <p className="text-sm">
                                Open-source bus operations management system for modern transport companies.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                                <li><a href="#stats" className="hover:text-white transition-colors">Statistics</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Open Source</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contribute</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">License (MIT)</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-secondary-800 pt-8 text-center text-sm">
                        <p>© 2024 BusOps. Open source under MIT License. Built with ❤️ for the transport community.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Data
const features = [
    {
        icon: Bus,
        title: 'Fleet Management',
        description: 'Track and manage your entire bus fleet with real-time GPS integration and maintenance scheduling.',
    },
    {
        icon: Users,
        title: 'Staff Rostering',
        description: 'Automated staff assignment with conflict detection, attendance tracking, and shift management.',
    },
    {
        icon: MapPin,
        title: 'Route Planning',
        description: 'Optimize routes, manage stops, and track trip schedules with intelligent planning tools.',
    },
    {
        icon: BarChart3,
        title: 'Analytics Dashboard',
        description: 'Real-time insights into operations, occupancy rates, revenue, and performance metrics.',
    },
    {
        icon: Clock,
        title: 'Real-time Tracking',
        description: 'Live GPS tracking of all vehicles with estimated arrival times and delay notifications.',
    },
    {
        icon: Shield,
        title: 'Incident Management',
        description: 'Report and track incidents, breakdowns, and safety issues with photo documentation.',
    },
    {
        icon: Zap,
        title: 'Instant Notifications',
        description: 'Automated alerts for staff assignments, trip changes, and operational updates.',
    },
    {
        icon: TrendingUp,
        title: 'Performance Reports',
        description: 'Comprehensive reports on routes, vehicles, staff punctuality, and revenue trends.',
    },
    {
        icon: CheckCircle,
        title: 'Reservation System',
        description: 'Integrated ticket booking with real-time seat availability and passenger management.',
    },
];

const benefits = [
    {
        title: '100% Open Source',
        description: 'Free to use, modify, and distribute. No vendor lock-in, complete transparency.',
    },
    {
        title: 'Cost Effective',
        description: 'Zero licensing fees. Save thousands compared to proprietary solutions.',
    },
    {
        title: 'Modern Technology',
        description: 'Built with React, TypeScript, and modern web standards for reliability and performance.',
    },
    {
        title: 'Community Driven',
        description: 'Active community support, regular updates, and continuous improvements.',
    },
    {
        title: 'Easy Deployment',
        description: 'Simple setup process. Deploy on your own servers or use cloud hosting.',
    },
    {
        title: 'Customizable',
        description: 'Adapt the system to your specific needs. Full source code access.',
    },
];

const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '1000+', label: 'Bus Companies' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
];
