import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../features/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import LogoutButton from "../features/auth/components/LogoutButton";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Dashboard</h1>
                  <LogoutButton />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<p>404 Page Not Found</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
