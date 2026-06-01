import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import IssuesPage from "./pages/issues/IssuesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          element={<MainLayout />}
        >

          <Route
            path="/"
            element={<DashboardPage />}
          />

          <Route
            path="/projects"
            element={<ProjectsPage />}
          />

          <Route
            path="/issues"
            element={<IssuesPage />}
          />

          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;