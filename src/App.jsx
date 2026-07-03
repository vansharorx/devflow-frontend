import ProtectedRoute from "./routes/ProtectedRoute";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";

import IssuesPage from "./pages/issues/IssuesPage";
import IssueDetailsPage from "./pages/issues/IssueDetailsPage";

import NotificationsPage from "./pages/notifications/NotificationsPage";
import ActivityPage from "./pages/activity/ActivityPage";

import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";

import OAuthSuccessPage from "./pages/auth/OAuthSuccessPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
        />

        <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
        />

        <Route
            path="/verify-email/:token"
            element={<VerifyEmailPage />}
        />
        
        <Route
            path="/oauth-success"
            element={<OAuthSuccessPage />}
        />

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issues"
            element={
              <ProtectedRoute>
                <IssuesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issues/:id"
            element={
              <ProtectedRoute>
                <IssueDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <ActivityPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;