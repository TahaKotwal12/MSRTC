import { useState, type FormEvent } from 'react';

interface LoginFormState {
    username: string;
    password: string;
}

interface LoginPageProps {
    onLoginSuccess?: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [formData, setFormData] = useState<LoginFormState>({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validate non-empty fields
        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Please enter both username and password');
            return;
        }

        // Log credentials for now
        console.log('Login attempt:', {
            username: formData.username,
            password: '***hidden***',
        });

        // Simulate successful login
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    const handleInputChange = (field: keyof LoginFormState, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="card shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <span className="text-3xl">🚌</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-700 mb-2">
                            BusOps Console
                        </h1>
                        <p className="text-secondary-600">
                            Bus Operations Management System
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username Field */}
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
                                value={formData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-secondary-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-danger-600 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Login
                        </button>

                        {/* Hint Text */}
                        <p className="text-center text-sm text-secondary-500 mt-4">
                            💡 Use demo credentials to continue
                        </p>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-secondary-600 text-sm">
                    <p>Open Source • Free Forever</p>
                </div>
            </div>
        </div>
    );
}
