import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TripsPage from './pages/TripsPage';
import TripDetailPage from './pages/TripDetailPage';
import RosterPage from './pages/RosterPage';
import ReservationsPage from './pages/ReservationsPage';
import AttendancePage from './pages/AttendancePage';
import IncidentsPage from './pages/IncidentsPage';
import IncidentDetailPage from './pages/IncidentDetailPage';
import ReportsPage from './pages/ReportsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import DriverDutyPage from './pages/DriverDutyPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    console.log('User authenticated successfully');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  return (
    <Router>
      <div className="min-h-screen bg-secondary-50">
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Trips Route */}
          <Route
            path="/trips"
            element={
              isAuthenticated ? (
                <TripsPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Trip Detail Route */}
          <Route
            path="/trips/:tripId"
            element={
              isAuthenticated ? (
                <TripDetailPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Roster Route */}
          <Route
            path="/roster"
            element={
              isAuthenticated ? (
                <RosterPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Reservations Route */}
          <Route
            path="/reservations"
            element={
              isAuthenticated ? (
                <ReservationsPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Attendance Route */}
          <Route
            path="/attendance"
            element={
              isAuthenticated ? (
                <AttendancePage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Incidents Route */}
          <Route
            path="/incidents"
            element={
              isAuthenticated ? (
                <IncidentsPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Incident Detail Route */}
          <Route
            path="/incidents/:id"
            element={
              isAuthenticated ? (
                <IncidentDetailPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Reports Route */}
          <Route
            path="/reports"
            element={
              isAuthenticated ? (
                <ReportsPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin Users Route */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminUsersPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Driver Duty Route */}
          <Route
            path="/driver/duty"
            element={
              isAuthenticated ? (
                <DriverDutyPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Default Route - Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
